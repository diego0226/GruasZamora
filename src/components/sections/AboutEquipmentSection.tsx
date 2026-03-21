export function AboutEquipmentSection() {
  return (
    <section className="bg-surface-container-lowest overflow-hidden" id="nosotros">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center order-2 md:order-1">
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
            SOBRE NOSOTROS <br /><span className="text-primary-container">GRÚAS ZAMORA</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            Somos una empresa con más de 30 años de experiencia en el servicio de grúas en Costa Rica.
            Tenemos asistencia vial en todo el territorio nacional, con un sercicio 24/7.
            Contamos con un equipo capacitado para ofrecer el mejor servicio a nuestros clientes.
            Nuestras unidades cuentan con todos los seguros del INS para su tranquilidad.
            Nuestro compromiso es brindarle tranquilidad y solución inmediata en cualquier situación en carretera.
            ¡Contáctenos ahora y reciba atención inmediata!
          </p>
          <div className="grid grid-cols-2 gap-6 border-t border-outline-variant pt-8">
            <div>
              <div className="text-3xl font-black text-primary-container font-headline tracking-tighter">30+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-on-surface/50">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-3xl font-black text-primary-container font-headline tracking-tighter">100%</div>
              <div className="text-xs uppercase font-bold tracking-widest text-on-surface/50">Equipo Capacitado</div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[400px] order-1 md:order-2">
          <img
            alt="Industrial heavy duty tow truck machinery details"
            className="absolute inset-0 w-full h-full object-cover"
            data-alt="Close up of high-performance American tow truck mechanisms"
            src="grua7.jpg"
          />
          <div className="absolute inset-0 bg-primary-container/10 mix-blend-overlay"></div>
        </div>
      </div>
    </section>
  );
}
