import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Route as RouteIcon, ArrowUpRight, Check } from 'lucide-react';

import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/JsonLd';

import { ZONES, getZone } from '@/lib/zones';
import { SERVICES } from '@/lib/services';
import { FAQS, zoneFaqs } from '@/lib/faq';
import { SITE, OG_IMAGE } from '@/lib/site';
import { breadcrumbSchema, faqSchema, zoneServiceSchema } from '@/lib/schema';

/* Solo existen las zonas del catálogo: cualquier otro slug es un 404 real,
   no una página vacía indexable. */
export const dynamicParams = false;

export function generateStaticParams() {
  return ZONES.map((zone) => ({ zona: zone.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zona: string }>;
}): Promise<Metadata> {
  const { zona } = await params;
  const zone = getZone(zona);
  if (!zone) return {};

  return {
    title: zone.metaTitle,
    description: zone.metaDescription,
    alternates: { canonical: `/${zone.slug}` },
    openGraph: {
      type: 'website',
      locale: 'es_CR',
      url: `${SITE.url}/${zone.slug}`,
      title: zone.metaTitle,
      description: zone.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function ZonePage({ params }: { params: Promise<{ zona: string }> }) {
  const { zona } = await params;
  const zone = getZone(zona);
  if (!zone) notFound();

  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: `Grúas ${zone.name}`, path: `/${zone.slug}` },
  ];

  const nearby = zone.nearby.map(getZone).filter((z) => z !== undefined);

  /* Las preguntas propias de la zona van primero: son las que responden lo que
     alguien busca cuando escribe "grúas <cantón>", y las que hacen que esta
     página no sea una copia de las otras doce. */
  const faqs = [...zoneFaqs(zone), ...FAQS];

  return (
    <>
      <JsonLd data={[zoneServiceSchema(zone), breadcrumbSchema(crumbs), faqSchema(faqs)]} />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Grúas{' '}
            <span className="text-flag-red-lit">
              {zone.heading.replace(/^Grúas\s+/, '')}
            </span>
          </>
        }
        lead={zone.lead}
      />

      {/* Lugares cubiertos */}
      <section className="tread-plate bg-night-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Dónde atendemos"
            title={
              <>
                {zone.kind === 'nacional' ? 'Las siete provincias' : 'Todo el sector'}
                {zone.kind !== 'nacional' && (
                  <span className="text-flag-red-lit"> {zone.inName}</span>
                )}
              </>
            }
            lead={
              zone.kind === 'nacional'
                ? 'Coordinamos traslados de punta a punta del país, tanto en emergencia como programados con fecha y hora.'
                : `Cubrimos ${zone.name} completo. Si su punto de referencia no aparece en la lista, llame igual: seguro lo conocemos.`
            }
          />

          <Reveal className="mt-10">
            <ul className="flex flex-wrap gap-2.5">
              {zone.places.map((place) => (
                <li
                  key={place}
                  className="inline-flex items-center gap-2 border border-chrome-300/18 bg-night-800 px-4 py-2.5 text-sm font-semibold text-chrome-200"
                >
                  <MapPin className="size-3.5 shrink-0 text-flag-red-lit" />
                  {place}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Rutas */}
      <section className="bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Rutas que conocemos"
            title={
              <>
                Las vías donde <span className="text-flag-red-lit">más nos llaman</span>
              </>
            }
            lead="Conocer el terreno no es un detalle: define qué unidad se despacha y cuánto tarda en llegar."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {zone.routes.map((route, i) => (
              <Reveal key={route.name} delay={(i % 2) * 80}>
                <article className="lift flex h-full gap-4 border-l-4 border-flag-blue-lit bg-night-800 p-6">
                  <RouteIcon className="mt-0.5 size-6 shrink-0 text-flag-red-lit" strokeWidth={1.7} />
                  <div>
                    <h3 className="font-body text-base font-bold normal-case tracking-normal text-chrome-50">
                      {route.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-chrome-400">{route.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido editorial propio de la zona */}
      <section className="bg-night-900 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="space-y-12">
            {zone.body.map((block, i) => (
              <Reveal key={block.title} delay={i * 70}>
                <article>
                  <h2 className="text-2xl leading-tight text-chrome-50 sm:text-3xl">
                    {block.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-chrome-300 sm:text-lg">
                    {block.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios disponibles en la zona */}
      <section className="tread-plate bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Servicios disponibles"
            title={
              <>
                Todo el equipo, también{' '}
                <span className="text-flag-red-lit">{zone.inName}</span>
              </>
            }
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 70} className="h-full">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="lift group flex h-full flex-col border border-chrome-300/12 bg-night-800 p-6 transition-colors hover:border-flag-red/60"
                >
                  <span className="mb-5 flex size-12 items-center justify-center rounded-sm bg-flag-red/15 text-flag-red-lit">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>
                  <h3 className="text-xl text-chrome-50">{service.name}</h3>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-chrome-400">
                    {service.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-flag-red-lit">
                    Ver detalle
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Recordatorio de respaldo */}
          <Reveal className="mt-10">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                'Disponible 24 horas',
                'Pólizas del INS',
                'Factura electrónica',
                'SINPE Móvil, efectivo y transferencia',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-semibold text-chrome-300"
                >
                  <Check className="size-4 shrink-0 text-flag-red-lit" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Zonas vecinas — enlazado interno que reparte autoridad */}
      {nearby.length > 0 && (
        <section className="bg-night-900 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <SectionHeading eyebrow="Cerca de aquí" title="Otras zonas que atendemos" />
            <Reveal className="mt-8">
              <ul className="flex flex-wrap gap-2.5">
                {nearby.map((z) => (
                  <li key={z.slug}>
                    <Link
                      href={`/${z.slug}`}
                      className="inline-flex items-center gap-2 border border-chrome-300/18 bg-night-800 px-4 py-2.5 text-sm font-semibold text-chrome-300 transition-colors hover:border-flag-red-lit hover:text-chrome-50"
                    >
                      <MapPin className="size-3.5 text-flag-red-lit" />
                      Grúas {z.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <Faq
        items={faqs}
        title={
          <>
            Preguntas sobre grúas{' '}
            <span className="text-flag-red-lit">{zone.inName}</span>
          </>
        }
      />

      <FinalCta
        title={
          <>
            ¿Necesita una grúa <span className="text-flag-red-lit">{zone.inName}</span>?
          </>
        }
        lead={`Estamos disponibles ahora mismo. Nos dice dónde está ${zone.inName} y qué le pasó al vehículo, le confirmamos precio y tiempo de llegada, y sale la unidad.`}
      />
    </>
  );
}
