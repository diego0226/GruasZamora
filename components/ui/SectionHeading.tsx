import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

/**
 * Encabezado de sección con la franja roja de la bandera como acento.
 * `as` permite bajar a h3 cuando la sección va anidada, sin romper la
 * jerarquía de encabezados que lee Google.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = 'h2',
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flag-red-lit',
            align === 'center' && 'justify-center'
          )}
        >
          <span className="h-px w-8 bg-flag-red-lit" />
          {eyebrow}
        </p>
      )}

      <Tag className="text-3xl leading-[0.95] text-chrome-50 sm:text-4xl lg:text-5xl">
        {title}
      </Tag>

      {lead && (
        <p className="mt-5 text-base leading-relaxed text-chrome-400 sm:text-lg">{lead}</p>
      )}
    </Reveal>
  );
}
