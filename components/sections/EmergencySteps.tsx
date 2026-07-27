import { TriangleAlert, PhoneCall, ShieldAlert, Truck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  {
    icon: TriangleAlert,
    title: 'Hágase visible',
    body: 'Luces de emergencia encendidas de inmediato. Si el vehículo todavía se mueve, oríllelo al hombro de la vía. Coloque los triángulos a buena distancia, más lejos de lo que cree.',
  },
  {
    icon: ShieldAlert,
    title: 'Salga del vehículo',
    body: 'Baje por el lado contrario al tránsito y espere detrás de la barrera de contención. Quedarse dentro del carro en el hombro de una autopista es el error más peligroso que se comete.',
  },
  {
    icon: PhoneCall,
    title: 'Llame y describa dónde está',
    body: 'Un punto de referencia vale más que una dirección: el mojón, el peaje, el negocio más cercano. Si tiene señal, mándenos la ubicación por WhatsApp y listo.',
  },
  {
    icon: Truck,
    title: 'Espere en un lugar seguro',
    body: 'Le confirmamos el precio y el tiempo estimado antes de salir. Si la espera cambia, lo llamamos. No lo dejamos adivinando.',
  },
];

/**
 * Contenido genuinamente útil que además responde una consulta muy buscada
 * ("qué hacer si se me varó el carro"). Es de lo que mejor posiciona y de lo
 * que los buscadores con IA citan textualmente.
 */
export function EmergencySteps() {
  return (
    <section className="relative overflow-hidden bg-flag-blue py-20 lg:py-24">
      <div className="stars-field absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/45 via-transparent to-night-950/55" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Mientras llega la unidad"
          title={
            <>
              Se le varó el carro. <span className="text-signal">Haga esto primero.</span>
            </>
          }
          lead="Cuatro pasos que toman menos de un minuto y que reducen de verdad el riesgo de que un problema mecánico se convierta en un accidente."
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 90}>
              <li className="relative h-full border-t-2 border-signal/70 bg-night-950/55 p-6 backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="size-7 text-signal" strokeWidth={1.7} />
                  <span className="font-display text-4xl text-white/12" aria-hidden="true">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-xl text-chrome-50">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chrome-300">{body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
