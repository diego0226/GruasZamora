/**
 * Constructores de JSON-LD (schema.org).
 *
 * Es lo que le permite a Google entender que esto es un negocio local de
 * grúas en Grecia que atiende todo Costa Rica, y lo que alimenta los
 * resultados enriquecidos y las respuestas de los buscadores con IA.
 *
 * ── El grafo, y por qué está atado por `@id` ────────────────────────────────
 *
 * Todas las entidades tienen identificador estable y se referencian entre
 * ellas en lugar de repetirse:
 *
 *     WebSite  ──publisher──▶  LocalBusiness ◀──provider──  Service
 *        ▲                          ▲                          │
 *        │isPartOf                  │about                     │mainEntity
 *        └────────  WebPage  ───────┴──────────────────────────┘
 *                      │
 *                      ├─primaryImageOfPage─▶ ImageObject
 *                      └─breadcrumb────────▶ BreadcrumbList
 *
 * Sin los `@id`, cada página declaraba entidades sueltas y un buscador tenía
 * que adivinar que el `Service` de /gruas-grecia y el de /gruas-naranjo los
 * presta la misma empresa. Con ellos queda dicho explícitamente. Eso importa
 * más de lo normal en este caso concreto: buscar «Grúas Zamora» en Costa Rica
 * devuelve varias empresas distintas —Grúas Diego Zamora, en el mismo cantón,
 * entre ellas—, así que cuanto menos tenga que deducir Google, mejor.
 *
 * ⚠️ Nunca agregue aggregateRating ni review inventados: Google lo detecta,
 * quita los resultados enriquecidos del sitio y puede penalizar el dominio.
 */

import { SITE, CONTENT_UPDATED } from './site';
import { FAQS } from './faq';
import type { Service } from './services';
import { SERVICES } from './services';
import type { Zone } from './zones';
import { ZONES } from './zones';

const ID_BUSINESS = `${SITE.url}/#business`;
const ID_WEBSITE = `${SITE.url}/#website`;
/** Imagen principal de la marca, descrita una sola vez y referenciada. */
const ID_PRIMARY_IMAGE = `${SITE.url}/#primaryimage`;

/** Identificadores derivados de una ruta. Se usan para enlazar el grafo. */
const idsFor = (path: string) => {
  const url = `${SITE.url}${path === '/' ? '' : path}`;
  return {
    url,
    page: `${url}#webpage`,
    breadcrumb: `${url}#breadcrumb`,
    service: `${url}#service`,
    faq: `${url}#faq`,
  };
};

const HORARIO_24_7 = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  opens: '00:00',
  closes: '23:59',
} as const;

/**
 * Traduce el tipo interno de zona al tipo de schema.org que le corresponde.
 *
 * Antes todo lo que no fuera provincia se declaraba `City`, y eso incluía a
 * «Occidente», que no es una ciudad sino un conjunto de cantones. Declarar mal
 * el tipo de un lugar es una afirmación falsa sobre una entidad geográfica que
 * Google conoce perfectamente.
 */
function placeType(kind: Zone['kind']): string {
  if (kind === 'nacional') return 'Country';
  if (kind === 'provincia') return 'State';
  if (kind === 'region') return 'AdministrativeArea';
  return 'City';
}

/** Ficha principal del negocio. Va en el layout raíz, una sola vez. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    '@id': ID_BUSINESS,
    name: SITE.name,
    /* Lo que ata la búsqueda "Grúas Zamora" a esta empresa y no a los otros
       negocios con nombre parecido. Ver la nota en lib/site.ts. */
    alternateName: [...SITE.alternateNames],
    legalName: SITE.legalName,
    description:
      'Servicio de grúas 24/7 en Costa Rica. Remolque con grúa de plataforma y de arrastre, rescate vehicular y traslado de vehículos eléctricos, híbridos y con las llantas trabadas mediante speed dollies. Empresa de Grecia, Alajuela, con cobertura en todo el territorio nacional.',
    url: SITE.url,
    telephone: SITE.phone.e164,
    email: SITE.email,
    image: { '@id': ID_PRIMARY_IMAGE },
    /* `logo` tiene que ser un mapa de bits: Google no admite SVG para el logo
       de una organización, y aquí apuntaba a /icon.svg — es decir, no se
       estaba tomando ninguno. /apple-icon es el PNG de 180x180 que genera
       app/apple-icon.tsx, muy por encima del mínimo de 112 px. */
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/apple-icon`,
      width: 180,
      height: 180,
    },
    priceRange: '$$',
    currenciesAccepted: 'CRC',
    paymentAccepted: SITE.paymentMethods.join(', '),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    /* Aquí iba un `serviceArea` de tipo GeoCircle con radio de 200 km desde
       Grecia. Se quitó: Costa Rica mide unos 460 km de punta a punta, así que
       ese círculo dejaba fuera medio Guanacaste, el Pacífico Sur y buena parte
       de Limón — provincias que el sitio dice atender en el home, en la página
       nacional y en la FAQ. La cobertura real se declara abajo con
       `areaServed`, que sí admite el país entero sin mentir sobre la forma. */
    /* Las siete provincias quedan cubiertas: San José, Heredia, Cartago,
       Guanacaste, Puntarenas y Limón tienen entrada propia en ZONES, y
       Alajuela entra por sus cantones. Antes faltaban las tres del final, así
       que el schema contradecía al texto visible del home. */
    areaServed: [
      { '@type': 'Country', name: 'Costa Rica' },
      ...ZONES.filter((z) => z.kind !== 'nacional').map((z) => ({
        '@type': placeType(z.kind),
        name: z.name,
      })),
    ],
    /** Abierto 24/7 — el atributo más importante para un servicio de grúas. */
    openingHoursSpecification: HORARIO_24_7,
    /* `sameAs` es lo que le confirma a Google que estos perfiles y este sitio
       son la misma empresa. Es la señal que más pesa en búsquedas locales como
       «grúas Grecia»: el paquete de mapas lo alimenta la ficha de Google
       Business, no la web, y atarlas explícitamente evita que Google tenga que
       deducir cuál de los homónimos del cantón es cuál.

       El `filter(Boolean)` deja fuera la ficha si la variable no está
       definida — en una preview, por ejemplo. Es a propósito: un enlace vacío
       o inventado haría más daño que no declarar ninguno. Ver .env.example.

       Aquí vivía una nota que afirmaba que la variable NO estaba configurada
       en Vercel. Lo estuvo hasta que dejó de estarlo, y el comentario siguió
       diciendo lo contrario. Un comentario no puede afirmar el estado de un
       entorno que cambia sin tocar este archivo: para saber qué se está
       publicando de verdad, mire el `sameAs` del HTML en producción. */
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.googleBusinessUrl].filter(Boolean),
    /* Cada oferta apunta a la URL donde ese servicio está explicado. Antes el
       catálogo listaba cuatro nombres sueltos, dos de los cuales no
       correspondían a ninguna página del sitio. */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de grúa y remolque de vehículos',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@id': idsFor(`/servicios/${service.slug}`).service },
      })),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone.e164,
      contactType: 'emergency',
      areaServed: 'CR',
      availableLanguage: ['es'],
      hoursAvailable: HORARIO_24_7,
    },
  };
}

/**
 * La fotografía principal, descrita como entidad propia.
 *
 * Se declara una vez en el layout y el resto del grafo la referencia por `@id`.
 * Una imagen con dimensiones y descripción explícitas es más útil para Google
 * Imágenes y para los modelos que una URL suelta dentro de otro objeto.
 */
export function primaryImageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': ID_PRIMARY_IMAGE,
    url: `${SITE.url}/grua3.jpg`,
    contentUrl: `${SITE.url}/grua3.jpg`,
    width: 3051,
    height: 1373,
    caption:
      'Grúa de plataforma de Grúas Zamora Moya, rotulada con la bandera de Estados Unidos, cargando un vehículo en Costa Rica',
  };
}

/**
 * WebPage: la página como entidad, atada al sitio, al negocio y a sus migas.
 *
 * Es la pieza que faltaba en el grafo. Sin ella, el `Service` y el
 * `BreadcrumbList` de cada URL flotaban sin decir de qué página son.
 */
export function webPageSchema({
  path,
  name,
  description,
  dateModified,
  primaryEntityId,
  hasBreadcrumb = false,
  type = 'WebPage',
}: {
  path: string;
  name: string;
  description: string;
  dateModified: string;
  /** `@id` de la entidad principal de la página, si tiene una. */
  primaryEntityId?: string;
  hasBreadcrumb?: boolean;
  /**
   * Subtipo de WebPage cuando corresponde: `ContactPage` para la página de
   * contacto, `FAQPage` no (ese se emite aparte). Usar el subtipo correcto le
   * dice al buscador qué clase de página es sin que tenga que deducirlo.
   */
  type?: 'WebPage' | 'ContactPage' | 'AboutPage';
}) {
  const ids = idsFor(path);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': ids.page,
    url: ids.url,
    name,
    description,
    inLanguage: 'es-CR',
    isPartOf: { '@id': ID_WEBSITE },
    about: { '@id': ID_BUSINESS },
    primaryImageOfPage: { '@id': ID_PRIMARY_IMAGE },
    dateModified,
    ...(primaryEntityId && { mainEntity: { '@id': primaryEntityId } }),
    ...(hasBreadcrumb && { breadcrumb: { '@id': ids.breadcrumb } }),
  };
}

/**
 * FAQPage.
 *
 * Nota sobre expectativas, porque el comentario anterior prometía de más: esto
 * NO «habilita el acordeón en los resultados». Google restringió los rich
 * results de FAQ a sitios de salud y gobierno reconocidos, así que una empresa
 * de grúas no debe planificar tráfico sobre ese formato. El marcado se
 * mantiene porque describe el contenido con precisión y porque los buscadores
 * con IA lo usan para extraer respuestas — no como palanca de CTR.
 *
 * Se emite en UNA sola URL, la portada, que es donde estas preguntas son el
 * contenido principal. Ver la nota de lib/faq.ts.
 */
export function faqSchema(items = FAQS, path = '/') {
  const ids = idsFor(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': ids.faq,
    mainEntityOfPage: { '@id': ids.page },
    inLanguage: 'es-CR',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Un servicio concreto, atado al negocio como proveedor. */
export function serviceSchema(service: Service) {
  const path = `/servicios/${service.slug}`;
  const ids = idsFor(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': ids.service,
    name: service.name,
    /* Las otras formas en que la gente nombra este servicio. Mismo papel que
       el `alternateName` de la ficha del negocio: acercar la entidad a la
       consulta real. «Grúa para carro eléctrico» y «remolque de vehículo
       eléctrico» son la misma cosa y solo una cabe en `name`. */
    ...(service.alternateNames?.length && { alternateName: service.alternateNames }),
    serviceType: service.heading,
    description: service.metaDescription,
    url: ids.url,
    image: `${SITE.url}${service.image}`,
    provider: { '@id': ID_BUSINESS },
    mainEntityOfPage: { '@id': ids.page },
    areaServed: { '@type': 'Country', name: 'Costa Rica' },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: SITE.phone.e164,
        contactType: 'emergency',
      },
      serviceUrl: ids.url,
    },
  };
}

/** Landing de zona: el negocio ofreciendo servicio en un lugar concreto. */
export function zoneServiceSchema(zone: Zone) {
  const ids = idsFor(`/${zone.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': ids.service,
    name: `Servicio de grúas ${zone.inName}`,
    serviceType: 'Servicio de grúas y remolque de vehículos',
    description: zone.metaDescription,
    url: ids.url,
    provider: { '@id': ID_BUSINESS },
    mainEntityOfPage: { '@id': ids.page },
    areaServed:
      zone.kind === 'nacional'
        ? { '@type': 'Country', name: 'Costa Rica' }
        : {
            '@type': placeType(zone.kind),
            name: zone.name,
            ...(zone.geo && {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: zone.geo.latitude,
                longitude: zone.geo.longitude,
              },
            }),
          },
    hoursAvailable: HORARIO_24_7,
  };
}

/**
 * Índice de servicios como lista ordenada.
 *
 * Le dice a Google que /servicios es una página de catálogo y cuáles son sus
 * miembros, en vez de dejar que lo deduzca del HTML.
 */
export function serviceListSchema(services: readonly Service[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${idsFor('/servicios').url}#lista`,
    name: 'Servicios de grúa y remolque',
    itemListElement: services.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: service.name,
      url: idsFor(`/servicios/${service.slug}`).url,
    })),
  };
}

/** Migas de pan — mejoran cómo se ve la URL en los resultados. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  /* El `@id` cuelga de la última miga, que es la página actual: así el
     `breadcrumb` del WebPage puede apuntar aquí sin ambigüedad. */
  const actual = trail[trail.length - 1];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': idsFor(actual.path).breadcrumb,
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: idsFor(item.path).url,
    })),
  };
}

/**
 * WebSite — de aquí saca Google el "nombre del sitio", el texto que sale sobre
 * la URL en cada resultado en lugar del dominio pelado.
 *
 * Es el único lugar donde ese nombre se declara: Google documenta que lo toma
 * del `name` de este bloque, y que usa `alternateName` cuando el nombre largo
 * no cabe. Por eso el corto va aquí y no solo en la ficha del negocio — para la
 * búsqueda "Grúas Zamora", que el resultado se rotule con esas dos palabras es
 * la mitad de ganarla.
 *
 * Sin `potentialAction`/`SearchAction`: el sitio no tiene buscador interno, y
 * declarar uno que no existe es marcado decorativo que además puede generar un
 * aviso en las herramientas de validación.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ID_WEBSITE,
    url: SITE.url,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    inLanguage: 'es-CR',
    publisher: { '@id': ID_BUSINESS },
    dateModified: CONTENT_UPDATED.home,
  };
}
