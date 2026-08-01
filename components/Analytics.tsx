import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { CtaTracking } from './CtaTracking';
import { WebVitals } from './WebVitals';

/**
 * Analítica, cableada por variables de entorno.
 *
 * Reglas que sigue este componente:
 *
 * 1. **Sin IDs inventados.** Si la variable no está configurada no se renderiza
 *    nada y no se descarga ningún script. Un sitio sin analítica configurada
 *    pesa exactamente lo mismo que antes de existir este archivo.
 *
 * 2. **GTM tiene prioridad sobre GA4.** Si alguien configura los dos, lo normal
 *    es que GA4 ya esté puesto como etiqueta dentro de GTM — cargar además el
 *    script directo de GA4 dispararía cada visita dos veces y arruinaría los
 *    datos justo cuando se empiecen a mirar. Así que si hay GTM, GA4 se asume
 *    configurado adentro.
 *
 * 3. **Fuera del camino crítico.** `@next/third-parties` carga estos scripts
 *    después de que la página es interactiva, así que no compiten con el LCP
 *    ni con el teléfono, que es lo único que de verdad importa aquí.
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  /* Sin ninguna de las dos variables no se renderiza nada: ni el script ni el
     seguimiento de CTA, que sin destino no tendría a dónde mandar el evento.

     ⚠️ Comprobado en producción: hoy NO hay ninguna configurada, así que el
     sitio no está midiendo nada. Es el hallazgo F-09 de la auditoría y se
     resuelve poniendo la variable en Vercel, no tocando código. */
  if (!gtmId && !gaId) return null;

  return (
    <>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : <GoogleAnalytics gaId={gaId!} />}
      <CtaTracking />
      <WebVitals />
    </>
  );
}
