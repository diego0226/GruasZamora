import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { Wordmark } from '@/components/ui/Wordmark';
import { SITE } from '@/lib/site';
import { SERVICE_LINKS, ZONE_LINKS } from '@/lib/nav';

/**
 * Además de cerrar la página, el pie es el mapa del sitio para los crawlers:
 * enlaza TODAS las zonas y TODOS los servicios desde cualquier página.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="stars-field border-t border-chrome-300/10 bg-night-950">
      <div className="flag-rule h-1 w-full" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* Marca + contacto */}
        <div className="space-y-6">
          <Wordmark uid="ftr" />
          <p className="max-w-xs text-sm leading-relaxed text-chrome-400">
            Grúas de plataforma y arrastre las 24 horas. Empresa de {SITE.address.locality},{' '}
            {SITE.address.region}, con servicio en todo el territorio nacional.
          </p>

          <div className="space-y-3 text-sm">
            <a
              href={SITE.phone.href}
              data-cta="call-footer"
              className="flex items-center gap-3 font-bold text-chrome-100 transition-colors hover:text-flag-red-lit"
            >
              <Phone className="size-4 shrink-0 text-flag-red-lit" />
              {SITE.phone.displayFull}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              data-cta="email-footer"
              className="flex items-center gap-3 text-chrome-400 transition-colors hover:text-chrome-100"
            >
              <Mail className="size-4 shrink-0 text-flag-red-lit" />
              {SITE.email}
            </a>
            <p className="flex items-center gap-3 text-chrome-400">
              <MapPin className="size-4 shrink-0 text-flag-red-lit" />
              {SITE.address.display}
            </p>
            <p className="flex items-center gap-3 text-chrome-400">
              <Clock className="size-4 shrink-0 text-flag-red-lit" />
              Abierto 24 horas, los 365 días
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Grúas Zamora Moya"
              className="flex size-10 items-center justify-center rounded-sm border border-chrome-300/20 text-chrome-300 transition-colors hover:border-flag-red-lit hover:bg-flag-red hover:text-white"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Grúas Zamora Moya"
              className="flex size-10 items-center justify-center rounded-sm border border-chrome-300/20 text-chrome-300 transition-colors hover:border-flag-red-lit hover:bg-flag-red hover:text-white"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        {/* Servicios */}
        <nav aria-label="Servicios">
          <h2 className="mb-5 font-display text-sm tracking-[0.22em] text-chrome-50">
            Servicios
          </h2>
          <ul className="space-y-3">
            {/* El índice va primero y explícito: no tenía ni un enlace desde el
                pie, que es el bloque que reparte autoridad a todo el sitio. */}
            <li>
              <Link
                href="/servicios"
                className="text-sm text-chrome-400 transition-colors hover:text-flag-red-lit"
              >
                Todos los servicios
              </Link>
            </li>
            {SERVICE_LINKS.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="text-sm text-chrome-400 transition-colors hover:text-flag-red-lit"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mb-5 mt-8 font-display text-sm tracking-[0.22em] text-chrome-50">
            Información
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                href="/que-hacer-si-se-vara"
                className="text-sm text-chrome-400 transition-colors hover:text-flag-red-lit"
              >
                Qué hacer si se le varó el carro
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="text-sm text-chrome-400 transition-colors hover:text-flag-red-lit"
              >
                Contacto y cobertura
              </Link>
            </li>
            <li>
              <Link
                href="/privacidad"
                className="text-sm text-chrome-400 transition-colors hover:text-flag-red-lit"
              >
                Privacidad
              </Link>
            </li>
          </ul>
        </nav>

        {/* Zonas — el bloque de enlaces internos que sostiene el SEO local */}
        <nav aria-label="Zonas de cobertura" className="lg:col-span-2">
          <h2 className="mb-5 font-display text-sm tracking-[0.22em] text-chrome-50">
            Zonas de cobertura
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {ZONE_LINKS.map((z) => (
              <li key={z.slug}>
                <Link
                  href={`/${z.slug}`}
                  className="text-sm text-chrome-400 transition-colors hover:text-flag-red-lit"
                >
                  Grúas {z.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-chrome-300/10 pt-6">
            <h2 className="mb-4 font-display text-sm tracking-[0.22em] text-chrome-50">
              Formas de pago
            </h2>
            <ul className="flex flex-wrap gap-2">
              {SITE.paymentMethods.map((m) => (
                <li
                  key={m}
                  className="rounded-sm border border-chrome-300/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-chrome-400"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-chrome-300/10 px-5 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-chrome-400">
            © {year} {SITE.name} · Grecia, Costa Rica
          </p>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-chrome-400">
            Pólizas del INS · Factura electrónica
          </p>
        </div>
      </div>
    </footer>
  );
}
