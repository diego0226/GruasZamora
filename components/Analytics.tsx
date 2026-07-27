import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

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

  if (gtmId) return <GoogleTagManager gtmId={gtmId} />;
  if (gaId) return <GoogleAnalytics gaId={gaId} />;

  return null;
}
