import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, MapPin, ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/JsonLd';

import { SERVICES, getService } from '@/lib/services';
import { FEATURED_ZONES } from '@/lib/zones';
import { SITE } from '@/lib/site';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ servicio: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ servicio: string }>;
}): Promise<Metadata> {
  const { servicio } = await params;
  const service = getService(servicio);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      type: 'website',
      locale: 'es_CR',
      url: `${SITE.url}/servicios/${service.slug}`,
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ servicio: string }>;
}) {
  const { servicio } = await params;
  const service = getService(servicio);
  if (!service) notFound();

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: service.name, path: `/servicios/${service.slug}` },
  ];

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={[serviceSchema(service), breadcrumbSchema(crumbs), faqSchema()]} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            {service.heading.split(' ')[0]}{' '}
            <span className="text-flag-red-lit">
              {service.heading.split(' ').slice(1).join(' ')}
            </span>
          </>
        }
        lead={service.summary}
        image={service.image}
        imageAlt={service.imageAlt}
      />

      {/* Explicación + especificaciones */}
      <section className="tread-plate bg-night-900 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal from="left">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flag-red-lit">
              <span className="h-px w-8 bg-flag-red-lit" />
              En qué consiste
            </p>
            <p className="text-lg leading-relaxed text-chrome-200 sm:text-xl">
              {service.intro}
            </p>
          </Reveal>

          <Reveal from="right">
            <div className="border-l-4 border-flag-red bg-night-800 p-7">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-flag-blue/45 text-flag-red-lit ring-1 ring-chrome-300/10">
                  <ServiceIcon name={service.icon} className="size-6" />
                </span>
                <h2 className="text-xl text-chrome-50">El equipo</h2>
              </div>

              <ul className="space-y-3.5">
                {service.specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-3 text-sm text-chrome-300">
                    <Check className="mt-0.5 size-4 shrink-0 text-flag-red-lit" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Casos concretos */}
      <section className="bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Cuándo se usa"
            title={
              <>
                Situaciones donde este servicio{' '}
                <span className="text-flag-red-lit">es el correcto</span>
              </>
            }
            lead="Pedir la unidad equivocada cuesta tiempo y, a veces, cuesta el vehículo. Estos son los escenarios típicos."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {service.cases.map((useCase, i) => (
              <Reveal key={useCase.title} delay={(i % 2) * 90}>
                <article className="lift h-full border border-chrome-300/12 bg-night-800 p-7">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-xl text-chrome-50">{useCase.title}</h3>
                    <span className="font-display text-3xl text-chrome-300/12" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="leading-relaxed text-chrome-400">{useCase.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dónde se presta */}
      <section className="bg-night-900 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Dónde lo prestamos"
            title="Disponible en toda nuestra cobertura"
            lead="Base en Grecia, respuesta rápida en Occidente y traslados a cualquier punto del país."
          />
          <Reveal className="mt-8">
            <ul className="flex flex-wrap gap-2.5">
              {FEATURED_ZONES.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={`/${zone.slug}`}
                    className="inline-flex items-center gap-2 border border-chrome-300/18 bg-night-800 px-4 py-2.5 text-sm font-semibold text-chrome-300 transition-colors hover:border-flag-red-lit hover:text-chrome-50"
                  >
                    <MapPin className="size-3.5 text-flag-red-lit" />
                    Grúas {zone.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="tread-plate bg-night-950 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading eyebrow="También ofrecemos" title="El otro tipo de unidad" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/servicios/${other.slug}`}
                  className="lift group flex h-full flex-col border border-chrome-300/12 bg-night-800 p-6 transition-colors hover:border-flag-red/60"
                >
                  <span className="mb-4 flex size-11 items-center justify-center rounded-sm bg-flag-red/15 text-flag-red-lit">
                    <ServiceIcon name={other.icon} className="size-5" />
                  </span>
                  <h3 className="text-lg text-chrome-50">{other.name}</h3>
                  <p className="mt-2.5 flex-grow text-sm leading-relaxed text-chrome-400">
                    {other.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-flag-red-lit">
                    Ver detalle
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      <FinalCta
        title={
          <>
            ¿Necesita{' '}
            <span className="text-flag-red-lit">{service.name.toLowerCase()}</span>?
          </>
        }
      />
    </>
  );
}
