import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"
export type Kpi = { label: string; value: number; suffix?: string }

type KpiCardProps = Kpi & {
  loading?: boolean
  /** `primary` es la cifra principal del módulo (fondo de marca); `secondary` las demás. */
  variant?: "primary" | "secondary"
}

/*
  No hay dos geometrías: hay una sola. Con `loading`, cada `Text` se enmascara
  en su lugar conservando su texto, así que el alto de la card no puede cambiar
  al llegar los datos. `label` suele envolver a dos líneas dentro de `min-w-40`
  ("Total de intervenciones"), y eso es justo lo que un skeleton de alto fijo
  no puede replicar.
*/
export function KpiCard({ label, value, suffix, loading = false, variant = "secondary" }: KpiCardProps) {
  const isHighlight = variant === "primary"

  return (
    <div
      className={cn(
        "@container flex min-w-40 flex-1 flex-col justify-between gap-4 rounded-2xl px-5 py-4 transition-shadow duration-200",
        isHighlight
          ? "bg-linear-to-br from-primary to-secondary text-primary-foreground shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--secondary)_75%,transparent)] md:flex-[1.4]"
          : "bg-muted/60 ring-1 ring-inset ring-(--hairline) hover:shadow-(--shadow-surface)",
      )}
    >
      <Text
        as="span"
        variant="muted"
        title={label}
        className={cn("line-clamp-2 text-s7 font-semibold uppercase tracking-[0.1em]", isHighlight && "text-primary-foreground/80", loading && isHighlight && "bg-primary-foreground/20")}
        loading={loading}
      >
        {label}
      </Text>
      <Text
        as="span"
        variant="number"
        className={cn(isHighlight ? "text-[clamp(1.25rem,13cqw,2rem)]" : "text-[clamp(1.125rem,11cqw,1.5rem)]", "block whitespace-nowrap font-bold leading-none tracking-tight tabular-nums", isHighlight && "text-primary-foreground", loading && isHighlight && "bg-primary-foreground/20")}
        loading={loading}
      >
        {value.toLocaleString("es-AR")}
        {suffix}
      </Text>
    </div>
  )
}
