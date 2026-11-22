import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { SKELETON_SURFACE } from "@/components/ui/skeleton"
import { textVariants } from "./text.variants"

type TextElement = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "label" | "div"

/*
  `loading` NO reemplaza el contenido: lo enmascara. El nodo sigue siendo el
  mismo, con el mismo texto adentro y la misma tipografía, así que ocupa
  exactamente el mismo espacio cargando y con datos — envuelva en una línea o en
  tres. Reemplazar el texto por un bloque de alto fijo obliga a replicar el
  layout a mano, y ese número siempre se termina desincronizando.
*/
function Text({
  className,
  variant,
  as,
  loading = false,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & { as?: TextElement; loading?: boolean }) {
  const Comp: React.ElementType = as ?? "p"

  return (
    <Comp
      data-slot="text"
      aria-busy={loading || undefined}
      className={cn(
        textVariants({ variant }),
        loading && cn(SKELETON_SURFACE, "select-none text-transparent"),
        className
      )}
      {...props}
    />
  )
}

export { Text }
