import { Phone } from 'lucide-react';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg';

const BOX: Record<Size, string> = {
  sm: 'gap-2.5 px-4 py-2.5',
  md: 'gap-3 px-5 py-3',
  lg: 'gap-3.5 px-6 py-3.5',
};

const LABEL: Record<Size, string> = {
  sm: 'text-[0.58rem]',
  md: 'text-[0.62rem]',
  lg: 'text-[0.68rem]',
};

/**
 * El número va en Barlow —no en Anton— con cifras tabulares y un poco de
 * tracking positivo. Anton es tan condensada que "8387-6352" se lee como un
 * bloque pegado; para un teléfono que la gente necesita leer de un vistazo
 * eso es un defecto, no un estilo.
 */
const NUMBER: Record<Size, string> = {
  sm: 'text-[0.95rem]',
  md: 'text-xl',
  lg: 'text-2xl',
};

const ICON: Record<Size, string> = {
  sm: 'size-8',
  md: 'size-9',
  lg: 'size-10',
};

/** El botón más importante del sitio: `tel:` directo, número siempre visible. */
export function CallButton({
  size = 'md',
  showNumber = true,
  label = 'Llamar ahora · 24/7',
  className,
}: {
  size?: Size;
  showNumber?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={SITE.phone.href}
      data-cta="call"
      aria-label={`Llamar a Grúas Zamora Moya al ${SITE.phone.displayFull}`}
      className={cn(
        'group inline-flex items-center justify-center rounded-sm bg-flag-red text-white',
        'shadow-[0_6px_20px_-8px_rgba(200,16,46,0.8)]',
        'transition-[background-color,box-shadow] duration-200',
        'hover:bg-flag-red-lit hover:shadow-[0_8px_26px_-8px_rgba(232,25,47,0.9)]',
        BOX[size],
        className
      )}
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 group-hover:bg-white/25',
          ICON[size]
        )}
      >
        <Phone className={size === 'sm' ? 'size-4' : 'size-5'} strokeWidth={2.4} />
      </span>

      <span className="flex flex-col items-start leading-none">
        <span
          className={cn(
            'font-semibold uppercase tracking-[0.14em] text-white/85',
            LABEL[size]
          )}
        >
          {label}
        </span>
        {showNumber && (
          <span
            className={cn(
              'mt-1.5 font-body font-extrabold tabular-nums tracking-[0.03em]',
              NUMBER[size]
            )}
          >
            {SITE.phone.display}
          </span>
        )}
      </span>
    </a>
  );
}

/** Botón secundario de WhatsApp. Verde de marca, sin competirle al rojo. */
export function WhatsAppButton({
  size = 'md',
  label = 'WhatsApp',
  className,
}: {
  size?: Size;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={SITE.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      aria-label="Escribir a Grúas Zamora Moya por WhatsApp"
      className={cn(
        'group inline-flex items-center justify-center rounded-sm border border-chrome-300/25 bg-night-800/70 font-bold text-chrome-100 backdrop-blur',
        'transition-[background-color,border-color,color] duration-200',
        'hover:border-[#25D366]/70 hover:bg-night-700 hover:text-white',
        BOX[size],
        className
      )}
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 transition-colors duration-200 group-hover:bg-[#25D366]/25',
          ICON[size]
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn('fill-[#25D366]', size === 'sm' ? 'size-4' : 'size-5')}
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </span>
      <span className="text-sm uppercase tracking-wide">{label}</span>
    </a>
  );
}
