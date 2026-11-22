import * as React from "react"
import { buttonVariants } from "./ButtonIcon.variants"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils";

interface ButtonIconProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Esta es la clave
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ButtonIcon = React.memo(React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ className, variant = "default", children, asChild, startIcon, endIcon, ...props }, ref) => {
    
    const hasChildren = !!children;
    const hasAnyIcon = !!startIcon || !!endIcon;
    
    // Seleccionamos la variante con padding de MUI
    const sizeVariant = (hasChildren && hasAnyIcon) ? "withIcon" : "small";

    return (
<button
        ref={ref}
        className={cn(buttonVariants({ variant, size: sizeVariant }), "ButtonIcon group relative overflow-hidden shrink-0 gap-2.5", className)}
        {...props}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        {startIcon && (
          <span className="flex shrink-0 items-center justify-center transition-transform group-hover:scale-110">
            {startIcon}
          </span>
        )}
        
        {children && (
          <span className="leading-none tracking-tight text-[0.75rem] uppercase">
            {children}
          </span>
        )}
        
        {endIcon && (
          <span className="flex shrink-0 items-center justify-center transition-transform group-hover:scale-110">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
));

ButtonIcon.displayName = "ButtonIcon";

export default ButtonIcon;