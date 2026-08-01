import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CallButton, WhatsAppButton } from '@/components/ui/CallButton';

export type Crumb = { name: string; path: string };

/**
 * Portada de las páginas internas. Más compacta que la del home, pero con
 * el mismo botón de llamada arriba del pliegue: ninguna página del sitio
 * debe obligar a hacer scroll para encontrar el teléfono.
 */
export function PageHero({
  crumbs,
  title,
  lead,
  image = '/grua3.jpg',
  imageAlt = 'Unidad de Grúas Zamora Moya en servicio en Costa Rica',
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night-950">
      {/* Mismo caso que el hero de la portada: `priority` solo emite la
          precarga, `fetchPriority` es lo que le da prioridad real. Ver la nota
          larga en components/sections/Hero.tsx. Aquí la foto va aún más
          apagada (45 % de opacidad), así que el 50 de calidad sobra. */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={50}
        className="object-cover object-[70%_center] opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/90 to-night-950/50" />
      <div className="stars-field absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:pb-20">
        {/* Migas de pan: orientan al usuario y le dicen a Google la jerarquía */}
        <nav aria-label="Ruta de navegación" className="mb-7">
          {/* chrome-400, no chrome-500: a 12 px este texto necesita 4,5:1 y el
              500 sobre night-950 se queda en 4,2:1. */}
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-chrome-400">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {last ? (
                    <span className="text-chrome-300" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.path} className="transition-colors hover:text-chrome-200">
                        {crumb.name}
                      </Link>
                      <ChevronRight className="size-3.5" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-[2.2rem] leading-[0.95] text-chrome-50 sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {lead && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-chrome-300 sm:text-lg">
              {lead}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallButton size="lg" className="w-full sm:w-auto" />
            <WhatsAppButton size="md" label="WhatsApp" className="w-full sm:w-auto" />
          </div>
        </div>
      </div>

      <div className="flag-fade" aria-hidden />
    </section>
  );
}
