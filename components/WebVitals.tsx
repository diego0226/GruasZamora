'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Manda las métricas de Core Web Vitals a la analítica configurada.
 *
 * ── Por qué medir en campo y no solo con Lighthouse ─────────────────────────
 *
 * La auditoría señala (F-10) que LCP, INP, CLS y TTFB son propiedades de la
 * experiencia desplegada, no del código fuente: dependen del CDN, del
 * dispositivo, de la red del visitante y de si la caché ayudó o no. Una prueba
 * de laboratorio en un portátil con fibra no dice nada sobre un teléfono de
 * gama media con datos móviles en la cuesta de Zarcero — que es, literalmente,
 * el usuario de este sitio.
 *
 * `useReportWebVitals` entrega la medición real de cada visita. Con eso se
 * puede responder si un cambio mejoró o empeoró la experiencia, en vez de
 * discutirlo.
 *
 * ── Coste ──────────────────────────────────────────────────────────────────
 *
 * Ninguno añadido: el hook usa la API `PerformanceObserver` que el navegador ya
 * expone y el recolector va incluido en Next.js. No descarga ninguna librería
 * y solo se renderiza cuando hay una analítica configurada — hoy, ninguna.
 *
 * Los valores se redondean antes de enviarlos porque GA4 solo admite enteros
 * en las métricas, y CLS se multiplica por mil porque si no todos los valores
 * caerían en cero al redondear (un CLS bueno es del orden de 0,05).
 */

type VentanaConMedicion = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    const valor = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

    const payload = {
      metrica: metric.name,
      valor,
      calificacion: metric.rating,
      id: metric.id,
    };

    const w = window as VentanaConMedicion;

    if (w.dataLayer) {
      w.dataLayer.push({ event: 'web_vitals', ...payload });
    } else if (typeof w.gtag === 'function') {
      w.gtag('event', 'web_vitals', payload);
    }
  });

  return null;
}
