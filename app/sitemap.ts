import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';

/**
 * Fechas de última modificación real del contenido.
 *
 * Antes se usaba `new Date()`, así que cada deploy —aunque solo cambiara un
 * color— declaraba que las 18 páginas se habían modificado en ese instante.
 * Google documenta que solo hace caso a `lastmod` cuando es «consistentemente
 * y verificablemente preciso»; un sitio que dice que todo cambió siempre
 * enseña al rastreador a ignorar el campo por completo, y se pierde la
 * capacidad de señalar un cambio real el día que de verdad importe.
 *
 * ⚠️ Actualice estas fechas SOLO cuando cambie el contenido correspondiente.
 */
const LAST_UPDATED = {
  home: '2026-07-27',
  services: '2026-07-27',
  zones: '2026-07-27',
} as const;

/**
 * Se sirve en /sitemap.xml y se declara desde robots.txt.
 *
 * Sin `changeFrequency` ni `priority`: Google declaró explícitamente que
 * ignora ambos campos. Incluirlos no ayuda y sugiere que el sitemap se generó
 * con una plantilla de hace quince años.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      /* Sin barra final, para que coincida exactamente con el canonical que
         emite la portada. Google las normaliza igual, pero dos formas de la
         misma URL en señales distintas es ruido gratis. */
      url: SITE.url,
      lastModified: LAST_UPDATED.home,
    },
    {
      url: `${SITE.url}/servicios`,
      lastModified: LAST_UPDATED.services,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE.url}/servicios/${service.slug}`,
      lastModified: LAST_UPDATED.services,
    })),
    ...ZONES.map((zone) => ({
      url: `${SITE.url}/${zone.slug}`,
      lastModified: LAST_UPDATED.zones,
    })),
  ];
}
