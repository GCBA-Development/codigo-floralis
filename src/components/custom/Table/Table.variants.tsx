import { cva } from "class-variance-authority";

export const tableVariants = cva("w-full border-collapse text-sm", {
  variants: {
    variant: {
      modern: "rounded-xl overflow-hidden shadow-md bg-card",
      gcba: "rounded-sm shadow-sm",
    },
  },
  defaultVariants: {
    variant: "modern",
  },
});

export const rowVariants = cva("transition-colors duration-200", {
  variants: {
    stripes: {
      true: "odd:bg-card even:bg-muted/50",
      false: "bg-card",
    },
    hover: {
      true: "hover:bg-primary/10 cursor-pointer",
    },
  },
  defaultVariants: {
    stripes: true,
    hover: true,
  },
});