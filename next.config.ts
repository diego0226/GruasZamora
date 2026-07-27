import type { NextConfig } from 'next';

/** Host canónico. Todo lo demás redirige aquí. */
const CANONICAL_HOST = 'www.gruaszamoramoya.com';

/**
 * Dominio de Vercel que sirvió el sitio antes de comprar el propio.
 *
 * Se nombra exacto y no como comodín `*.vercel.app` a propósito: los deploys
 * de preview también viven bajo ese dominio, y un comodín los redirigiría
 * todos a producción — no se podría revisar un cambio antes de publicarlo.
 */
const LEGACY_HOST = 'gruas-zamora.vercel.app';

/**
 * Política de seguridad de contenido.
 *
 * Cubre la superficie de ataque real de un sitio estático de folletería:
 * clickjacking, inyección de <base>, secuestro del destino de formularios y
 * plugins embebidos.
 *
 * Deliberadamente NO usa nonces. Una CSP con nonces obliga a renderizar el
 * HTML en cada petición, lo que elimina la generación estática de las 18
 * páginas y cambia un TTFB de decenas de milisegundos por uno de cientos. En
 * un sitio sin login, sin formularios y sin entrada de usuario, ese precio no
 * se justifica — y menos cuando la meta declarada es Core Web Vitals altos.
 *
 * `'unsafe-inline'` en script-src es necesario para el script que activa las
 * animaciones y para los bloques JSON-LD. Conviene ser franco: con esa
 * directiva, script-src no protege contra XSS. Está para que las demás
 * directivas puedan aplicarse, no como teatro de seguridad.
 */
const isDev = process.env.NODE_ENV === 'development';

/* React usa eval() en desarrollo para reconstruir los stack traces y mover el
   overlay de errores. En producción no lo usa nunca. Sin esta excepción, la
   CSP deja el modo desarrollo sin overlay ni trazas útiles — se comprobó en el
   navegador al agregar la política. La producción se mantiene estricta. */
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : '',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
]
  .filter(Boolean)
  .join(' ');

const CSP = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
  // El sitio no embebe nada de terceros ni debe poder ser embebido.
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Las fotos reales de las unidades son JPG pesados: dejamos que Next
  // los sirva en AVIF/WebP y en el tamaño exacto de cada breakpoint.
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1920, 2560],
    // Next 16 exige declarar los niveles de calidad permitidos. Usamos uno
    // solo (70) en todas las fotos: a este tamaño es indistinguible de 75 y
    // pesa bastante menos, que es lo que importa en datos móviles.
    qualities: [70],
    // Las fotos de la flotilla no cambian. Un año de caché en el CDN evita
    // reprocesar cada variante AVIF/WebP en cada despliegue.
    minimumCacheTTL: 31536000,
  },

  /**
   * El dominio viejo servía el sitio completo con estado 200, así que Google
   * veía dos copias idénticas en dos dominios. El 308 lo resuelve y traslada
   * al dominio nuevo la autoridad que el viejo hubiera acumulado.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: LEGACY_HOST }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: CSP },
          /* El sitio no pide cámara, micrófono ni ubicación. Declararlo cierra
             esas APIs para cualquier script que llegue a colarse. */
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
          },
          /* Vercel ya envía HSTS, pero declararlo aquí lo hace explícito y
             agrega los subdominios. El sitio es HTTPS puro: no hay nada que
             se rompa al prohibir HTTP. */
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      /* No se declara Cache-Control para /_next/static: Next.js ya sirve esos
         archivos con `max-age=31536000, immutable` por su cuenta, y el build
         avisa de que sobrescribirlo puede romper el comportamiento en
         desarrollo. Duplicar la cabecera no ganaba nada. */
    ];
  },
};

export default nextConfig;
