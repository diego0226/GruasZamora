import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { CtaTracking } from './CtaTracking';
import { WebVitals } from './WebVitals';
import type { Medicion } from '@/lib/analytics';

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
 * 3. **Fuera del camino crítico, de verdad.** Ver la nota de abajo.
 */

/**
 * ── Por qué GA4 ya no usa `@next/third-parties` ──────────────────────────────
 *
 * El componente `GoogleAnalytics` de `@next/third-parties` carga gtag.js con la
 * estrategia `afterInteractive`, y esa estrategia hace que Next emita un
 * `<link rel="preload" as="script">` en el `<head>`. Comprobado en producción:
 * el HTML servido traía
 *
 *     <link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=…"
 *           as="script">
 *
 * Una precarga de script es de prioridad alta, y apunta a OTRO dominio: el
 * navegador tiene que resolver DNS, abrir TCP y negociar TLS con
 * googletagmanager.com —tres viajes de ida y vuelta— compitiendo por el ancho
 * de banda con la foto del hero, que es el elemento LCP. En una red móvil
 * lenta, que es la del usuario de este sitio, eso se paga en la métrica.
 *
 * `GoogleAnalytics` no expone ninguna prop para cambiar la estrategia, así que
 * se arma a mano con dos etiquetas `<Script>`, que es lo que documenta Next:
 *
 * · El fragmento **en línea** va `afterInteractive`. Crea `dataLayer` y `gtag`
 *   y encola el `config`. No descarga nada — son cuatro líneas de texto—, así
 *   que no le quita ancho de banda a nadie, y tiene que correr temprano para
 *   que los eventos disparados antes de que llegue la librería no se pierdan:
 *   quedan en la cola y gtag.js los procesa al arrancar.
 *
 * · La **librería** va `lazyOnload`: se descarga cuando el navegador queda
 *   libre después del evento `load`. La medición sigue completa —incluida la
 *   visita— y la ruta crítica se queda sin terceros.
 *
 * GTM se deja tal cual en `@next/third-parties`: hoy no hay ninguna cuenta de
 * GTM configurada, y reescribir a mano un snippet que nadie está ejerciendo es
 * asumir riesgo sin ganar nada. El día que se use, merece el mismo tratamiento.
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  /* Sin ninguna de las dos variables no se renderiza nada: ni el script ni el
     seguimiento de CTA, que sin destino no tendría a dónde mandar el evento. */
  if (!gtmId && !gaId) return null;

  /* Esta línea ES la regla 2 de arriba, y ahora también es lo que usan los
     emisores de eventos para saber en qué formato hablar. Antes cada uno lo
     deducía por su cuenta mirando qué global existía en `window`, y se
     equivocaba siempre que había GA4 directo — ver lib/analytics.ts. */
  const modo: Medicion = gtmId ? 'gtm' : 'ga4';

  return (
    <>
      {gtmId ? (
        <GoogleTagManager gtmId={gtmId} />
      ) : (
        <>
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`,
            }}
          />
          <Script
            id="ga4-lib"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
        </>
      )}
      <CtaTracking modo={modo} />
      <WebVitals modo={modo} />
    </>
  );
}
