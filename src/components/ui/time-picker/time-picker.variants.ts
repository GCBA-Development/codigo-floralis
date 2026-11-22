import { cva } from "class-variance-authority";

export const timePickerVariants = cva(
  "flex h-11 w-full rounded-xl border px-4 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border bg-card shadow-sm focus-visible:ring-primary/30 focus-visible:border-primary",
        modern: "border-border bg-muted/50 hover:bg-muted focus-visible:bg-card focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:shadow-md",
        glass: "border-card/20 bg-card/40 backdrop-blur-md shadow-inner focus-visible:ring-primary",
        error: "border-destructive/30 bg-destructive/5 text-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive",
      },
    },
    defaultVariants: {
      variant: "modern",
    },
  }
);