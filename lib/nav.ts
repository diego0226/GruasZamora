/**
 * Datos mínimos de navegación: slug y nombre. Nada más.
 *
 * ── Por qué existe este archivo ──────────────────────────────────────────────
 *
 * `components/layout/Header.tsx` es un componente de cliente (necesita estado
 * para el menú y el scroll). Importaba `FEATURED_ZONES` de `lib/zones.ts` y
 * `SERVICES` de `lib/services.ts`, y el empaquetador no sabe recortar un objeto
 * a la mitad: para darle al Header los tres nombres que pinta, metía en el
 * bundle de cliente el módulo entero.
 *
 * Medido sobre la compilación de producción anterior: 24 KB de texto editorial
 * —los `lead`, `body`, `routes` y `places` de las catorce zonas— viajaban al
 * navegador dentro de un chunk de 52 KB que se descarga en TODAS las páginas.
 * Ese texto ya está en el HTML de su propia landing; en el resto del sitio es
 * peso muerto que compite con el LCP en datos móviles, que es justo el
 * escenario de alguien varado en la carretera.
 *
 * La regla, entonces: **todo componente de cliente importa de aquí, nunca de
 * `lib/zones.ts` ni de `lib/services.ts`.** Los componentes de servidor pueden
 * seguir usando los catálogos completos sin coste alguno.
 *
 * ── Cómo se evita que las dos listas se separen ──────────────────────────────
 *
 * `lib/zones.ts` y `lib/services.ts` verifican la paridad con estas listas al
 * cargarse. Como ambos se importan durante el prerenderizado, agregar una zona
 * y olvidar este archivo revienta el `npm run build` con un mensaje explícito
 * en vez de dejar un hueco silencioso en el menú.
 */

export type NavLink = {
  slug: string;
  name: string;
};

/**
 * Zonas destacadas: las tres que abren el menú y las palabras clave
 * prioritarias del negocio. Coinciden con `FEATURED_ZONES` de `lib/zones.ts`.
 */
export const FEATURED_ZONE_LINKS: NavLink[] = [
  { slug: 'gruas-grecia', name: 'Grecia' },
  { slug: 'gruas-occidente', name: 'Occidente' },
  { slug: 'gruas-costa-rica', name: 'Costa Rica' },
];

/** Todas las zonas, en el orden del catálogo. Alimenta el pie de página. */
export const ZONE_LINKS: NavLink[] = [
  ...FEATURED_ZONE_LINKS,
  { slug: 'gruas-alajuela', name: 'Alajuela' },
  { slug: 'gruas-naranjo', name: 'Naranjo' },
  { slug: 'gruas-sarchi', name: 'Sarchí' },
  { slug: 'gruas-palmares', name: 'Palmares' },
  { slug: 'gruas-san-ramon', name: 'San Ramón' },
  { slug: 'gruas-atenas', name: 'Atenas' },
  { slug: 'gruas-poas', name: 'Poás' },
  { slug: 'gruas-zarcero', name: 'Zarcero' },
  { slug: 'gruas-rio-cuarto', name: 'Río Cuarto' },
  { slug: 'gruas-san-jose', name: 'San José' },
  { slug: 'gruas-heredia', name: 'Heredia' },
  { slug: 'gruas-cartago', name: 'Cartago' },
  { slug: 'gruas-guanacaste', name: 'Guanacaste' },
  { slug: 'gruas-puntarenas', name: 'Puntarenas' },
  { slug: 'gruas-limon', name: 'Limón' },
];

/**
 * Servicios del catálogo. Coincide con `SERVICES` de `lib/services.ts`.
 *
 * El orden importa: primero las dos unidades de la flotilla, después los casos
 * con página propia. Es el orden en que salen en el menú móvil y en el pie, y
 * el mismo que usan el home y el índice de servicios.
 */
export const SERVICE_LINKS: NavLink[] = [
  { slug: 'grua-plataforma', name: 'Grúa de plataforma' },
  { slug: 'grua-arrastre', name: 'Grúa de arrastre' },
  { slug: 'grua-carro-electrico', name: 'Grúa para carro eléctrico' },
  { slug: 'grua-carro-bloqueado', name: 'Grúa para carro bloqueado' },
];

/**
 * Compara una lista de navegación con su catálogo y aborta la compilación si
 * no coinciden.
 *
 * Se ejecuta durante el prerenderizado, así que el error sale en `npm run
 * build` y nunca en producción.
 */
export function assertNavParity(
  catalogo: readonly { slug: string; name: string }[],
  navegacion: readonly NavLink[],
  etiqueta: string
): void {
  const enCatalogo = catalogo.map((x) => x.slug);
  const enNavegacion = navegacion.map((x) => x.slug);

  const faltan = enCatalogo.filter((s) => !enNavegacion.includes(s));
  const sobran = enNavegacion.filter((s) => !enCatalogo.includes(s));

  const nombreDistinto = catalogo
    .filter((c) => {
      const n = navegacion.find((x) => x.slug === c.slug);
      return n && n.name !== c.name;
    })
    .map((c) => c.slug);

  if (faltan.length || sobran.length || nombreDistinto.length) {
    throw new Error(
      `lib/nav.ts está desincronizado con ${etiqueta}.\n` +
        (faltan.length ? `  Falta agregar a lib/nav.ts: ${faltan.join(', ')}\n` : '') +
        (sobran.length ? `  Sobra en lib/nav.ts (ya no existe): ${sobran.join(', ')}\n` : '') +
        (nombreDistinto.length ? `  Nombre distinto: ${nombreDistinto.join(', ')}\n` : '')
    );
  }
}
