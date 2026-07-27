/**
 * Datos maestros del negocio (NAP: Name, Address, Phone).
 *
 * ⚠️ FUENTE ÚNICA DE VERDAD. Google premia la consistencia exacta entre este
 * archivo, el perfil de Google Business y cualquier directorio donde aparezca
 * la empresa. Si cambia un teléfono o una dirección, cámbielo SOLO aquí.
 */

const RAW_PHONE = '50683876352';

export const SITE = {
  name: 'Grúas Zamora Moya',
  shortName: 'Grúas Zamora',
  legalName: 'Grúas Zamora Moya',
  tagline: 'Grúas 24/7 en todo Costa Rica',

  /** Dominio de producción. Cambie NEXT_PUBLIC_SITE_URL al comprar el dominio propio. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gruas-zamora.vercel.app').replace(/\/$/, ''),

  phone: {
    /** Formato E.164 — el único que entienden los buscadores y el schema. */
    e164: `+${RAW_PHONE}`,
    /** Para el atributo href="tel:" */
    href: `tel:+${RAW_PHONE}`,
    /** Como lo lee un tico */
    display: '8387-6352',
    displayFull: '+506 8387-6352',
  },

  whatsapp: {
    number: RAW_PHONE,
    href: `https://wa.me/${RAW_PHONE}?text=${encodeURIComponent(
      'Hola Grúas Zamora, necesito una grúa. Mi ubicación es:'
    )}`,
  },

  email: 'gruas.zamo75@gmail.com',

  address: {
    locality: 'Grecia',
    region: 'Alajuela',
    country: 'CR',
    countryName: 'Costa Rica',
    /** Base operativa declarada al público. */
    display: 'Grecia, Alajuela, Costa Rica',
  },

  /** Coordenadas del centro de Grecia, cantón base de operaciones. */
  geo: {
    latitude: 10.0722,
    longitude: -84.3136,
    /** Radio de servicio en metros — cobertura nacional. */
    serviceRadius: 200000,
  },

  social: {
    facebook: 'https://www.facebook.com/gruas.zamora.5873',
    instagram: 'https://www.instagram.com/zamora.gruas/',
  },

  /** Años de trayectoria declarados por la empresa. */
  yearsOfExperience: 30,

  paymentMethods: ['SINPE Móvil', 'Efectivo', 'Transferencia bancaria', 'Factura electrónica'],
} as const;

/** Palabras clave objetivo. Se usan en metadata y para revisar cobertura editorial. */
export const TARGET_KEYWORDS = [
  // Prioridad 1 — donde tenemos que salir de primeros
  'grúas Grecia',
  'grúas occidente',
  'grúas Alajuela',
  'grúas San Ramón',
  'grúas Naranjo',
  'grúas Sarchí',
  // Prioridad 2 — nacional
  'grúas en Costa Rica',
  'grúa 24 horas Costa Rica',
  'remolque de vehículos Costa Rica',
  'grúa plataforma Costa Rica',
] as const;
