import Image from 'next/image';
import { ShieldCheck, MapPinned, Receipt, Clock3 } from 'lucide-react';
import { CallButton, WhatsAppButton } from '@/components/ui/CallButton';
import { yearsOfExperience } from '@/lib/site';

const TRUST = [
  { icon: Clock3, label: '24 horas · 365 días' },
  { icon: MapPinned, label: 'Cobertura nacional' },
  { icon: ShieldCheck, label: 'Pólizas del INS' },
  { icon: Receipt, label: 'Factura electrónica' },
];

/**
 * Portada. Un solo objetivo: que el teléfono sea lo primero que el usuario
 * ve y lo más fácil que puede tocar. Todo lo demás está subordinado a eso.
 */
export function Hero({
  heading,
  lead,
  image = '/grua3.jpg',
  imageAlt = 'Grúa de plataforma de Grúas Zamora Moya con la bandera de Estados Unidos pintada, cargando un vehículo en Costa Rica',
}: {
  heading?: React.ReactNode;
  lead?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night-950">
      {/* Fotografía real de la flotilla — LCP, por eso va con priority */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover object-[68%_center] opacity-70"
      />

      {/* Capas: oscurecer a la izquierda para que el texto respire y la
          unidad siga siendo protagonista a la derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/85 to-night-950/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-night-950/70" />
      <div className="stars-field absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="max-w-3xl">
          {/* Señal de disponibilidad */}
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-sm border border-flag-red-lit/40 bg-night-950/70 px-3.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-chrome-100 backdrop-blur">
            <span className="lightbar-dot inline-block size-2 rounded-full" />
            Unidades disponibles ahora
          </p>

          <h1 className="text-[2.6rem] leading-[0.92] text-chrome-50 sm:text-6xl lg:text-7xl">
            {heading ?? (
              <>
                Grúas{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-x-[-0.12em] inset-y-[0.08em] -skew-x-6 bg-flag-red" />
                  <span className="relative text-white">24/7</span>
                </span>{' '}
                en Grecia, Occidente y todo Costa&nbsp;Rica
              </>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-chrome-200 sm:text-xl">
            {/* El nombre abre el párrafo solo en la portada: es la única página
                que pelea la búsqueda de marca, y el H1 —que va por la palabra
                clave genérica— no lo nombra. Las demás páginas pasan su propio
                `lead` y no lo repiten. */}
            {lead ?? (
              <>
                <strong className="font-semibold text-chrome-100">Grúas Zamora Moya</strong>: más
                de {yearsOfExperience()} años levantando carros en la carretera.
                Plataforma o arrastre, de día o de madrugada. Usted llama, nosotros salimos.
              </>
            )}
          </p>

          {/* El bloque de acción */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallButton size="lg" className="w-full sm:w-auto" />
            <WhatsAppButton size="lg" label="WhatsApp" className="w-full sm:w-auto" />
          </div>

          <p className="mt-4 text-sm text-chrome-400">
            Le confirmamos el precio y el tiempo de llegada{' '}
            <strong className="font-semibold text-chrome-200">antes</strong> de despachar la unidad.
          </p>

          {/* Barra de confianza */}
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-chrome-300/15 pt-7 sm:flex sm:flex-wrap sm:gap-x-8">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-chrome-300 sm:text-sm"
              >
                <Icon className="size-4 shrink-0 text-flag-red-lit" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Degradado de bandera: cierra el hero contra la sección siguiente */}
      <div className="flag-fade" aria-hidden />
    </section>
  );
}
