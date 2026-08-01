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

    const show = () => el.classList.add('is-revealed');

    const obs = getObserver();

    // Navegador sin IntersectionObserver: mostramos y no animamos.
    if (!obs) {
      show();
      return;
    }

    // Si el elemento ya está en pantalla al montar (todo lo que cae arriba del
    // pliegue), lo mostramos sin esperar al observer: un CTA no puede quedar
    // invisible ni una fracción de segundo.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
      return;
    }

    CALLBACKS.set(el, show);
    obs.observe(el);

    return () => {
      CALLBACKS.delete(el);
      obs.unobserve(el);
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
