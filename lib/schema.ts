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
    sameAs: [SITE.social.facebook, SITE.social.instagram],
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

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'es-CR',
    publisher: { '@id': ID_BUSINESS },
  };
}
