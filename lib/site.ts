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

  /**
   * Todas las formas en que la gente nombra la empresa.
   *
   * Buscar "Grúas Zamora" en Costa Rica devuelve varias empresas distintas:
   * Grúas Diego Zamora, Grúas Zamora Zamora y las Grúas Zamoranas de México,
   * más un par de fichas de directorio con el nombre legal. Con tanto homónimo,
   * Google no puede deducir por su cuenta cuál de todas es este sitio.
   *
   * `alternateName` en el JSON-LD es la manera de decírselo explícitamente: que
   * la entidad que se llama "Grúas Zamora Moya" también responde a "Grúas
   * Zamora" a secas. Sin esto, la búsqueda de marca compite contra los
   * homónimos en igualdad de condiciones.
   *
   * Van con y sin tilde porque casi nadie la escribe al teclear en el celular,
   * y el nombre legal porque es el que aparece en los directorios existentes.
   */
  alternateNames: [
    'Grúas Zamora',
    'Gruas Zamora',
    'Gruas Zamora Moya',
    'Grúas Zamora Moya S.A.',
    'Gruas Zamora Moya S.A.',
  ],

  /**
   * Dominio de producción. Alimenta metadataBase, los canonical, el sitemap,
   * el robots.txt y los @id del JSON-LD: es la URL que el sitio declara como
   * suya ante Google.
   *
   * Va con `www` a propósito. Vercel redirige el apex con 308 hacia www, así
   * que apuntar el canonical al apex señalaría una URL que redirige — un salto
   * de más en cada rastreo.
   *
   * El valor por defecto es el dominio real, NO un respaldo de desarrollo. Si
   * dependiera de que alguien recuerde configurar NEXT_PUBLIC_SITE_URL en
   * Vercel, el día que se olvide el sitio entero le diría a Google que la
   * versión buena está en otro dominio. Pasó: hasta esta corrección el sitio
   * publicaba `canonical="https://gruas-zamora.vercel.app"`.
   *
   * La variable sigue existiendo para sobrescribirlo en previews.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gruaszamoramoya.com').replace(/\/$/, ''),

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

  /**
   * URL del perfil de Google Business, cuando exista.
   *
   * Es el enlace más valioso del archivo: para búsquedas locales como
   * "grúas Grecia", la ficha de Google Business decide el paquete de mapas —
   * los tres resultados con mapa que salen antes que los enlaces azules— y eso
   * pesa más que cualquier optimización del sitio.
   *
   * Al declararlo en `sameAs`, se le dice a Google que este sitio y esa ficha
   * son la misma empresa. Se lee de una variable de entorno para que la ficha
   * se pueda enlazar sin tocar código.
   */
  googleBusinessUrl: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ?? '',

  /** Años de trayectoria declarados por la empresa. */
  yearsOfExperience: 30,

  paymentMethods: ['SINPE Móvil', 'Efectivo', 'Transferencia bancaria', 'Factura electrónica'],
} as const;

/**
 * Imagen de vista previa al compartir el link (WhatsApp, Facebook, etc.).
 *
 * Va como constante porque Next.js NO fusiona `openGraph` campo por campo:
 * si una página declara su propio bloque `openGraph`, reemplaza entero al del
 * layout raíz. Toda página que defina `openGraph` tiene que incluir
 * `images: [OG_IMAGE]` explícitamente o se comparte sin imagen.
 *
 * El archivo lo genera scripts/generate-og.mjs — vea ahí por qué es un JPG
 * estático y no un `next/og`.
 */
export const OG_IMAGE = {
  url: '/og.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: `${SITE.name} — grúas 24/7 en Grecia, Occidente y todo Costa Rica. Teléfono ${SITE.phone.display}.`,
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
