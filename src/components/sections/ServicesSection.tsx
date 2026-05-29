import { useScrollReveal } from '../../hooks/useScrollReveal';

export function ServicesSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const card1Ref   = useScrollReveal<HTMLDivElement>();
  const card2Ref   = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 px-8 md:px-16 bg-surface diamond-plate-overlay" id="servicios">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="reveal flex items-center gap-6 mb-16">
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Servicios{' '}
            <span className="text-primary-container">Especializados</span>
          </h2>
          <div className="flex-grow h-1 bg-surface-variant" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div
            ref={card1Ref}
            className="reveal-left card-lift group bg-surface-container p-1 border-l-8 border-primary-container"
          >
            <div className="bg-surface-container-high p-8 h-full relative overflow-hidden">
              {/* Top accent glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary-container/60 via-primary-container/20 to-transparent" />

              <div className="flex justify-between items-start mb-8">
                <span
                  className="material-symbols-outlined text-6xl text-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  fire_truck
                </span>
                <span className="text-surface-variant font-black text-6xl opacity-20">01</span>
              </div>
              <h3 className="font-headline text-3xl font-black uppercase mb-4 tracking-tight">
                Remolque de Plataforma
              </h3>
              <p className="text-on-surface-variant mb-8 font-medium leading-relaxed">
                Transporte seguro para vehículos livianos y de lujo. Equipamiento de cama plana
                de alta precisión para evitar cualquier daño estructural durante el trayecto.
              </p>
              <ul className="space-y-3 mb-10">
                {['Capacidad 5 Toneladas', 'Sujeción de 4 Puntos'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={card2Ref}
            className="reveal-right card-lift group bg-surface-container p-1 border-l-8 border-primary-container"
            style={{ transitionDelay: '130ms' }}
          >
            <div className="bg-surface-container-high p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary-container/60 via-primary-container/20 to-transparent" />

              <div className="flex justify-between items-start mb-8">
                <span
                  className="material-symbols-outlined text-6xl text-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  construction
                </span>
                <span className="text-surface-variant font-black text-6xl opacity-20">02</span>
              </div>
              <h3 className="font-headline text-3xl font-black uppercase mb-4 tracking-tight">
                Remolque de Arrastre
              </h3>
              <p className="text-on-surface-variant mb-8 font-medium leading-relaxed">
                Servicio para rescate y recuperación. Sistema de "Under-lift" americano diseñado
                para maniobras en espacios reducidos y terrenos difíciles.
              </p>
              <ul className="space-y-3 mb-10">
                {['Rescate en Carretera', 'Cabrestante Hidráulico'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
