import { cva } from "class-variance-authority";

export const dividerVariants = cva(
  "shrink-0 bg-border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-border",
        primary: "bg-primary/40", 
        strong: "bg-field-border-disabled",
        light: "bg-muted/50",
      },
      orientation: {
        horizontal: "h-[1px] w-full my-6",
        vertical: "h-full w-[1px] mx-4",
      },
      // Agregamos un toque moderno: gradientes
      gradient: {
        true: "bg-gradient-to-r from-transparent via-border to-transparent",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      gradient: false,
    },
  }
);