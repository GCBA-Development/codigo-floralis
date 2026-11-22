import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  "peer h-5 w-5 shrink-0 rounded-md border shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white focus-visible:ring-primary/50",
        error: "border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 focus-visible:ring-red-500/50",
        modern: "border-slate-200 bg-white/50 backdrop-blur-sm data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_10px_rgba(255,230,0,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);