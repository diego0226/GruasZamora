import type { Metadata } from 'next';
import Link from 'next/link';
import { TriangleAlert, ShieldAlert, PhoneCall, Truck, X, Check } from 'lucide-react';

import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/JsonLd';

import { CONTENT_UPDATED } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';

/**
 * Guía de emergencia — la pieza editorial que pedía el hallazgo F-13.
 *
 * El home ya tenía cuatro pasos resumidos, pero vivían dentro de una sección
 * de la portada: no había URL propia que pudiera posicionar para «se me varó
 * el carro», «qué hacer si se me daña el carro en la carretera» o
 * «se me quedó el carro en la autopista», que son consultas informativas de
 * volumen real y con intención muy cercana a la de contratar.
 *
 * Está escrita como la citaría un buscador con IA: cada bloque abre con la
 * respuesta directa y después explica. Eso no es un truco para modelos — es
 * cómo se escribe algo que alguien va a leer con el celular en la mano y el
 * pulso acelerado.
 *
 * Sobre las afirmaciones: son medidas de seguridad vial de consenso, no
 * asesoría legal. Cuando hay riesgo para la vida, la página manda al 9-1-1
 * antes que a la grúa, y lo dice explícitamente. Una empresa que vende el
 * traslado no debe ponerse por delante de un servicio de emergencia.
 */

const TITLE = 'Se le varó el carro: qué hacer, paso a paso';
const DESCRIPTION =
  'Qué hacer si se le varó el carro en la carretera en Costa Rica: cómo señalizar, dónde esperar, qué NO hacer y cuándo llamar al 9-1-1 antes que a la grúa.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/que-hacer-si-se-vara',
});

const PASOS = [
  {
    icon: TriangleAlert,
    title: 'Hágase visible, ya',
    body: 'Luces de emergencia encendidas antes que nada, incluso mientras el vehículo todavía se mueve. Si aún avanza, oríllelo al hombro de la vía o a la primera salida segura; si se detuvo en un carril, no intente empujarlo solo en una vía rápida. Coloque los triángulos a buena distancia por detrás — más lejos de lo que le parezca suficiente, porque a 80 km/h un conductor recorre en dos segundos más de cuarenta metros.',
  },
  {
    icon: ShieldAlert,
    title: 'Salga del vehículo y aléjese de la calzada',
    body: 'Baje por el lado contrario al tránsito y espere detrás de la barrera de contención o lo más lejos posible del asfalto. Quedarse sentado dentro del carro en el hombro de una autopista es el error más peligroso que se comete, y es el que más veces termina mal: un vehículo detenido en el hombro es exactamente donde impacta quien se distrae o se queda dormido.',
  },
  {
    icon: PhoneCall,
    title: 'Llame y describa dónde está',
    body: 'Un punto de referencia vale más que una dirección: el mojón, el peaje, el puente, el negocio más cercano, la salida que acaba de pasar. Si tiene señal, comparta la ubicación por WhatsApp. Diga también qué vehículo es y qué le pasó — de eso depende si sale la plataforma o la unidad de arrastre con cabrestante.',
  },
  {
    icon: Truck,
    title: 'Espere en un lugar seguro',
    body: 'Con el precio y el tiempo de llegada ya confirmados en la llamada. Si de noche, use algo reflectivo o la linterna del celular apuntando al suelo, nunca a los ojos de quien conduce. No acepte ayuda de una grúa que llega sin que usted la haya llamado: pregunte siempre a qué empresa pertenece.',
  },
];

const NO_HACER = [
  'Quedarse dentro del vehículo en el hombro de una autopista.',
  'Bajarse por el lado del tránsito.',
  'Colocar los triángulos a pocos metros del carro.',
  'Empujar el vehículo solo en una vía de alta velocidad.',
  'Seguir manejando con el motor recalentado «solo un poco más».',
  'Seguir bajando una cuesta con el pedal de freno esponjoso o con olor a quemado.',
  'Aceptar una grúa que aparece sin que la hayan llamado, sin identificar la empresa.',
];

const CASOS = [
  {
    title: 'Si hay personas heridas',
    body: 'Llame al 9-1-1 antes que a nadie más. La grúa puede esperar; una persona lesionada no. Después de que la emergencia esté atendida coordinamos el traslado del vehículo, incluso si tiene que quedarse en el sitio unas horas mientras se levanta el parte.',
  },
  {
    title: 'Si se le recalentó el motor',
    body: 'Oríllese y apague. No abra el radiador caliente: el líquido sale a presión y quema. Seguir «solo un poquito más» es la diferencia entre cambiar un radiador y cambiar un empaque de culata. Esa es una de las llamadas más frecuentes que atendemos en la cuesta de Naranjo y en la subida al Volcán Poás.',
  },
  {
    title: 'Si le fallaron los frenos bajando',
    body: 'Si el pedal se puso esponjoso, se fue al fondo o huele a quemado, oríllese en el primer espacio seguro y no siga. Bajar con el pie pegado al freno cristaliza las pastillas y hace perder presión. Pasa seguido en la bajura de San Ramón y en la cuesta de Ochomogo, y la bajada nunca termina donde uno cree.',
  },
  {
    title: 'Si el vehículo es eléctrico o híbrido',
    body: 'Avísenos al llamar y no deje que nadie lo jale ni lo empuje «unos metros nomás». Los fabricantes prohíben remolcarlos con las llantas motrices en el suelo, porque al girar el motor eléctrico genera corriente y puede dañar el sistema de tracción. Se traslada con las cuatro ruedas sin girar: cargado en plataforma, o con speed dollies si está donde una cama plana no entra.',
  },
  {
    title: 'Si está en montaña o con neblina',
    body: 'Salga del vehículo por el lado de la montaña, nunca por el del precipicio, y espere lejos de la calzada. Con visibilidad reducida las luces de emergencia se ven poco: los triángulos, colocados bien atrás en la curva anterior, son lo que de verdad avisa a quien viene.',
  },
  {
    title: 'Si se salió de la vía',
    body: 'No intente sacarlo con otro vehículo ni con una eslinga improvisada: es como se parten parachoques, se doblan chasis y se lastima gente. Un vehículo fuera de la calzada se recupera con cabrestante hidráulico hasta terreno firme, y de ahí se decide si se traslada o puede seguir.',
  },
];

export default function QueHacerPage() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Qué hacer si se le varó el carro', path: '/que-hacer-si-se-vara' },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/que-hacer-si-se-vara',
            name: TITLE,
            description: DESCRIPTION,
            dateModified: CONTENT_UPDATED.info,
            hasBreadcrumb: true,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Se le varó el carro. <span className="text-flag-red-lit">Haga esto.</span>
          </>
        }
        lead="Cuatro pasos que toman menos de un minuto y que reducen de verdad el riesgo de que un problema mecánico se convierta en un accidente."
      />

      {/* Respuesta directa arriba del todo: es lo que necesita quien abre esta
          página con el celular en la mano, y también lo que un buscador con IA
          puede citar sin tener que leer la página entera. */}
      <section className="bg-night-900 py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <Reveal>
            <p className="border-l-4 border-flag-red bg-night-800 p-7 text-lg leading-relaxed text-chrome-200">
              <strong className="font-semibold text-chrome-50">En resumen:</strong> encienda las
              luces de emergencia, oríllese si el vehículo todavía se mueve, coloque los triángulos
              bien atrás, salga del carro por el lado contrario al tránsito y espere detrás de la
              barrera de contención — nunca dentro del vehículo ni parado frente a él. Después
              llame.{' '}
              <strong className="font-semibold text-chrome-50">
                Si hay personas heridas, llame primero al 9-1-1.
              </strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Los cuatro pasos */}
      <section className="tread-plate bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Paso a paso"
            title={
              <>
                Primero la seguridad, <span className="text-flag-red-lit">después el carro</span>
              </>
            }
            lead="El vehículo se arregla o se reemplaza. Por eso el orden de estos pasos no es negociable."
          />

          <ol className="mt-12 space-y-5">
            {PASOS.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={Math.min(i * 70, 210)}>
                <li className="lift flex gap-5 border-l-4 border-flag-red bg-night-800 p-7">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-flag-red/15 text-flag-red-lit">
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-display text-2xl text-chrome-300/25"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-xl text-chrome-50 sm:text-2xl">{title}</h2>
                    </div>
                    <p className="mt-3 leading-relaxed text-chrome-400">{body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Qué NO hacer */}
      <section className="bg-night-900 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Errores comunes"
            title={
              <>
                Lo que <span className="text-flag-red-lit">nunca</span> hay que hacer
              </>
            }
            lead="Todos estos los hemos visto en la calle. Varios más de una vez el mismo día."
          />

          <Reveal className="mt-10">
            <ul className="space-y-3">
              {NO_HACER.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-b border-chrome-300/10 pb-3 leading-relaxed text-chrome-300 last:border-0"
                >
                  <X
                    className="mt-1 size-4 shrink-0 text-flag-red-lit"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Casos particulares */}
      <section className="tread-plate bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Según lo que pasó"
            title={
              <>
                Casos que se atienden <span className="text-flag-red-lit">distinto</span>
              </>
            }
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CASOS.map((caso, i) => (
              <Reveal key={caso.title} delay={(i % 2) * 90}>
                <article className="lift h-full border border-chrome-300/12 bg-night-800 p-7">
                  <h2 className="text-xl text-chrome-50">{caso.title}</h2>
                  <p className="mt-3.5 leading-relaxed text-chrome-400">{caso.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="border-l-4 border-signal bg-night-900 p-7">
              <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-signal">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                Antes de colgar
              </p>
              <p className="mt-3 leading-relaxed text-chrome-300">
                Confirme el precio y el tiempo estimado de llegada. Cualquier empresa seria se los
                da por teléfono antes de despachar la unidad. Si le dicen que se lo cobran «al
                llegar y ahí vemos», desconfíe. Puede ver también{' '}
                <Link
                  href="/servicios"
                  className="font-semibold text-chrome-100 underline decoration-flag-red/50 underline-offset-4 transition-colors hover:text-flag-red-lit"
                >
                  qué unidad corresponde a cada caso
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={
          <>
            ¿Está varado <span className="text-flag-red-lit">ahora mismo?</span>
          </>
        }
        lead="Póngase a salvo primero. Después llame: nos dice dónde está y qué le pasó al vehículo, le confirmamos precio y tiempo de llegada, y sale la unidad."
      />
    </>
  );
}
