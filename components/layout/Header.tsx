'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, Mail } from 'lucide-react';
import { Wordmark } from '@/components/ui/Wordmark';
import { CallButton } from '@/components/ui/CallButton';
import { SITE } from '@/lib/site';
import { FEATURED_ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Cobertura', href: '/#cobertura' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Preguntas', href: '/#preguntas' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú al navegar. Se ajusta durante el render —el patrón que
  // recomienda React para derivar estado de un cambio de props— en vez de en
  // un efecto, que provocaría un render extra con el menú aún abierto.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Franja de la bandera: el primer pixel del sitio ya dice quiénes somos */}
      <div className="flag-rule h-[3px] w-full" />

      {/* Barra de urgencia — visible antes de cualquier scroll */}
      <div className="hidden bg-night-950 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-chrome-400 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <span className="flex items-center gap-2">
            <span className="lightbar-dot inline-block size-2 rounded-full" />
            Disponible ahora · 24 horas, los 365 días
          </span>
          <span className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-flag-red-lit" />
              {SITE.address.display}
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-chrome-50"
            >
              <Mail className="size-3.5 text-flag-red-lit" />
              {SITE.email}
            </a>
          </span>
        </div>
      </div>

      <nav
        className={cn(
          'w-full border-b transition-[background-color,border-color,padding,backdrop-filter] duration-300',
          scrolled
            ? 'border-chrome-300/10 bg-night-950/90 py-2 backdrop-blur-xl'
            : 'border-transparent bg-night-950 py-3'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Wordmark uid="hdr" compact={scrolled} />

          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-bold uppercase tracking-wider text-chrome-300 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-flag-red-lit after:transition-[width] after:duration-300 hover:text-chrome-50 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CallButton size="sm" className="hidden sm:inline-flex" />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="rounded-sm p-2 text-chrome-200 transition-colors hover:bg-night-800 hover:text-chrome-50 lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={cn(
          'overflow-y-auto border-b border-chrome-300/10 bg-night-950 transition-[max-height,opacity] duration-300 lg:hidden',
          open ? 'max-h-[calc(100dvh-7rem)] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="space-y-6 px-5 py-6">
          <CallButton size="md" className="w-full sm:hidden" />

          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-chrome-300/10 py-3 text-sm font-bold uppercase tracking-widest text-chrome-200 transition-colors hover:text-flag-red-lit"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="mb-3 font-display text-xs uppercase tracking-[0.25em] text-chrome-500">
              Servicios
            </p>
            <div className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="text-sm font-semibold text-chrome-300 transition-colors hover:text-chrome-50"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-display text-xs uppercase tracking-[0.25em] text-chrome-500">
              Zonas
            </p>
            <div className="flex flex-wrap gap-2">
              {FEATURED_ZONES.map((z) => (
                <Link
                  key={z.slug}
                  href={`/${z.slug}`}
                  className="rounded-sm border border-chrome-300/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-chrome-300 transition-colors hover:border-flag-red-lit hover:text-chrome-50"
                >
                  {z.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
