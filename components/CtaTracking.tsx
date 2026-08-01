'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { enviarEvento, type Medicion } from '@/lib/analytics';

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
 * configurada, este componente ni siquiera se renderiza —lo decide
 * components/Analytics.tsx— y el usuario no paga ni un byte por esto.
 *
 * ⚠️ El envío en sí vive en lib/analytics.ts, no aquí. Antes este archivo
 * elegía el formato mirando qué global existía en `window` y se equivocaba
 * siempre que la medición era GA4 directo: los clics se enviaban con la forma
 * de GTM y no llegaban a ningún informe. La nota completa está en ese archivo.
 */

type Dataset = Record<string, string | undefined>;

/** Traduce el `data-cta` del elemento al canal de contacto que representa. */
function canal(cta: string): string {
  if (cta.startsWith('whatsapp')) return 'whatsapp';
  if (cta.startsWith('call')) return 'llamada';
  if (cta.startsWith('email')) return 'correo';
  return 'otro';
}

export function CtaTracking({ modo }: { modo: Medicion }) {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.('[data-cta]');
      if (!(el instanceof HTMLElement)) return;

      const cta = (el.dataset as Dataset).cta;
      if (!cta) return;

      enviarEvento(modo, 'contacto', {
        /* Nombres en español porque son los que va a leer quien mire el panel,
           que no es quien escribió este archivo. */
        metodo: canal(cta),
        ubicacion: cta,
        pagina: pathname,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [pathname, modo]);

  return null;
}
