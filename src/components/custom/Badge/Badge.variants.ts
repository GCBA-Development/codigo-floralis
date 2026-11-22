import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Estilo moderno: Fondo muy suave y texto intenso
        soft: "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        success: "border-transparent bg-success/10 text-success border border-success/30",
        warning: "border-transparent bg-warning/10 text-warning border border-warning/30",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] uppercase tracking-wider",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);