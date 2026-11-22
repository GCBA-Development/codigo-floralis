import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"
export type SummaryStat = { label: string; value: string; subtitle: string }

/*
  Misma idea que `KpiCard`: el estado de carga enmascara los `Text` en su lugar
  en vez de reemplazarlos por bloques, así el alto no cambia al llegar los datos.

  Ya no es una card: es una columna abierta dentro de una banda de indicadores.
  `featured` escala el número para crear jerarquía (un protagonista + secundarios).
*/
export function StatCard({
  label,
  value,
  subtitle,
  loading = false,
  featured = false,
}: SummaryStat & { loading?: boolean; featured?: boolean }) {
  return (
    <div className="@container flex min-w-0 flex-col gap-1.5">
      <Text as="span" variant="muted" className="font-semibold uppercase tracking-[0.12em] text-s7" loading={loading}>
        {label}
      </Text>
      <Text
        as="span"
        variant="number"
        className={cn(
          "block whitespace-nowrap font-bold leading-none tracking-tight tabular-nums",
          featured ? "text-[clamp(1.75rem,12cqw,3.5rem)]" : "text-[clamp(1rem,13cqw,2rem)]"
        )}
        loading={loading}
      >
        {value}
      </Text>
      <Text as="span" variant="muted" className="text-s6" loading={loading}>
        {subtitle}
      </Text>
    </div>
  )
}
