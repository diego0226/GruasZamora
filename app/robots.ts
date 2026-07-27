import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Se sirve en /robots.txt.
 *
 * Todo abierto a propósito: además de Googlebot, queremos que los rastreadores
 * de los buscadores con IA (GPTBot, PerplexityBot, ClaudeBot…) puedan leer y
 * citar el sitio. Para un negocio local, aparecer en esas respuestas ya pesa
 * tanto como aparecer en el listado azul de siempre.
 *
 * Se quitó la directiva `host`: es una extensión propietaria de Yandex que
 * Google ignora. El dominio canónico ya se declara donde sí se lee — en el
 * <link rel="canonical"> de cada página y en las URLs del sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      /* El sitio no tiene buscador interno ni parámetros de filtrado, así que
         no hay rutas basura que excluir. Si algún día se agregan (?utm=,
         ?page=), este es el lugar donde se bloquean. */
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
