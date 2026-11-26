import { cva } from "class-variance-authority"

// Manual de marca GCBA 2026: ícono lineal blanco sobre placa sólida azul o azul oscuro, de vértices curvos.
// El radio va por tamaño: con rounded-lg fijo la placa chica (32px) quedaba circular.
export const iconPlateVariants = cva(
  "inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0 [&_svg]:stroke-[2] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]",
  {
    variants: {
      variant: {
        blue: "bg-secondary text-secondary-foreground",
        navy: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "size-8 rounded-md [&_svg:not([class*='size-'])]:size-4",
        md: "size-10 rounded-md [&_svg:not([class*='size-'])]:size-5",
        lg: "size-14 rounded-lg [&_svg:not([class*='size-'])]:size-7",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
    },
  }
)
