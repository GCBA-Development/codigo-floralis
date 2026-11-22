import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex h-11 w-full rounded-lg border bg-card/80 backdrop-blur-sm px-4 py-2 text-sm transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground",
  {
    variants: {
      variant: {
        modern: "border-border/60 shadow-xs focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:shadow-[0_0_0_4px] focus-visible:shadow-ring/10 hover:border-field-border-disabled",
        error: "border-destructive/30 bg-destructive/5 text-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive shadow-[0_2px_4px] shadow-destructive/10",
        default: "border-border focus-visible:ring-2 focus-visible:ring-primary/30",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);