import { cva } from "class-variance-authority";

export const imageItemVariants = cva(
  "relative group overflow-hidden rounded-xl border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border bg-card hover:shadow-md",
        modern: "border-transparent bg-muted hover:bg-border focus-within:ring-2 focus-within:ring-primary",
        glass: "bg-card/30 backdrop-blur-sm border-card/20 hover:bg-card/50",
      },
      size: {
        sm: "h-24 w-24",
        md: "h-40 w-40",
        lg: "h-56 w-56",
      }
    },
    defaultVariants: {
      variant: "modern",
      size: "md"
    }
  }
);