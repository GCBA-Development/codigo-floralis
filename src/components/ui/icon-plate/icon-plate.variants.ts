import { cva } from "class-variance-authority"

// Manual de marca GCBA 2026: ícono lineal blanco sobre placa sólida azul o azul oscuro, de vértices curvos.
export const iconPlateVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg text-white [&_svg]:shrink-0 [&_svg]:stroke-[2] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]",
  {
    variants: {
      variant: {
        blue: "bg-secondary",
        navy: "bg-primary",
      },
      size: {
        sm: "size-8 [&_svg:not([class*='size-'])]:size-4",
        md: "size-10 [&_svg:not([class*='size-'])]:size-5",
        lg: "size-14 [&_svg:not([class*='size-'])]:size-7",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
    },
  }
)
