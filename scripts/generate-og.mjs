/**
 * Genera public/og.jpg — la imagen que se ve al compartir el link.
 *
 *   node scripts/generate-og.mjs
 *
 * ¿Por qué un archivo estático y no `next/og` como antes?
 * `ImageResponse` solo sabe emitir PNG, y un PNG de 1200x630 con una foto
 * adentro pesa ~1.3 MB. WhatsApp descarta la vista previa cuando la imagen
 * se pasa de peso, así que habríamos terminado sin imagen del todo. El mismo
 * cuadro en JPG pesa ~135 KB. Medido, no supuesto:
 *
 *   PNG a todo color .... 1329 KB   (lo que daría next/og)
 *   PNG paleta de 128 ....  190 KB   (con bandas visibles en la foto)
 *   JPG calidad 82 ......   136 KB   ← este
 *
 * El teléfono se lee de lib/site.ts para no tener dos fuentes de verdad. Si
 * cambia el número, corra este script de nuevo y commitee el JPG resultante.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ── Datos del negocio, leídos de la fuente única ──────────────── */

const siteTs = readFileSync(path.join(raiz, 'lib/site.ts'), 'utf8');
const leer = (clave) => {
  const m = siteTs.match(new RegExp(`${clave}:\\s*'([^']*)'`));
  if (!m) throw new Error(`No se encontró "${clave}" en lib/site.ts — ¿cambió el formato?`);
  return m[1];
};

const TELEFONO = leer('display');

/* ── Paleta, la misma de globals.css ───────────────────────────── */

const NOCHE = '#04080f';
const ROJO = '#c8102e';
const ROJO_VIVO = '#e8192f';
const CROMO = '#f5f8fc';
const CROMO_TENUE = '#aebccd';
const AZUL = '#1b4f8f';

const ANCHO = 1200;
const ALTO = 630;

/* Anton no está instalada en el sistema, así que se usan las mismas
   suplentes que declara el stack tipográfico del sitio: una condensada
   pesada para los titulares. */
const DISPLAY = 'Haettenschweiler, Impact, Arial Narrow, sans-serif';
const TEXTO = 'Arial, Helvetica, sans-serif';

const capa = `
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <defs>
    <linearGradient id="oscuro" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${NOCHE}" stop-opacity="0.97"/>
      <stop offset="42%"  stop-color="${NOCHE}" stop-opacity="0.88"/>
      <stop offset="72%"  stop-color="${NOCHE}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${NOCHE}" stop-opacity="0.20"/>
    </linearGradient>
    <linearGradient id="piso" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="${NOCHE}" stop-opacity="0.85"/>
      <stop offset="35%"  stop-color="${NOCHE}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${ANCHO}" height="${ALTO}" fill="url(#oscuro)"/>
  <rect width="${ANCHO}" height="${ALTO}" fill="url(#piso)"/>

  <!-- Franja de la bandera, como el primer pixel del sitio -->
  <rect x="0"   y="0" width="400" height="11" fill="${ROJO}"/>
  <rect x="400" y="0" width="400" height="11" fill="${CROMO}"/>
  <rect x="800" y="0" width="400" height="11" fill="${AZUL}"/>

  <!-- Disponibilidad -->
  <circle cx="79" cy="99" r="9" fill="${ROJO_VIVO}"/>
  <text x="104" y="107" font-family="${TEXTO}" font-size="23" font-weight="bold"
        letter-spacing="4.5" fill="${CROMO_TENUE}">DISPONIBLE 24 HORAS · 365 DÍAS</text>

  <!-- Titular. El "24/7" va como tspan y no como <text> aparte: así la
       separación la calcula el motor de texto y no queda pegada si algún
       día cambia la fuente o el cuerpo. -->
  <text x="70" y="268" font-family="${DISPLAY}" font-size="150" fill="${CROMO}">GRÚAS <tspan fill="${ROJO_VIVO}">24/7</tspan></text>

  <text x="74" y="330" font-family="${TEXTO}" font-size="30" font-weight="bold"
        letter-spacing="5.5" fill="${CROMO_TENUE}">GRECIA · OCCIDENTE · TODO COSTA RICA</text>

  <!-- Teléfono: el dato por el que se comparte el link -->
  <rect x="70" y="386" width="466" height="104" fill="${ROJO}"/>
  <text x="98" y="431" font-family="${TEXTO}" font-size="20" font-weight="bold"
        letter-spacing="4" fill="#ffffff" fill-opacity="0.9">LLAMAR AHORA</text>
  <text x="96" y="476" font-family="${DISPLAY}" font-size="54" letter-spacing="1"
        fill="#ffffff">${TELEFONO}</text>

  <!-- Pie -->
  <rect x="70" y="546" width="52" height="3" fill="${ROJO_VIVO}"/>
  <text x="70" y="590" font-family="${TEXTO}" font-size="25" font-weight="bold"
        letter-spacing="5" fill="${CROMO}">GRÚAS ZAMORA MOYA</text>
</svg>`;

/* ── Composición ───────────────────────────────────────────────── */

const FUENTE = 'public/grua3.jpg';

// La foto es más panorámica que 1200x630, así que sobra ancho: 2615 es el
// máximo que cabe sin recortar altura. Se toma desde la izquierda (left: 0)
// a propósito. Probé también left 220 y 436, que acercan más la cabina, pero
// en ambos la plataforma queda fuera de cuadro y la unidad se lee como una
// camioneta cualquiera. Con left 0 entra la plataforma completa, el rótulo
// "Zamora" y el escudo: a tamaño de miniatura eso es lo que dice "grúa".
const RECORTE = { left: 0, top: 0, width: 2615, height: 1373 };

const foto = await sharp(path.join(raiz, FUENTE))
  .extract(RECORTE)
  .resize(ANCHO, ALTO, { fit: 'cover' })
  .modulate({ brightness: 0.72 })
  .toBuffer();

const salida = path.join(raiz, 'public/og.jpg');

const info = await sharp(foto)
  .composite([{ input: Buffer.from(capa), top: 0, left: 0 }])
  .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(salida);

console.log(
  `public/og.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB  ` +
    `(teléfono: ${TELEFONO})`
);

if (info.size > 300 * 1024) {
  console.error('\n⚠  Pasa de 300 KB: WhatsApp podría no mostrar la vista previa.');
  process.exit(1);
}
