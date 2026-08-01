'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Dirección de entrada */
  from?: 'bottom' | 'left' | 'right';
  /** Retraso en ms para escalonar elementos hermanos */
  delay?: number;
  as?: ElementType;
};

const VARIANTS = {
  bottom: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
} as const;

/* ── Observador único, compartido por todos los Reveal de la página ──────────

   Antes cada instancia creaba su propio IntersectionObserver. En la portada
   hay unas cuarenta y en una landing de zona más de treinta, así que el
   navegador terminaba manteniendo decenas de observadores independientes: cada
   uno con su propio registro de destinos y su propia entrada en el trabajo que
   el compositor hace en cada cuadro de scroll.

   Un solo observador con muchos destinos hace exactamente el mismo trabajo
   visual con una fracción del coste, que es lo que se nota en un teléfono de
   gama baja — el dispositivo desde el que entra alguien varado en la
   carretera. La API está pensada para esto: `observe()` acepta tantos
   elementos como haga falta.

   El observador se crea en la primera necesidad y no en la carga del módulo,
   para no tocar `window` durante el renderizado en servidor. */

const CALLBACKS = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

/* ── Alta en un solo lote, para no provocar recálculos de diseño ─────────────

   Cada Reveal necesita saber si ya está en pantalla al montar, y eso se
   averigua con `getBoundingClientRect()`. El problema no es la medición: es el
   orden en que se hacían.

   React ejecuta los efectos de los ~40 Reveal de la página uno detrás de otro,
   así que la secuencia era medir → escribir la clase → medir → escribir la
   clase → … Cada escritura invalida el diseño calculado, y la medición
   siguiente obliga al navegador a rehacerlo entero antes de poder responder.
   Cuarenta recálculos forzados de una página larga, en un teléfono de gama
   media, en el momento exacto en que también está hidratando React. Es lo que
   PageSpeed reporta como «redistribución forzada».

   La solución no es medir menos, es separar las fases: los elementos se
   apuntan en una cola y se procesan juntos en una microtarea —que corre
   después de todos los efectos y antes del primer pintado, así que nadie ve
   nada parpadear—. Primero se miden TODOS, después se escribe. Un recálculo en
   vez de cuarenta, con el mismo resultado visual. */

const PENDIENTES: HTMLElement[] = [];
let loteProgramado = false;

function encolar(el: HTMLElement) {
  PENDIENTES.push(el);
  if (loteProgramado) return;
  loteProgramado = true;
  queueMicrotask(procesarLote);
}

function desencolar(el: HTMLElement) {
  const i = PENDIENTES.indexOf(el);
  if (i !== -1) PENDIENTES.splice(i, 1);
}

function procesarLote() {
  loteProgramado = false;
  const lote = PENDIENTES.splice(0);
  if (lote.length === 0) return;

  const obs = getObserver();
  const alto = window.innerHeight;

  // Fase 1 — solo lecturas. El navegador recalcula el diseño una vez, en la
  // primera, y sirve las demás desde ese mismo cálculo.
  const enPantalla = lote.map((el) => {
    if (!el.isConnected) return null;
    // Sin IntersectionObserver no animamos: se muestra todo de una vez.
    if (!obs) return true;
    const r = el.getBoundingClientRect();
    return r.top < alto && r.bottom > 0;
  });

  // Fase 2 — solo escrituras.
  lote.forEach((el, i) => {
    const visible = enPantalla[i];
    if (visible === null) return; // se desmontó entre el alta y el lote

    if (visible) {
      /* Ya está arriba del pliegue: se revela sin esperar al observador. Un
         CTA no puede quedar invisible ni una fracción de segundo. */
      CALLBACKS.delete(el);
      el.classList.add('is-revealed');
    } else {
      obs!.observe(el);
    }
  });
}

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;

  observer ??= new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        CALLBACKS.get(entry.target)?.();
        CALLBACKS.delete(entry.target);
        /* Se deja de observar el elemento, no el observador entero: los demás
           destinos siguen vivos. */
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  return observer;
}

/**
 * Revela el contenido al entrar en pantalla.
 *
 * Alterna una clase directamente sobre el nodo en vez de usar estado de React:
 * es un efecto puramente visual, así que no vale la pena provocar un re-render
 * por cada uno de los ~40 elementos revelables de la página.
 *
 * El contenido siempre está en el HTML del servidor (solo cambia la opacidad),
 * así que no afecta la indexación. Sin JavaScript o con "reducir movimiento"
 * activado se muestra de una vez — ver globals.css y el script del layout.
 */
export function Reveal({
  children,
  className,
  from = 'bottom',
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* No se mide nada aquí: solo se deja el elemento en la cola. La decisión de
       si ya está en pantalla la toma `procesarLote`, con todos los hermanos a
       la vez. Ver la nota de arriba. */
    CALLBACKS.set(el, () => el.classList.add('is-revealed'));
    encolar(el);

    return () => {
      CALLBACKS.delete(el);
      desencolar(el);
      observer?.unobserve(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(VARIANTS[from], className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
