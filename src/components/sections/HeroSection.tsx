import { useEffect, useRef } from 'react';

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.1) translateY(${window.scrollY * 0.28}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-[870px] w-full overflow-hidden bg-surface-container-lowest">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center opacity-55 grayscale-[0.25] scale-110 will-change-transform"
        style={{
          backgroundImage: "url('/grua3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto">
        {/* Badge */}
        <div className="hero-1 inline-block bg-primary-container text-on-primary px-4 py-1 font-black uppercase tracking-widest text-sm mb-6 self-start shimmer">
          Respuesta Inmediata 24/7
        </div>

        {/* Heading */}
        <h1 className="hero-2 font-headline text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 max-w-4xl">
          GRÚAS ZAMORA MOYA:{' '}
          <span className="text-primary-container">FUERZA Y RESPUESTA</span>{' '}
          INMEDIATA
        </h1>

        {/* Sub */}
        <p className="hero-3 text-xl md:text-2xl max-w-2xl mb-10 text-on-surface-variant font-medium leading-relaxed">
          Equipamiento capacitado para las tareas más exigentes.
          Su tranquilidad es nuestra misión técnica.
        </p>

        {/* CTAs */}
        <div className="hero-4 flex flex-col md:flex-row gap-4">
          <a
            href="tel:+50683876352"
            className="pulse-ring bg-primary-container text-on-primary px-10 py-5 font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 hover:brightness-110 transition-all duration-200"
          >
            Solicitar Asistencia
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
          <a
            href="#servicios"
            className="border-2 border-primary-container text-primary-container px-10 py-5 font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-primary-container/10 transition-all duration-200"
          >
            Ver Servicios
          </a>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 right-0 w-1/3 h-[3px] bg-primary-container shimmer" />
    </section>
  );
}
