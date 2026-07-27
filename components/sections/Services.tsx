import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { Reveal } from '@/components/ui/Reveal';
import { SERVICES } from '@/lib/services';

export function Services() {
  return (
    <section id="servicios" className="tread-plate scroll-mt-24 bg-night-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Lo que hacemos"
          title={
            <>
              Dos unidades, <span className="text-flag-red-lit">una sola llamada</span>
            </>
          }
          lead="No todo vehículo se mueve igual. Le decimos cuál equipo necesita según lo que nos describa por teléfono, y sale el correcto a la primera — sin viajes en vano ni cobros de más."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.slug}
              from={i % 2 === 0 ? 'left' : 'right'}
              delay={(i % 2) * 90}
              className="h-full"
            >
              <article className="lift group flex h-full flex-col border-l-4 border-flag-red bg-night-800 p-7 sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="flex size-14 items-center justify-center rounded-sm bg-flag-blue/45 text-flag-red-lit ring-1 ring-chrome-300/10">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span
                    className="font-display text-5xl text-chrome-300/10"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-2xl text-chrome-50">{service.name}</h3>

                <p className="mt-4 flex-grow leading-relaxed text-chrome-400">
                  {service.summary}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {service.specs.slice(0, 3).map((spec) => (
                    <li key={spec} className="flex items-start gap-3 text-sm text-chrome-300">
                      <Check className="mt-0.5 size-4 shrink-0 text-flag-red-lit" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/servicios/${service.slug}`}
                  className="mt-7 inline-flex items-center gap-2 self-start border-b-2 border-transparent pb-1 text-sm font-bold uppercase tracking-wider text-chrome-100 transition-colors hover:border-flag-red-lit hover:text-flag-red-lit"
                >
                  Ver detalle del servicio
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
