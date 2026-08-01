/**
 * Envío de eventos a la analítica configurada.
 *
 * ── El error que corrige este archivo ───────────────────────────────────────
 *
 * Antes, cada emisor de eventos decidía a dónde mandarlos preguntando qué
 * global existía en `window`:
 *
 *     if (window.dataLayer)      → push({ event: 'contacto', … })   // GTM
 *     else if (window.gtag)      → gtag('event', 'contacto', …)     // GA4
 *
 * Parece razonable y está mal, porque las dos formas de medir crean
 * `dataLayer`. El fragmento de arranque de gtag.js —el de GA4 directo, que es
 * el que corre en producción— empieza justamente por
 * `window.dataLayer = window.dataLayer || []`. Así que con GA4 la condición
 * daba verdadera SIEMPRE y la rama de `gtag` no se ejecutaba nunca.
 *
 * El objeto que se empujaba, `{ event: 'contacto', … }`, es la forma que
 * entiende GTM: dispara un activador de evento personalizado dentro del
 * contenedor. GA4 directo no lee `dataLayer` buscando esa forma; espera la
 * llamada `gtag('event', …)`. El resultado es que los eventos salían, nadie
 * daba error, y no llegaban a ningún informe: los clics en «Llamar» y en
 * WhatsApp —que en este sitio SON la conversión— no se estaban midiendo.
 *
 * ── Cómo se arregla ─────────────────────────────────────────────────────────
 *
 * No se adivina por los globales: se recibe el modo. `components/Analytics.tsx`
 * ya decide cuál de las dos mediciones se monta —GTM tiene prioridad sobre
 * GA4— y ahora esa misma decisión viaja hasta aquí. Una sola fuente de verdad,
 * y ninguna deducción de por medio.
 *
 * Invertir el orden de los `if` NO habría servido: cuando GTM carga una
 * etiqueta de GA4, el propio contenedor define `window.gtag`. Preguntar por
 * `gtag` primero habría empezado a saltarse el contenedor a mitad de carga, y
 * las etiquetas que el usuario tenga colgadas del evento no se dispararían.
 * El síntoma sería el mismo de antes —eventos que se envían y no aparecen—
 * pero ahora dependiendo de en qué milisegundo se hizo clic.
 */

/** Qué medición está montada. Lo decide `components/Analytics.tsx`. */
export type Medicion = 'gtm' | 'ga4';

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

/**
 * Manda un evento por el canal que corresponda.
 *
 * Con GA4 no hace falta esperar a que gtag.js termine de bajar: el fragmento
 * en línea define `gtag` desde el principio y deja las llamadas en la cola de
 * `dataLayer`, que la librería procesa al arrancar. Un clic en los primeros
 * segundos —justo el que más importa aquí— se registra igual.
 *
 * ⚠️ Los parámetros propios (`metodo`, `ubicacion`, `pagina`…) llegan a GA4,
 * pero para verlos en un informe hay que darlos de alta como dimensiones
 * personalizadas en Administrar → Definiciones personalizadas. Sin ese paso el
 * evento aparece, y los parámetros no.
 */
export function enviarEvento(
  modo: Medicion,
  nombre: string,
  parametros: Record<string, string | number>
): void {
  const w = window as VentanaConMedicion;

  if (modo === 'gtm') {
    w.dataLayer?.push({ event: nombre, ...parametros });
    return;
  }

  w.gtag?.('event', nombre, parametros);
}
