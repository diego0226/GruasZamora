import type { MetadataRoute } from 'next';
import { SITE, CONTENT_UPDATED } from '@/lib/site';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';

/**
 * Se sirve en /sitemap.xml y se declara desde robots.txt.
 *
 * Sin `changeFrequency` ni `priority`: Google declaró explícitamente que
 * ignora ambos campos. Incluirlos no ayuda y sugiere que el sitemap se generó
 * con una plantilla de hace quince años.
 *
 * Las fechas viven en `CONTENT_UPDATED` (lib/site.ts) y no aquí, para que el
 * `lastmod` del sitemap y el `dateModified` del JSON-LD salgan siempre del
 * mismo sitio. Antes la fecha era local a este archivo y el schema no
 * declaraba ninguna: dos señales de frescura que deberían coincidir, y una
 * ausente.
 *
 * ⚠️ Actualice una fecha SOLO cuando cambie de verdad ese contenido. Ver la
 * nota completa en lib/site.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      /* Sin barra final, para que coincida exactamente con el canonical que
         emite la portada. Google las normaliza igual, pero dos formas de la
         misma URL en señales distintas es ruido gratis. */
      url: SITE.url,
      lastModified: CONTENT_UPDATED.home,
    },
    {
      url: `${SITE.url}/servicios`,
      lastModified: CONTENT_UPDATED.services,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE.url}/servicios/${service.slug}`,
      lastModified: CONTENT_UPDATED.services,
    })),
    ...ZONES.map((zone) => ({
      url: `${SITE.url}/${zone.slug}`,
      lastModified: CONTENT_UPDATED.zones,
    })),
    /* Páginas informativas. La guía de emergencia no es relleno: responde una
       consulta con volumen propio («se me varó el carro») y es la que un
       buscador con IA puede citar sin tener que recomendar a nadie. */
    {
      url: `${SITE.url}/que-hacer-si-se-vara`,
      lastModified: CONTENT_UPDATED.info,
    },
    {
      url: `${SITE.url}/contacto`,
      lastModified: CONTENT_UPDATED.info,
    },
    {
      url: `${SITE.url}/privacidad`,
      lastModified: CONTENT_UPDATED.info,
    },
  ];
}
