import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';

import { PageHero } from '@/components/sections/PageHero';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/JsonLd';

import { SERVICES } from '@/lib/services';
import { SITE, OG_IMAGE } from '@/lib/site';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

const TITLE = 'Servicios de Grúa en Costa Rica 24/7';
const DESCRIPTION =
  'Grúa de plataforma y grúa de arrastre con cabrestante para rescate vehicular. Servicio 24/7 desde Grecia, Alajuela, hacia cualquier punto de Costa Rica.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/servicios' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: `${SITE.url}/servicios`,
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ServicesIndexPage() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema()]} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Servicios de{' '}
            <span className="text-flag-red-lit">grúa y remolque</span>
          </>
        }
        lead="Dos unidades distintas para dos problemas distintos. Si no sabe cuál necesita, llame y lo definimos en la conversación: describir bien lo que pasó es la mitad de la solución."
        image="/grua2.jpg"
        imageAlt="Grúa de plataforma de Grúas Zamora Moya lista para un servicio de remolque en Costa Rica"
      />

      <section className="tread-plate bg-night-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-5 px-5 sm:px-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} from={i % 2 === 0 ? 'left' : 'right'}>
              <article className="lift grid overflow-hidden border border-chrome-300/12 bg-night-800 lg:grid-cols-[1fr_1.15fr]">
                <div className="relative min-h-[220px] lg:min-h-[300px]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    quality={70}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-800 via-night-800/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-night-800" />
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="mb-5 flex size-12 items-center justify-center rounded-sm bg-flag-red/15 text-flag-red-lit">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>

                  <h2 className="text-2xl text-chrome-50 sm:text-3xl">{service.name}</h2>
                  <p className="mt-4 leading-relaxed text-chrome-400">{service.summary}</p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.specs.slice(0, 4).map((spec) => (
                      <li key={spec} className="flex items-start gap-2.5 text-sm text-chrome-300">
                        <Check className="mt-0.5 size-4 shrink-0 text-flag-red-lit" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/servicios/${service.slug}`}
                    className="group mt-7 inline-flex items-center gap-2 self-start border-b-2 border-flag-red/40 pb-1 text-sm font-bold uppercase tracking-wider text-chrome-100 transition-colors hover:border-flag-red-lit hover:text-flag-red-lit"
                  >
                    Ver {service.name.toLowerCase()}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq />
      <FinalCta />
    </>
  );
}
