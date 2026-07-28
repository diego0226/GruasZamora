/**
 * Constructores de JSON-LD (schema.org).
 *
 * Es lo que le permite a Google entender que esto es un negocio local de
 * grúas en Grecia que atiende todo Costa Rica, y lo que alimenta los
 * resultados enriquecidos y las respuestas de los buscadores con IA.
 *
 * ⚠️ Nunca agregue aggregateRating ni review inventados: Google lo detecta,
 * quita los resultados enriquecidos del sitio y puede penalizar el dominio.
 */

import { SITE } from './site';
import { FAQS } from './faq';
import type { Service } from './services';
import type { Zone } from './zones';
import { ZONES } from './zones';

const ID_BUSINESS = `${SITE.url}/#business`;

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
      'Servicio de grúas 24/7 en Costa Rica. Remolque con grúa de plataforma y de arrastre, y rescate vehicular. Empresa de Grecia, Alajuela, con cobertura en todo el territorio nacional.',
    url: SITE.url,
    telephone: SITE.phone.e164,
    email: SITE.email,
    image: `${SITE.url}/grua3.jpg`,
    logo: `${SITE.url}/icon.svg`,
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
    /** Radio de acción real desde la base. */
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      geoRadius: SITE.geo.serviceRadius,
    },
    /** Los lugares nombrados le dicen a Google dónde queremos aparecer. */
    areaServed: [
      { '@type': 'Country', name: 'Costa Rica' },
      ...ZONES.filter((z) => z.kind !== 'nacional').map((z) => ({
        '@type': z.kind === 'provincia' ? 'State' : ('City' as const),
        name: z.name,
      })),
    ],
    /** Abierto 24/7 — el atributo más importante para un servicio de grúas. */
    openingHoursSpecification: {
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
    },
    /* `sameAs` es lo que le confirma a Google que estos perfiles y este sitio
       son la misma empresa. La ficha de Google Business solo entra si está
       configurada: un enlace vacío o inventado haría más daño que bien. */
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.googleBusinessUrl].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de grúa y remolque de vehículos',
      itemListElement: [
        'Remolque con grúa de plataforma',
        'Remolque con grúa de arrastre',
        'Rescate vehicular con cabrestante',
        'Traslado de vehículos entre provincias',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone.e164,
      contactType: 'emergency',
      areaServed: 'CR',
      availableLanguage: ['es', 'en'],
      hoursAvailable: {
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
      },
    },
  };
}

/** FAQPage — habilita el acordeón de preguntas en los resultados. */
export function faqSchema(items = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Un servicio concreto, atado al negocio como proveedor. */
export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.heading,
    description: service.metaDescription,
    url: `${SITE.url}/servicios/${service.slug}`,
    image: `${SITE.url}${service.image}`,
    provider: { '@id': ID_BUSINESS },
    areaServed: { '@type': 'Country', name: 'Costa Rica' },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: SITE.phone.e164,
        contactType: 'emergency',
      },
      serviceUrl: `${SITE.url}/servicios/${service.slug}`,
    },
  };
}

/** Landing de zona: el negocio ofreciendo servicio en un lugar concreto. */
export function zoneServiceSchema(zone: Zone) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Servicio de grúas ${zone.inName}`,
    serviceType: 'Servicio de grúas y remolque de vehículos',
    description: zone.metaDescription,
    url: `${SITE.url}/${zone.slug}`,
    provider: { '@id': ID_BUSINESS },
    areaServed:
      zone.kind === 'nacional'
        ? { '@type': 'Country', name: 'Costa Rica' }
        : {
            '@type': zone.kind === 'provincia' ? 'State' : 'City',
            name: zone.name,
            ...(zone.geo && {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: zone.geo.latitude,
                longitude: zone.geo.longitude,
              },
            }),
          },
    hoursAvailable: {
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
    },
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
    name: 'Servicios de grúa y remolque',
    itemListElement: services.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: service.name,
      url: `${SITE.url}/servicios/${service.slug}`,
    })),
  };
}

/** Migas de pan — mejoran cómo se ve la URL en los resultados. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
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
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    inLanguage: 'es-CR',
    publisher: { '@id': ID_BUSINESS },
  };
}
