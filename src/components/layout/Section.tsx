import type { ReactNode } from 'react';
import { cn } from '../ui/Button';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: 'surface' | 'container-low' | 'container' | 'container-highest';
}

/**
 * Section wrapper applying correct surface nesting according to "The No-Line Rule"
 */
export function Section({ children, id, className, variant = 'surface' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 px-6 md:px-12 w-full",
        {
          "bg-surface": variant === 'surface',
          "bg-surface-container-low": variant === 'container-low',
          "bg-surface-container": variant === 'container',
          "bg-surface-container-highest": variant === 'container-highest',
        },
        className
      )}
    >
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}
