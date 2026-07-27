import Link from 'next/link';
import { Home, MapPin } from 'lucide-react';
import { CallButton, WhatsAppButton } from '@/components/ui/CallButton';
import { FEATURED_ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="stars-field relative flex min-h-[70vh] items-center bg-night-950 py-20">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <p className="font-display text-7xl text-flag-red sm:text-8xl">404</p>

        <h1 className="mt-4 text-3xl text-chrome-50 sm:text-4xl">
          Esta página no existe
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-chrome-400 sm:text-lg">
          El enlace se rompió o la dirección cambió. Pero si lo que necesita es una grúa, eso sí
          lo podemos resolver ahora mismo.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CallButton size="lg" className="w-full sm:w-auto" />
          <WhatsAppButton size="md" label="WhatsApp" className="w-full sm:w-auto" />
        </div>

        <div className="mt-12 border-t border-chrome-300/15 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-chrome-200 transition-colors hover:text-flag-red-lit"
          >
            <Home className="size-4" />
            Volver al inicio
          </Link>

          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {FEATURED_ZONES.map((zone) => (
              <li key={zone.slug}>
                <Link
                  href={`/${zone.slug}`}
                  className="inline-flex items-center gap-2 border border-chrome-300/18 px-4 py-2 text-sm font-semibold text-chrome-400 transition-colors hover:border-flag-red-lit hover:text-chrome-100"
                >
                  <MapPin className="size-3.5 text-flag-red-lit" />
                  Grúas {zone.name}
                </Link>
              </li>
            ))}
            {SERVICES.slice(0, 2).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="inline-flex items-center border border-chrome-300/18 px-4 py-2 text-sm font-semibold text-chrome-400 transition-colors hover:border-flag-red-lit hover:text-chrome-100"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
