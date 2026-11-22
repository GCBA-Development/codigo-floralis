import { cva } from "class-variance-authority";

// src/components/ui/button.tsx
export const buttonVariants = cva(
"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 min-w-0 w-fit active:scale-95 select-none", {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-primary to-secondary text-primary-foreground shadow-(--shadow-surface) hover:shadow-(--shadow-float) hover:-translate-y-0.5",
        outline: "border border-primary/40 bg-card/50 backdrop-blur-sm text-foreground hover:bg-primary/10 hover:border-primary shadow-sm",
        secondary: "bg-muted/80 backdrop-blur-md text-foreground hover:bg-border",
        ghost: "hover:bg-primary/5 text-muted-foreground hover:text-foreground",
      },
      size: {
        small: "h-auto min-h-[32px] py-[6px] px-2 leading-none",
        withIcon: "h-auto min-h-[30px] py-[3px] px-2 leading-none",
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
  }
);