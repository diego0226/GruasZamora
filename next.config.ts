import type { NextConfig } from 'next';

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
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
