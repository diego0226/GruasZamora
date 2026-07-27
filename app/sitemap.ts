import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';

/** Se sirve en /sitemap.xml y se declara desde robots.txt. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/servicios`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE.url}/servicios/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...ZONES.map((zone) => ({
      url: `${SITE.url}/${zone.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: zone.priority,
    })),
  ];
}
