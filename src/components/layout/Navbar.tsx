import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'bg-[#131313] py-4'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#FFD700] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="flex justify-between items-center px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-black uppercase tracking-tighter text-[#FFD700] font-headline">
          GRÚAS ZAMORA MOYA
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { label: 'Inicio', href: '#' },
            { label: 'Servicios', href: '#servicios' },
            { label: 'Nosotros', href: '#nosotros' },
            { label: 'Contacto', href: '#contacto' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-link text-white/70 hover:text-[#FFD700] transition-colors duration-200 font-label text-sm uppercase tracking-wider"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+50683876352"
            className="hidden md:flex bg-[#FFD700] text-[#3A3000] px-6 py-2 hover:bg-[#E9C400] transition-all duration-200 items-center gap-3 shimmer"
          >
            <span className="material-symbols-outlined text-3xl">phone_in_talk</span>
            <div className="flex flex-col items-end leading-[1.1]">
              <span className="font-bold uppercase tracking-tight">LLAMAR AHORA</span>
              <span className="text-[0.8rem] font-bold opacity-80">8387-6352</span>
            </div>
          </a>

          <button
            className="md:hidden text-white/70 hover:text-[#FFD700] transition-colors p-2"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-4 bg-[#0a0a0a] border-t border-[#FFD700]/15">
          {[
            { label: 'Inicio', href: '#' },
            { label: 'Servicios', href: '#servicios' },
            { label: 'Nosotros', href: '#nosotros' },
            { label: 'Contacto', href: '#contacto' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={close}
              className="text-white/70 hover:text-[#FFD700] transition-colors font-bold uppercase tracking-wider text-sm"
            >
              {label}
            </a>
          ))}
          <a
            href="tel:+50683876352"
            onClick={close}
            className="mt-2 bg-[#FFD700] text-[#3A3000] px-6 py-3 font-black uppercase tracking-tight flex items-center gap-3"
          >
            <span className="material-symbols-outlined">phone_in_talk</span>
            Llamar · 8387-6352
          </a>
        </div>
      </div>
    </nav>
  );
}
