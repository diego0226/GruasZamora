import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';

import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { Reveal } from '@/components/ui/Reveal';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/JsonLd';

import { SERVICES, UNIT_SERVICES, CASE_SERVICES } from '@/lib/services';
import { FAQ_CANONICAL_PATH } from '@/lib/faq';
import { CONTENT_UPDATED } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, serviceListSchema, webPageSchema } from '@/lib/schema';

const TITLE = 'Servicios de Grúa en Costa Rica 24/7';
const DESCRIPTION =
  'Grúa de plataforma, grúa de arrastre con cabrestante y speed dollies para carros eléctricos o con las llantas trabadas. 24/7 desde Grecia a todo Costa Rica.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/servicios',
});

/** `@id` de la lista de servicios, para atarla al WebPage como entidad principal. */
const idsListaServicios = serviceListSchema(SERVICES)['@id'];

/**
 * Comparación directa entre las dos unidades.
 *
 * Es contenido propio de esta página y no de las dos de servicio: aquí es
 * donde alguien que todavía no sabe qué pedir compara, y ponerlo en un solo
 * lugar evita repetirlo. Además es el formato que los buscadores con IA citan
 * con más facilidad —una tabla de criterio contra criterio— sin tener que
 * reconstruirla leyendo dos páginas distintas.
 */
const COMPARACION = [
  {
    criterio: 'Cómo viaja el vehículo',
    plataforma: 'Cargado completo sobre la cama. Las cuatro llantas fuera del suelo.',
    arrastre: 'Levantado por las llantas con under-lift. Rueda sobre el eje libre.',
  },
  {
    criterio: 'Suma kilometraje',
    plataforma: 'No.',
    arrastre: 'Sí, en el eje que queda en el suelo. Con speed dollies, tampoco.',
  },
  {
    criterio: 'Eléctricos e híbridos',
    plataforma: 'Sí. Es la primera opción: viaja cargado completo.',
    arrastre: 'Sí, pero solo con speed dollies: ninguna rueda debe girar.',
  },
  {
    criterio: 'Llantas trabadas o caja en Park',
    plataforma: 'Sí, sube con cabrestante si hay espacio para cargarlo.',
    arrastre: 'Sí, con speed dollies. No necesita neutro ni soltar el freno.',
  },
  {
    criterio: 'Autos de lujo y deportivos bajos',
    plataforma: 'Sí, con rampas para poca altura libre.',
    arrastre: 'Solo si no hay alternativa.',
  },
  {
    criterio: 'Vehículo que no rueda',
    plataforma: 'Sí, sube con cabrestante.',
    arrastre: 'Sí, salvo que falte la llanta: el dolly necesita la rueda puesta.',
  },
  {
    criterio: 'Sótanos y parqueos de techo bajo',
    plataforma: 'No entra.',
    arrastre: 'Sí. Es su escenario típico.',
  },
  {
    criterio: 'Calles angostas de cuadrante',
    plataforma: 'Difícil de maniobrar.',
    arrastre: 'Sí: la mitad de radio de giro.',
  },
  {
    criterio: 'Fuera de la vía, cuneta o barro',
    plataforma: 'Solo después de recuperarlo.',
    arrastre: 'Sí, con cabrestante hidráulico.',
  },
];

export default function ServicesIndexPage() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/servicios',
            name: TITLE,
            description: DESCRIPTION,
            dateModified: CONTENT_UPDATED.services,
            primaryEntityId: idsListaServicios,
            hasBreadcrumb: true,
          }),
          serviceListSchema(SERVICES),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Servicios de{' '}
            <span className="text-flag-red-lit">grúa y remolque</span>
          </>
        }
        lead="Dos unidades distintas para dos problemas distintos, y equipo que la mayoría de las grúas del país no carga. Si no sabe cuál necesita, llame y lo definimos en la conversación: describir bien lo que pasó es la mitad de la solución."
        image="/grua2.jpg"
        imageAlt="Grúa de plataforma de Grúas Zamora Moya lista para un servicio de remolque en Costa Rica"
      />

      <section className="tread-plate bg-night-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-5 px-5 sm:px-6">
          {UNIT_SERVICES.map((service, i) => (
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

      {/* Casos con página propia.
          Van aparte de las dos unidades y antes de la tabla a propósito: la
          tabla ya menciona los speed dollies en dos filas, y aquí es donde se
          explica qué son. Ver la nota de cabecera de lib/services.ts sobre por
          qué estos dos casos tienen URL propia en vez de ser un párrafo dentro
          de la página de plataforma. */}
      <section className="tread-plate bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Casos que otros rechazan"
            title={
              <>
                Lo que resuelven los <span className="text-flag-red-lit">speed dollies</span>
              </>
            }
            lead="Dos plataformas rodantes que se meten bajo las llantas que quedarían en el suelo. Con ellas la unidad de arrastre mueve el vehículo sin que ninguna de sus cuatro ruedas gire, y eso destraba los dos casos donde la respuesta habitual es «así no me lo puedo llevar»."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CASE_SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 90} className="h-full">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="lift group flex h-full flex-col border-l-4 border-flag-red bg-night-800 p-7"
                >
                  <span className="mb-5 flex size-12 items-center justify-center rounded-sm bg-flag-blue/45 text-flag-red-lit ring-1 ring-chrome-300/10">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>

                  <h3 className="text-xl text-chrome-50 sm:text-2xl">{service.name}</h3>
                  <p className="mt-3.5 leading-relaxed text-chrome-400">{service.summary}</p>

                  <ul className="mt-6 space-y-2.5">
                    {service.specs.slice(0, 3).map((spec) => (
                      <li key={spec} className="flex items-start gap-2.5 text-sm text-chrome-300">
                        <Check className="mt-0.5 size-4 shrink-0 text-flag-red-lit" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-bold uppercase tracking-wider text-flag-red-lit">
                    Ver {service.name.toLowerCase()}
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparación — contenido propio de esta página.
          Antes aquí iba <Faq />, que repetía las diez preguntas generales del
          sitio: 638 de las 1.034 palabras de la página eran texto que ya
          estaba en la portada y en otras dieciséis URLs. Esta tabla responde
          la pregunta que de verdad trae a alguien al índice de servicios
          —«¿cuál de las dos necesito?»— y no existe en ninguna otra parte. */}
      <section className="bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Cuál necesito"
            title={
              <>
                Plataforma o arrastre: <span className="text-flag-red-lit">la diferencia</span>
              </>
            }
            lead="Pedir la unidad equivocada cuesta tiempo y, a veces, cuesta el vehículo. Si no está seguro, llame y lo definimos en la conversación."
          />

          <Reveal className="mt-10">
            {/* La tabla se desborda con scroll propio en móvil: el ancho de la
                página no debe crecer nunca, que fue el defecto que corrió los
                accesos flotantes fuera de pantalla. */}
            <div className="overflow-x-auto border border-chrome-300/12">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <caption className="sr-only">
                  Comparación entre la grúa de plataforma y la grúa de arrastre según el tipo de
                  vehículo y el lugar donde quedó
                </caption>
                <thead>
                  <tr className="bg-night-800">
                    <th
                      scope="col"
                      className="border-b border-chrome-300/12 p-4 font-body text-xs font-bold uppercase tracking-wider normal-case text-chrome-400"
                    >
                      Criterio
                    </th>
                    <th
                      scope="col"
                      className="border-b border-l border-chrome-300/12 p-4 font-body text-sm font-bold normal-case tracking-normal text-chrome-50"
                    >
                      Grúa de plataforma
                    </th>
                    <th
                      scope="col"
                      className="border-b border-l border-chrome-300/12 p-4 font-body text-sm font-bold normal-case tracking-normal text-chrome-50"
                    >
                      Grúa de arrastre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARACION.map((fila) => (
                    <tr key={fila.criterio} className="odd:bg-night-900/40">
                      <th
                        scope="row"
                        className="border-b border-chrome-300/10 p-4 font-body text-sm font-semibold normal-case tracking-normal text-chrome-200"
                      >
                        {fila.criterio}
                      </th>
                      <td className="border-b border-l border-chrome-300/10 p-4 text-sm leading-relaxed text-chrome-400">
                        {fila.plataforma}
                      </td>
                      <td className="border-b border-l border-chrome-300/10 p-4 text-sm leading-relaxed text-chrome-400">
                        {fila.arrastre}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <Link
              href={FAQ_CANONICAL_PATH}
              className="group inline-flex items-center gap-2 border-b-2 border-flag-red/40 pb-1 text-sm font-bold uppercase tracking-wider text-chrome-100 transition-colors hover:border-flag-red-lit hover:text-flag-red-lit"
            >
              Ver las preguntas frecuentes del servicio
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
