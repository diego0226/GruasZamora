export function ServicesSection() {
  return (
    <section className="py-24 px-8 md:px-16 bg-surface diamond-plate-overlay" id="servicios">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">Servicios <span className="text-primary-container">Especializados</span></h2>
          <div className="flex-grow h-1 bg-surface-variant"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="group bg-surface-container p-1 border-l-8 border-primary-container">
            <div className="bg-surface-container-high p-8 h-full">
              <div className="flex justify-between items-start mb-8">
                <span className="material-symbols-outlined text-6xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>fire_truck</span>
                <span className="text-surface-variant font-black text-6xl opacity-20">01</span>
              </div>
              <h3 className="font-headline text-3xl font-black uppercase mb-4 tracking-tight">Remolque de Plataforma</h3>
              <p className="text-on-surface-variant mb-8 font-medium leading-relaxed">Transporte seguro para vehículos livianos y de lujo. Equipamiento de cama plana de alta precisión para evitar cualquier daño estructural durante el trayecto.</p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-primary-container">check_circle</span>
                  Capacidad 5 Toneladas
                </li>
                <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-primary-container">check_circle</span>
                  Sujeción de 4 Puntos
                </li>
              </ul>
            </div>
          </div>

          <div className="group bg-surface-container p-1 border-l-8 border-primary-container">
            <div className="bg-surface-container-high p-8 h-full">
              <div className="flex justify-between items-start mb-8">
                <span className="material-symbols-outlined text-6xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
                <span className="text-surface-variant font-black text-6xl opacity-20">02</span>
              </div>
              <h3 className="font-headline text-3xl font-black uppercase mb-4 tracking-tight">Remolque de Arrastre</h3>
              <p className="text-on-surface-variant mb-8 font-medium leading-relaxed">Servicio para rescate y recuperación. Sistema de "Under-lift" americano diseñado para maniobras en espacios reducidos y terrenos difíciles.</p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-primary-container">check_circle</span>
                  Rescate en Carretera
                </li>
                <li className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-primary-container">check_circle</span>
                  Cabrestante Hidráulico
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
