import { cn } from "@/lib/utils"

/*
  Tono único de "cargando", compartido por `Skeleton` (bloques con alto propio,
  ej. el chart) y por la máscara de `Text`. Es `bg-foreground/10` y no `bg-muted`
  porque varios contenedores ya son `bg-muted` (KpiCard, accent, sidebar) y un
  placeholder gris sobre gris no se ve.
*/
const SKELETON_SURFACE = "animate-pulse rounded-md bg-foreground/10"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(SKELETON_SURFACE, className)}
      {...props}
    />
  )
}

export { Skeleton, SKELETON_SURFACE }
