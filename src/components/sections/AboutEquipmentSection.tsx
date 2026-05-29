import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';

export function AboutEquipmentSection() {
  const textRef  = useScrollReveal<HTMLDivElement>();
  const imageRef = useScrollReveal<HTMLDivElement>();

  const { count: years, ref: yearsRef }  = useCountUp(30);
  const { count: teamPct, ref: teamRef } = useCountUp(100);

  return (
    <section className="bg-surface-container-lowest overflow-hidden" id="nosotros">
      <div className="flex flex-col md:flex-row">

        {/* Text */}
        <div
          ref={textRef}
          className="reveal-left w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center order-2 md:order-1"
        >
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
            SOBRE NOSOTROS <br />
            <span className="text-primary-container">GRÚAS ZAMORA</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            Somos una empresa con más de 30 años de experiencia en el servicio de grúas en
            Costa Rica. Tenemos asistencia vial en todo el territorio nacional, con un servicio
            24/7. Contamos con un equipo capacitado para ofrecer el mejor servicio a nuestros
            clientes. Nuestras unidades cuentan con todos los seguros del INS para su
            tranquilidad. Nuestro compromiso es brindarle tranquilidad y solución inmediata en
            cualquier situación en carretera.
          </p>

          <div className="grid grid-cols-2 gap-6 border-t border-outline-variant pt-8">
            {/* Years stat */}
            <div ref={yearsRef}>
              <div className="text-4xl font-black text-primary-container font-headline tracking-tighter">
                {years}+
              </div>
              <div className="text-xs uppercase font-bold tracking-widest text-on-surface/50 mt-1">
                Años de Experiencia
              </div>
            </div>

            {/* Team stat */}
            <div ref={teamRef}>
              <div className="text-4xl font-black text-primary-container font-headline tracking-tighter">
                {teamPct}%
              </div>
              <div className="text-xs uppercase font-bold tracking-widest text-on-surface/50 mt-1">
                Equipo Capacitado
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          ref={imageRef}
          className="reveal-right w-full md:w-1/2 relative min-h-[400px] order-1 md:order-2"
        >
          <img
            src="grua7.jpg"
            alt="Grúa de alta capacidad Zamora Moya"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-container/10 mix-blend-overlay" />
          {/* Gradient edge blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/60 via-transparent to-transparent md:block hidden" />
        </div>

      </div>
    </section>
  );
}
