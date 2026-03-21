import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from './Button';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full bg-surface-container-high px-4 py-2 text-base shadow-sm transition-colors",
          "border border-outline-variant/20 rounded-md",
          "placeholder:text-on-surface-variant/50 focus-visible:outline-none focus:border-b-2 focus:border-b-primary focus:border-x-outline-variant/20 focus:border-t-outline-variant/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
