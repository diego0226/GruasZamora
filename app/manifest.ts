import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Se sirve en /manifest.webmanifest.
 *
 * Para un servicio de grúas tiene un uso concreto y no decorativo: alguien que
 * ya nos llamó una vez puede guardar el sitio en la pantalla de inicio y tener
 * el botón de llamada a un toque la próxima vez que se le vare el carro. Sin
 * manifest, ese acceso directo sale con un icono genérico y el nombre cortado
 * de la pestaña.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.shortName,
    description:
      'Servicio de grúas 24/7 en Grecia, Occidente y todo Costa Rica. Plataforma, arrastre y rescate vehicular.',
    start_url: '/',
    display: 'standalone',
    background_color: '#04080f',
    theme_color: '#08111d',
    lang: 'es-CR',
    dir: 'ltr',
    categories: ['business', 'travel', 'utilities'],
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        // `any` para que el sistema lo escale a cualquier tamaño que necesite.
        sizes: 'any',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
  };
}
