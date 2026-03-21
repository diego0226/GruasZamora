import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from './Button'; // Utility to merge classes

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface-container-low text-on-background shadow-none border-none sm:p-10 p-6 flex flex-col gap-6",
          "rounded-xl", // A bit rounded but heavily dependent on stacking
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardActionArea = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface-container-lowest p-6 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 rounded-b-xl mt-4 border-t-0 shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
CardActionArea.displayName = "CardActionArea";

export { Card, CardActionArea };
