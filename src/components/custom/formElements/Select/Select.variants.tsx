import { cva } from "class-variance-authority";

export const selectVariants = cva(
  "inline-flex items-center justify-between rounded-2xl border transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed group",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground hover:border-field-border hover:shadow-sm",
        modern: "border-border bg-muted/50 backdrop-blur-md text-foreground hover:bg-card hover:border-field-border-disabled hover:shadow-xl hover:shadow-border/50",
        glass: "border-card/20 bg-card/10 backdrop-blur-xl text-foreground hover:bg-card/20 hover:border-card/40 shadow-(--shadow-surface)",
      },
      size: {
        sm: "h-9 px-3 text-[11px] font-bold uppercase tracking-tight gap-2",
        md: "h-12 px-4 text-sm font-medium gap-3",
        lg: "h-16 px-6 text-base font-semibold gap-4 rounded-[1.5rem]",
      },
      hasError: {
        true: "border-destructive bg-destructive/5 text-destructive focus:ring-destructive/20",
        false: "",
      },
    },
    defaultVariants: {
      variant: "modern", // Cambiamos el default al más moderno
      size: "md",
    },
  }
);