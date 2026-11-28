import { Text } from "@/components/ui/text"

interface PageHeaderProps {
  title: React.ReactNode
  /** Texto o contenido bajo el título (ej. una línea de estado con un link). */
  subtitle?: React.ReactNode
  /** Etiqueta pequeña sobre el título (ej. "Panel general"). Solo en `size="large"`. */
  eyebrow?: string
  /** Acciones arriba a la derecha, alineadas con el título. Acepta uno o varios botones (usá un fragment para varios). */
  actions?: React.ReactNode
  /** `compact` (default): encabezado de las pantallas de gestión. `large`: portadas o pantallas de presentación. */
  size?: "compact" | "large"
}

export function PageHeader({ title, subtitle, eyebrow, actions, size = "compact" }: PageHeaderProps) {
  const large = size === "large"
  return (
    <header className={large ? "rise-in flex items-start justify-between gap-6 pb-2 pt-1" : "flex flex-wrap items-start justify-between gap-3"}>
      <div className={large ? "flex min-w-0 flex-col gap-2" : "flex min-w-0 flex-col gap-1"}>
        {large && eyebrow ? (
          <span className="flex items-center gap-2 text-s7 font-semibold uppercase tracking-[0.16em] text-secondary">
            <span aria-hidden className="h-px w-6 bg-secondary/60" />
            {eyebrow}
          </span>
        ) : null}
        {large ? (
          <Text as="h1" variant="pageTitle" className="text-s1 font-bold tracking-tight">
            {title}
          </Text>
        ) : (
          <h1 className="text-s4 font-bold text-primary">{title}</h1>
        )}
        {subtitle ? (
          large ? (
            <Text as="div" variant="subtitle" className="max-w-2xl text-s5 text-muted-foreground">
              {subtitle}
            </Text>
          ) : (
            <div className="text-s6 text-muted-foreground">{subtitle}</div>
          )
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{actions}</div> : null}
    </header>
  )
}
