import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Se sirve en /robots.txt.
 *
 * Todo abierto a propósito: además de Googlebot, queremos que los rastreadores
 * de los buscadores con IA (GPTBot, PerplexityBot, ClaudeBot…) puedan leer y
 * citar el sitio. Para un negocio local, aparecer en esas respuestas ya pesa
 * tanto como aparecer en el listado azul de siempre.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
