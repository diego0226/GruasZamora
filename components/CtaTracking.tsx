'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Registra los clics en los botones de contacto.
 *
 * ── Por qué hacía falta ─────────────────────────────────────────────────────
 *
 * Los CTA ya venían marcados con `data-cta` desde antes, pero nadie leía ese
 * atributo: no existía ningún código que convirtiera un clic en un evento. Sin
 * eso no hay forma de responder las preguntas que deciden el trabajo de SEO
 * —¿qué zona genera llamadas?, ¿convierte más el botón del hero o el
 * flotante?, ¿sirvió de algo la landing nueva?— y el plan de contenidos se
 * vuelve opinión.
 *
 * Un servicio de grúas no tiene carrito ni formulario: la conversión ES el
 * clic en «llamar» o en WhatsApp. Medirlo es medir el negocio.
 *
 * ── Cómo está hecho ─────────────────────────────────────────────────────────
 *
 * Un único escuchador delegado en `document`, no uno por botón. Da igual
 * cuántos CTA tenga la página o si aparecen después (los accesos flotantes
 * salen al hacer scroll): el coste es un listener y ya. Va en la fase de
 * captura para que se registre aunque algo detenga la propagación.
 *
 * No carga nada, no manda peticiones propias y no usa cookies: solo deja el
 * evento en la cola que GA4 o GTM ya estén leyendo. Si no hay ninguna
 * configurada —que es el estado actual comprobado en producción— la función no
 * hace absolutamente nada y el usuario no paga ni un byte por esto.
 */

type Dataset = Record<string, string | undefined>;

/**
 * Vista mínima de los globales que instalan GA4 y GTM.
 *
 * No se declaran con `declare global`: `@next/third-parties` ya amplía
 * `Window` con su propia firma de `dataLayer`, y una segunda declaración con
 * un tipo distinto rompe la compilación. Un cast local en el único punto donde
 * se tocan es más honesto — deja claro que son globales de un tercero y no
 * algo que este proyecto controle.
 */
type VentanaConMedicion = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Traduce el `data-cta` del elemento al canal de contacto que representa. */
function canal(cta: string): string {
  if (cta.startsWith('whatsapp')) return 'whatsapp';
  if (cta.startsWith('call')) return 'llamada';
  if (cta.startsWith('email')) return 'correo';
  return 'otro';
}

export function CtaTracking() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.('[data-cta]');
      if (!(el instanceof HTMLElement)) return;

      const cta = (el.dataset as Dataset).cta;
      if (!cta) return;

      const payload = {
        /* Nombres en español porque son los que va a leer quien mire el panel,
           que no es quien escribió este archivo. */
        metodo: canal(cta),
        ubicacion: cta,
        pagina: pathname,
      };

      /* GTM: se deja en la cola. GA4 directo: se manda como evento.
         Nunca los dos — ver components/Analytics.tsx. */
      const w = window as VentanaConMedicion;

      if (w.dataLayer) {
        w.dataLayer.push({ event: 'contacto', ...payload });
      } else if (typeof w.gtag === 'function') {
        w.gtag('event', 'contacto', payload);
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [pathname]);

  return null;
}
