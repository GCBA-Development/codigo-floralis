import { cva } from "class-variance-authority";

export const loadingVariants = cva(
  "transition-all duration-500 flex items-center justify-center p-6",
  {
    variants: {
      variant: {
        fullscreen: "fixed inset-0 w-full h-full bg-card/60 z-[100] ml-0!",
        section: "relative w-full h-80 bg-muted/30 rounded-3xl border border-border/50",
        inline: "inline-flex bg-transparent",
      },
      size: {
        sm: "scale-75",
        md: "scale-100",
        lg: "scale-125",
      }
    },
    defaultVariants: {
      variant: "fullscreen",
      size: "md",
    },
  }
);