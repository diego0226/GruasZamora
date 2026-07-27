'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cuenta ascendente al entrar en pantalla.
 *
 * Arranca en el valor final: así el número correcto ya está en el HTML del
 * servidor y no hay parpadeo si el JS tarda o el usuario pidió menos
 * movimiento. Solo baja a cero en el instante en que el elemento entra en
 * pantalla, para inmediatamente contar hacia arriba.
 */
export function CountUp({
  to,
  suffix = '',
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
