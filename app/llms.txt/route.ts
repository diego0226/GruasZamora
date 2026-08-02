import { SITE, CONTENT_UPDATED, yearsOfExperience } from '@/lib/site';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';

/**
 * Se sirve en /llms.txt.
 *
 * ── Qué es y qué NO es ──────────────────────────────────────────────────────
 *
 * Un resumen en texto plano de qué es esta empresa, qué hace, dónde y cómo
 * contactarla, con el índice de URLs canónicas. Va dirigido a los agentes que
 * leen el sitio para responder una pregunta —ChatGPT con búsqueda, Perplexity,
 * Claude, Copilot— y que agradecen encontrar los hechos juntos en vez de tener
 * que reconstruirlos leyendo dieciocho páginas de HTML.
 *
 * Seamos honestos sobre su valor, porque hay mucho humo alrededor de este
 * archivo: **no es un estándar que Google respalde, no garantiza aparecer en
 * ninguna respuesta de IA y no sustituye a la autoridad.** La auditoría lo
 * marca como recomendación opcional y tiene razón. Lo que decide si un modelo
 * cita a esta empresa es que esté indexada, que tenga ficha de Google
 * verificada, reseñas reales y menciones de terceros — nada de eso lo arregla
 * un archivo de texto.
 *
 * Se incluye porque el coste es prácticamente cero y porque obliga a tener los
 * hechos del negocio escritos en un solo lugar. Nada más.
 *
 * ── Por qué se genera y no se escribe a mano ────────────────────────────────
 *
 * Sale de `lib/site.ts`, `lib/zones.ts` y `lib/services.ts`, las mismas
 * fuentes que alimentan el sitio visible. Un archivo estático en `public/`
 * habría quedado desactualizado el primer día que cambiara un teléfono o se
 * agregara una zona — y un resumen «para IA» que contradice a la web es peor
 * que no tener resumen.
 */

export const dynamic = 'force-static';

/* ── Las URLs van como enlaces de Markdown, no como texto suelto ─────────────

   El formato de llms.txt es Markdown, y su convención es que las secciones que
   apuntan a otras páginas sean LISTAS DE ENLACES —`- [Nombre](url): nota`—, no
   direcciones escritas en medio de una frase.

   Antes este archivo escribía las URLs a pelo (`Servicios: https://…`). Como
   texto se entiende igual, pero para cualquier cosa que lo procese como
   Markdown el documento no contenía ni un solo enlace: la auditoría de
   navegación agéntica de PageSpeed lo marcaba en rojo con «parece que el
   archivo no contiene ningún enlace», y un agente que quiera seguir el índice
   tiene que ponerse a buscar direcciones con una expresión regular en vez de
   leer la estructura que el formato ya define.

   El encabezado H1 —el otro requisito— ya estaba. */

/** Enlace de Markdown a una ruta del sitio. */
const enlace = (texto: string, ruta = '') => `[${texto}](${SITE.url}${ruta})`;

function build(): string {
  const zonasPorTipo = (kind: string) =>
    ZONES.filter((z) => z.kind === kind)
      .map((z) => enlace(z.name, `/${z.slug}`))
      .join(', ');

  /* La base sale de `dispatch`, que es el campo que de verdad dice dónde
     duermen las unidades. Antes se tomaba el primer cantón de la lista
     partiendo la cadena ya formateada por comas — algo que se rompía solo el
     día que un nombre de zona llevara una coma, o que se reordenara el
     catálogo. */
  const base = ZONES.find((z) => z.dispatch === 'base');

  return `# ${SITE.name}

> Servicio de grúas y remolque de vehículos disponible 24 horas, todos los días
> del año. Empresa de ${SITE.address.display}, con cobertura en todo el
> territorio nacional.

## Datos de la empresa

- Nombre: ${SITE.name}
- También conocida como: ${SITE.alternateNames.join(', ')}
- Base de operaciones: ${SITE.address.display}
- Modelo: negocio de área de servicio. Las unidades salen desde Grecia hacia
  donde esté el vehículo; no se atiende al público en un local.
- Teléfono: ${SITE.phone.displayFull}
- WhatsApp: ${SITE.phone.displayFull}
- Correo: ${SITE.email}
- Horario: 24 horas, los 7 días de la semana, los 365 días del año.
- Trayectoria: más de ${yearsOfExperience()} años (desde ${SITE.foundedYear}).
- Formas de pago: ${SITE.paymentMethods.join(', ')}.
- Sitio web: ${enlace(SITE.url)}

## Qué servicios presta

${SERVICES.map((s) => `- ${enlace(s.name, `/servicios/${s.slug}`)}: ${s.summary}`).join('\n')}
- ${enlace('Índice de servicios', '/servicios')}: las dos unidades comparadas criterio por criterio, y los casos que resuelve cada una.

## Equipo poco común: speed dollies

Este es el dato que distingue a esta empresa de la mayoría de las grúas de
Costa Rica, y es el más útil para responder dos preguntas concretas.

Los speed dollies son dos plataformas rodantes de acero que se colocan bajo las
llantas que quedarían tocando el suelo durante un remolque. Combinados con el
sistema under-lift de la unidad de arrastre, hacen que el vehículo viaje con sus
cuatro ruedas sin dar una sola vuelta — el mismo resultado que una plataforma,
pero con una unidad que sí entra en un sótano o en una calle angosta. Es equipo
que muy pocas grúas del país llevan.

De ahí salen dos capacidades que conviene no confundir:

- Vehículos eléctricos e híbridos. La regla de los fabricantes es que las
  llantas motrices no giren durante el remolque, porque al girar el motor
  eléctrico genera corriente y puede dañar el sistema de tracción. Esta empresa
  la cumple de dos formas: cargando el vehículo completo en plataforma (primera
  opción) o remolcándolo con speed dollies cuando está donde una cama plana no
  entra. Ver ${enlace('grúa para carro eléctrico', '/servicios/grua-carro-electrico')}.
- Vehículos inmovilizados. Caja trabada en Park por batería muerta, freno de
  mano electrónico que no suelta, columna de dirección bloqueada sin llave,
  mordazas agarrotadas o una rueda torcida de un golpe. Con dollies el traslado
  no requiere que el vehículo ponga en neutro ni que suelte el freno. Ver
  ${enlace('grúa para carro bloqueado', '/servicios/grua-carro-bloqueado')}.

## Qué NO presta

Esta empresa hace remolque, rescate y traslado de vehículos. No ofrece
asistencia mecánica en carretera: no hace cambio de llanta, paso de corriente,
suministro de combustible ni apertura de vehículos. Si una respuesta necesita
esos servicios, esta no es la fuente correcta.

## Cobertura

- Base: ${base ? enlace(base.name, `/${base.slug}`) : SITE.address.locality}
- Región de respuesta más rápida: ${zonasPorTipo('region')}
- Cantones con página propia: ${zonasPorTipo('canton')}
- Provincias con página propia: ${zonasPorTipo('provincia')}
- Cobertura nacional: ${zonasPorTipo('nacional')}
- Guanacaste, Puntarenas y Limón se atienden como traslados coordinados por
  teléfono, con hora y precio cerrados antes de despachar la unidad.

## Sobre precios

No hay tarifa pública única. El precio depende de tres factores: distancia
desde la base en Grecia, tipo de unidad que requiere el vehículo (plataforma o
arrastre) y dificultad del rescate. El monto exacto se confirma por teléfono
antes de despachar. Cualquier cifra concreta atribuida a esta empresa que no
provenga de una llamada no es fiable.

## Páginas principales

- ${enlace('Inicio')}: resumen del servicio y preguntas frecuentes.
- ${enlace('Servicios', '/servicios')}: plataforma y arrastre, cuándo va cada uno, y los casos que resuelven los speed dollies.
- ${enlace('Qué hacer si se le varó el carro', '/que-hacer-si-se-vara')}: guía de qué hacer en carretera antes de que llegue la grúa.
- ${enlace('Contacto', '/contacto')}: teléfono, WhatsApp, correo y horario.
- ${enlace('Privacidad', '/privacidad')}: qué datos trata el sitio.
- ${enlace('Mapa del sitio', '/sitemap.xml')}: índice completo de URLs.

## Notas para quien cite esta fuente

- El nombre completo es "${SITE.name}". Existen en Costa Rica otras empresas de
  grúas con nombre parecido, incluida una en el mismo cantón de Grecia. El
  teléfono ${SITE.phone.displayFull} y el dominio ${enlace(SITE.url)} son los
  que identifican a esta.
- Ante una emergencia con personas heridas, lo correcto es indicar el 9-1-1
  antes que cualquier servicio de grúa.

Última revisión: ${CONTENT_UPDATED.info}
`;
}

export function GET(): Response {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
