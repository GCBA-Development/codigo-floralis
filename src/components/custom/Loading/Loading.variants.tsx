import { cva } from "class-variance-authority";

export const loadingVariants = cva(
  "transition-all duration-500 flex items-center justify-center p-6",
  {
    variants: {
      variant: {
        fullscreen: "fixed inset-0 w-full h-full bg-[rgba(255,255,255,0.6)] z-[100] ml-0!",
        section: "relative w-full h-80 bg-slate-50/30 rounded-3xl border border-slate-200/50",
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