import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  "peer h-5 w-5 shrink-0 rounded-md border shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-field-border-disabled data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground focus-visible:ring-primary/50",
        error: "border-destructive data-checked:bg-destructive data-checked:border-destructive focus-visible:ring-destructive/50",
        modern: "border-border bg-card/50 backdrop-blur-sm data-checked:bg-primary data-checked:shadow-[0_0_10px] data-checked:shadow-ring/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);