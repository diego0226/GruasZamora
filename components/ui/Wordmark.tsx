import Link from 'next/link';
import { ShieldMark } from './ShieldMark';
import { cn } from '@/lib/utils';

/**
 * Logotipo: escudo + letras cromadas, como la rotulación de las unidades.
 * Envuelto en un Link al home porque es lo que todo el mundo espera.
 */
export function Wordmark({
  className,
  uid = 'a',
  compact = false,
}: {
  className?: string;
  uid?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn('group flex items-center gap-3', className)}
      aria-label="Grúas Zamora Moya — inicio"
    >
      <ShieldMark
        uid={uid}
        className={cn(
          'shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105',
          compact ? 'h-8 w-auto' : 'h-10 w-auto sm:h-11'
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'chrome-text font-display uppercase tracking-tight',
            compact ? 'text-lg' : 'text-xl sm:text-2xl'
          )}
        >
          Grúas Zamora
        </span>
        <span
          className={cn(
            'font-body font-bold uppercase text-chrome-400 tracking-[0.28em]',
            compact ? 'text-[0.5rem]' : 'text-[0.55rem] sm:text-[0.6rem]'
          )}
        >
          Moya · Towing 24/7
        </span>
      </span>
    </Link>
  );
}
