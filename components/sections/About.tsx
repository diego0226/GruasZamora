import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { CountUp } from '@/components/ui/CountUp';
import { yearsOfExperience } from '@/lib/site';

const STATS = [
  { value: yearsOfExperience(), suffix: '+', label: 'Años en la carretera' },
  // "24/7" se muestra fijo: verlo contar desde "0/7" se lee como un error.
  { text: '24/7', label: 'Disponibilidad real' },
  { value: 7, suffix: '', label: 'Provincias cubiertas' },
  { value: 100, suffix: '%', label: 'Unidades aseguradas' },
] as const;

export function About() {
  return (
    <section id="nosotros" className="scroll-mt-24 overflow-hidden bg-night-900">
      <div className="grid lg:grid-cols-2">
        {/* Fotografía de la flotilla */}
        <Reveal from="left" className="relative min-h-[340px] lg:min-h-[640px]">
          <Image
            src="/grua7.jpg"
            alt="Unidad de arrastre Super Duty de Grúas Zamora Moya, rotulada con la bandera de Estados Unidos, remolcando una camioneta en Costa Rica"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={70}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-900/85 via-night-900/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-night-900/10 lg:to-night-900" />

          {/* Placa de identidad sobre la foto. Va anclada a la esquina inferior
              izquierda para que cubra ese sector de la imagen en cualquier recorte. */}
          <div className="absolute bottom-0 left-0 right-0 border-l-4 border-flag-red bg-night-950/85 p-5 backdrop-blur sm:max-w-sm sm:p-6">
            <p className="font-display text-sm tracking-[0.2em] text-chrome-50">
              Rotulación original de la flotilla
            </p>
            <p className="mt-2 text-sm leading-relaxed text-chrome-400">
              Barras y estrellas pintadas a mano sobre cada unidad. No es decoración: es la
              firma con la que la gente nos reconoce en la carretera.
            </p>
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal from="right" className="flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
          <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flag-red-lit">
            <span className="h-px w-8 bg-flag-red-lit" />
            Quiénes somos
          </p>

          <h2 className="text-3xl leading-[0.95] text-chrome-50 sm:text-4xl lg:text-5xl">
            Tres décadas <span className="text-flag-red-lit">en la carretera</span>
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-chrome-300 sm:text-lg">
            <p>
              Grúas Zamora Moya nació en Grecia y ahí sigue. Más de{' '}
              {yearsOfExperience()} años atendiendo llamadas a cualquier hora, con equipo
              propio y gente que conoce la zona porque vive en ella.
            </p>
            <p>
              La identidad americana no es un adorno. El oficio del{' '}
              <em className="not-italic text-chrome-100">towing</em> como lo conocemos —la
              plataforma hidráulica, el sistema under-lift, la cultura de responder 24 horas—
              viene de Estados Unidos, y esa forma de trabajar es la que adoptamos desde el
              primer día. Por eso las unidades llevan la bandera pintada: es un reconocimiento
              a la escuela de la que aprendimos el trabajo.
            </p>
            <p>
              Lo que ponemos nosotros es lo de aquí: conocer la cuesta de Tacares de memoria,
              saber cuál calle del cuadrante de Grecia no aguanta una plataforma, y contestar
              el teléfono a las tres de la mañana porque alguien del cantón quedó varado.
            </p>
          </div>

          {/* Indicadores */}
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-chrome-300/15 pt-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-4xl leading-none text-flag-red-lit lg:text-5xl">
                  {'text' in stat ? (
                    stat.text
                  ) : (
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  )}
                </dd>
                <dt className="mt-2.5 text-[0.65rem] font-bold uppercase leading-tight tracking-[0.15em] text-chrome-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
