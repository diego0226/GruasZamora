import { Phone } from 'lucide-react';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
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
        <WhatsAppGlyph
          className={cn('fill-[#25D366]', size === 'sm' ? 'size-4' : 'size-5')}
        />
      </span>
      <span className="text-sm uppercase tracking-wide">{label}</span>
    </a>
  );
}
