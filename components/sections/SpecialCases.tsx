import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { Reveal } from '@/components/ui/Reveal';
import { CASE_SERVICES } from '@/lib/services';

/**
 * El speed dolly, y las dos consultas que abre.
 *
 * ── Por qué esta sección existe y por qué está aquí ─────────────────────────
 *
 * Es el único equipo del sitio que la competencia local no tiene, y estaba sin
 * mencionar en ninguna parte. Un par de plataformas rodantes que van bajo las
 * llantas que quedarían en el suelo convierten a la unidad de arrastre en algo
 * que puede mover un eléctrico o un carro con la caja trabada — dos consultas
 * («grúa para carro eléctrico», «grúa para carro bloqueado») con intención de
 * compra altísima y con casi nadie respondiéndolas en el país.
 *
 * Va justo debajo de `Services` porque es la continuación natural de «tenemos
 * dos unidades»: aquí se explica qué hace distinta a una de las dos. Y va con
 * la foto de grua7.jpg, que es la única del archivo donde los dollies se ven
 * puestos y trabajando: la prueba, no la afirmación.
 */

const PUNTOS = [
  'Las cuatro llantas viajan sin dar una vuelta',
  'No hace falta que la caja ponga en neutro',
  'Entra donde una plataforma no maniobra',
];

export function SpecialCases() {
  return (
    /* night-950 para separarla de `Services`, que va en 900, y con la textura
       de placa antideslizante porque `Coverage` viene justo después en el mismo
       950 — es el mismo recurso con el que se separan «otros servicios» y la
       FAQ en las páginas de servicio. */
    <section
      id="speed-dolly"
      className="tread-plate scroll-mt-24 bg-night-950 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Equipo poco común"
          title={
            <>
              Speed dolly: lo que casi{' '}
              <span className="text-flag-red-lit">ninguna grúa del país tiene</span>
            </>
          }
          lead="Dos plataformas rodantes que se meten bajo las llantas que quedarían en el suelo. Con ellas, un carro se remolca sin que ninguna de sus ruedas gire — y eso resuelve los dos casos donde el resto de las grúas dice que no."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* La foto, con los dollies puestos bajo las llantas traseras.
              La altura mínima no es decorativa: los tres puntos van
              sobrepuestos al pie y ocupan unos 190 px con su padding, así que
              por debajo de 320 px en móvil la lista se come la imagen y ya no
              se ven los dollies — que son justamente la prueba de todo lo que
              afirma el texto. */}
          <Reveal
            from="left"
            className="relative min-h-[320px] overflow-hidden border border-chrome-300/12 sm:min-h-[340px]"
          >
            <Image
              src="/grua7.jpg"
              alt="Unidad de arrastre de Grúas Zamora Moya remolcando una camioneta con speed dollies bajo las llantas traseras, para que ninguna rueda gire durante el traslado"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              quality={70}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-night-950/20 to-transparent" />
            <ul className="absolute inset-x-0 bottom-0 space-y-2 p-6 sm:p-7">
              {PUNTOS.map((punto) => (
                <li
                  key={punto}
                  className="flex items-start gap-3 text-sm font-semibold text-chrome-100"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-flag-red-lit" />
                  {punto}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Las dos consultas que el equipo abre */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {CASE_SERVICES.map((service, i) => (
              <Reveal key={service.slug} from="right" delay={i * 90} className="h-full">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="lift group flex h-full flex-col border-l-4 border-flag-red bg-night-800 p-6 transition-colors hover:bg-night-800/70 sm:p-7"
                >
                  <span className="mb-5 flex size-12 items-center justify-center rounded-sm bg-flag-blue/45 text-flag-red-lit ring-1 ring-chrome-300/10">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>

                  <h3 className="text-xl text-chrome-50 sm:text-2xl">{service.name}</h3>

                  <p className="mt-3.5 flex-grow leading-relaxed text-chrome-400">
                    {service.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-flag-red-lit">
                    Ver cómo lo resolvemos
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
