import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex h-11 w-full rounded-lg border bg-white/80 backdrop-blur-sm px-4 py-2 text-sm transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50/50 disabled:text-slate-400",
  {
    variants: {
      variant: {
        modern: "border-slate-200/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:shadow-[0_0_0_4px_rgba(255,230,0,0.1)] hover:border-slate-300",
        error: "border-red-200 bg-red-50/30 text-red-900 focus-visible:ring-red-500/20 focus-visible:border-red-500 shadow-[0_2px_4px_rgba(239,68,68,0.05)]",
        default: "border-slate-200 focus-visible:ring-2 focus-visible:ring-primary/30",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);