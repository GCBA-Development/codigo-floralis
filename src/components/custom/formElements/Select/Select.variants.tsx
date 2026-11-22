import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "inline-flex items-center justify-between rounded-2xl border transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed group",
  {
    variants: {
      variant: {
        default: "border-slate-200 bg-white text-slate-900 hover:border-slate-400 hover:shadow-sm",
        modern: "border-slate-100 bg-slate-50/50 backdrop-blur-md text-slate-900 hover:bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50",
        glass: "border-white/20 bg-white/10 backdrop-blur-xl text-slate-900 hover:bg-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
      },
      size: {
        sm: "h-9 px-3 text-[11px] font-bold uppercase tracking-tight gap-2",
        md: "h-12 px-4 text-sm font-medium gap-3",
        lg: "h-16 px-6 text-base font-semibold gap-4 rounded-[1.5rem]",
      },
      hasError: {
        true: "border-red-400 bg-red-50/50 text-red-900 focus:ring-red-100",
        false: "",
      },
    },
    defaultVariants: {
      variant: "modern", // Cambiamos el default al más moderno
      size: "md",
    },
  }
);