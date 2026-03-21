import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'lg' | 'sm';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          // Base radius mimicking heavy-duty machinery (lg is ~0.5rem)
          "rounded-lg",
          {
            // Primary: The Stamping Method
            "bg-primary text-on-primary bg-gradient-to-b from-primary to-primary-container hover:bg-primary-fixed-dim hover:from-primary-fixed-dim hover:to-primary text-white shadow-sm active:shadow-inner":
              variant === 'primary',
            // Secondary: Industrial Midnight
            "bg-surface-container-highest text-secondary hover:bg-surface-dim hover:text-secondary-fixed active:shadow-inner shadow-sm":
              variant === 'secondary',
            // Ghost: Text only
            "hover:bg-surface-container hover:text-primary text-secondary":
              variant === 'ghost',
            // Sizing
            "h-12 px-6 py-3 text-base": size === 'default',
            "h-14 px-8 py-4 text-lg": size === 'lg',
            "h-10 px-4 py-2 text-sm": size === 'sm',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, cn };
