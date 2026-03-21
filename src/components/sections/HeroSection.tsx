export function HeroSection() {
  return (
    <section className="relative h-[870px] w-full overflow-hidden bg-surface-container-lowest">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 grayscale-[0.3]"
        data-alt="Powerful US-flag customized platform tow truck at dusk with flashing lights"
        style={{ backgroundImage: "url('/grua3.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto">
        <div className="inline-block bg-primary-container text-on-primary px-4 py-1 font-black uppercase tracking-widest text-sm mb-6 self-start">
          Respuesta Inmediata 24/7
        </div>
        <h1 className="font-headline text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 max-w-4xl">
          GRÚAS ZAMORA MOYA: <span className="text-primary-container">FUERZA Y RESPUESTA</span> INMEDIATA
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-10 text-on-surface-variant font-medium leading-relaxed">
          Equipamiento Capacitado para las tareas más exigentes. Su tranquilidad es nuestra misión técnica.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="tel:+50683876352"
            className="bg-primary-container text-on-primary px-10 py-5 font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 hover:brightness-110 transition-all"
          >
            Solicitar Asistencia
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
          <a
            href="#servicios"
            className="border-2 border-primary-container text-primary-container px-10 py-5 font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-primary-container/10 transition-all"
          >
            Ver Servicios
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-primary-container"></div>
    </section>
  );
}
