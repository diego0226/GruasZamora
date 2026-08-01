import type { Metadata } from 'next';
import { SITE, OG_IMAGE } from './site';

/**
 * Constructor de metadatos por página.
 *
 * ── Los dos defectos que existe para cerrar ─────────────────────────────────
 *
 * Next.js fusiona los metadatos de forma superficial: si una página declara su
 * propio bloque `openGraph`, ese bloque REEMPLAZA entero al del layout raíz en
 * vez de completarlo. Las rutas de zona y de servicio declaraban el suyo con
 * cuatro campos, y el resultado, comprobado sobre el HTML compilado y sobre el
 * sitio en producción, era este:
 *
 *  1. `og:site_name` desaparecía en 17 de las 18 URLs. Solo la portada lo
 *     tenía. Es la etiqueta con la que Facebook y WhatsApp rotulan la tarjeta
 *     al compartir el enlace: sin ella la vista previa sale sin el nombre de
 *     la empresa, justo cuando alguien pasa el link a un conocido varado.
 *
 *  2. Como esas páginas no declaraban `twitter`, heredaban el del layout —el
 *     de la PORTADA—. Las diecisiete páginas interiores anunciaban en su
 *     tarjeta de Twitter/X el título y la descripción del home. La landing de
 *     Grecia se compartía diciendo «Grúas Zamora Moya — Grúas 24/7 en Grecia y
 *     todo Costa Rica» en lugar de hablar de Grecia.
 *
 * Centralizar la construcción evita que vuelva a pasar: cualquier ruta nueva
 * que use este helper sale completa, y no hay que acordarse de repetir seis
 * campos en cada `generateMetadata`.
 */
/** Descriptor de imagen para compartir, tal como lo espera Next.js. */
type OgImage = {
  url: string;
  width?: number;
  height?: number;
  type?: string;
  alt?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  images = [OG_IMAGE],
}: {
  /** Título de la página, SIN el sufijo de marca: lo agrega la plantilla del layout. */
  title: string;
  description: string;
  /** Ruta canónica con barra inicial, por ejemplo `/gruas-grecia`. */
  path: string;
  /** Solo si la página tiene una imagen para compartir distinta de la general. */
  images?: readonly OgImage[];
}): Metadata {
  const url = `${SITE.url}${path === '/' ? '' : path}`;
  const shareImages = [...images];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'es_CR',
      /* El campo que se perdía. Va explícito en cada página porque el bloque
         del layout no se fusiona, se reemplaza. */
      siteName: SITE.name,
      url,
      title,
      description,
      images: shareImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: shareImages,
    },
  };
}
