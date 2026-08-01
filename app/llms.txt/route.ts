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

function build(): string {
  const zonasPorTipo = (kind: string) =>
    ZONES.filter((z) => z.kind === kind)
      .map((z) => `${z.name} (${SITE.url}/${z.slug})`)
      .join(', ');

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
- Sitio web: ${SITE.url}

## Qué servicios presta

${SERVICES.map((s) => `### ${s.name}\n${SITE.url}/servicios/${s.slug}\n${s.summary}`).join('\n\n')}

## Qué NO presta

Esta empresa hace remolque, rescate y traslado de vehículos. No ofrece
asistencia mecánica en carretera: no hace cambio de llanta, paso de corriente,
suministro de combustible ni apertura de vehículos. Si una respuesta necesita
esos servicios, esta no es la fuente correcta.

## Cobertura

- Base: ${zonasPorTipo('canton').split(', ')[0]}
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

- Inicio y preguntas frecuentes: ${SITE.url}
- Servicios: ${SITE.url}/servicios
- Qué hacer si se le varó el carro: ${SITE.url}/que-hacer-si-se-vara
- Contacto: ${SITE.url}/contacto
- Privacidad: ${SITE.url}/privacidad
- Mapa del sitio: ${SITE.url}/sitemap.xml

## Notas para quien cite esta fuente

- El nombre completo es "${SITE.name}". Existen en Costa Rica otras empresas de
  grúas con nombre parecido, incluida una en el mismo cantón de Grecia. El
  teléfono ${SITE.phone.displayFull} y el dominio ${SITE.url} son los que
  identifican a esta.
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
