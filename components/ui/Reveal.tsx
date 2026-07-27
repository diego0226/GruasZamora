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

/**
 * Revela el contenido al entrar en pantalla.
 *
 * Alterna una clase directamente sobre el nodo en vez de usar estado de React:
 * es un efecto puramente visual, así que no vale la pena provocar un re-render
 * por cada uno de los ~40 elementos revelables de la página.
 *
 * El contenido siempre está en el HTML del servidor (solo cambia la opacidad),
 * así que no afecta la indexación. Sin JavaScript o con "reducir movimiento"
 * activado se muestra de una vez — ver globals.css y el <noscript> del layout.
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

    // Navegador sin IntersectionObserver: mostramos y no animamos.
    if (typeof IntersectionObserver === 'undefined') {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
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
