export function Navbar() {
  return (
    <nav className="bg-[#131313] dark:bg-[#0E0E0E] flex justify-between items-center w-full px-8 py-4 max-w-none sticky top-0 z-50">
      <div className="text-2xl font-black uppercase tracking-tighter text-[#FFD700] font-headline">
        GRÚAS ZAMORA MOYA
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <a className="text-[#FFD700] border-b-4 border-[#FFD700] pb-1 font-bold font-label text-sm uppercase tracking-wider" href="#">Inicio</a>
        <a className="text-white/70 hover:text-white transition-colors font-label text-sm uppercase tracking-wider" href="#servicios">Servicios</a>
        <a className="text-white/70 hover:text-white transition-colors font-label text-sm uppercase tracking-wider" href="#nosotros">Nosotros</a>
        <a className="text-white/70 hover:text-white transition-colors font-label text-sm uppercase tracking-wider" href="#contacto">Contacto</a>
      </div>
      <a
        href="tel:+50683876352"
        className="bg-[#FFD700] text-[#3A3000] px-6 py-2 hover:bg-surface-tint transition-all duration-200 flex items-center gap-3 rounded"
      >
        <span className="material-symbols-outlined text-3xl">phone_in_talk</span>
        <div className="flex flex-col items-end leading-[1.1]">
          <span className="font-bold uppercase tracking-tight">LLAMAR AHORA</span>
          <span className="text-[0.8rem] font-bold opacity-80">8387-6352</span>
        </div>
      </a>
    </nav>
  );
}
