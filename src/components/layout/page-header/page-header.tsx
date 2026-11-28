import { Text } from "@/components/ui/text"

export interface PageHeaderProps {
  /** Contenido opcional a la izquierda del título (botón volver, ícono, badge). Se alinea con el título, no con el subtítulo. */
  start?: React.ReactNode
  title: React.ReactNode
  /** Texto o contenido bajo el título (ej. una línea de estado con un link). */
  subtitle?: React.ReactNode
  /** Contenido a la derecha (uno o varios botones; usá un fragment para varios). En mobile baja debajo del título. */
  end?: React.ReactNode
  /** @deprecated Usá `end`. Se ignora si se pasa `end`. */
  actions?: React.ReactNode
  /** Etiqueta pequeña sobre el título (ej. "Panel general"). Solo en `size="lg"`. */
  eyebrow?: string
  /**
   * `md` (default): encabezado de las pantallas de gestión. `lg`: portadas o pantallas de presentación.
   * `"compact"` y `"large"` están deprecados: usá `"md"` y `"lg"`.
   */
  size?: "md" | "lg" | "compact" | "large"
}

export function PageHeader({ start, title, subtitle, end, actions, eyebrow, size = "md" }: PageHeaderProps) {
  const large = size === "lg" || size === "large"
  const endContent = end ?? actions
  return (
    <header className={large ? "rise-in flex flex-wrap items-start gap-x-6 gap-y-3 pb-2 pt-1" : "flex flex-wrap items-start gap-x-4 gap-y-3"}>
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {start ? (
          // Misma altura de línea que el h1: centra `start` con el título aunque haya subtítulo.
          <div className={large ? "flex h-[1.25em] shrink-0 items-center text-s1" : "flex h-[1.5em] shrink-0 items-center text-s4"}>
            {start}
          </div>
        ) : null}
        <div className={large ? "flex min-w-0 flex-1 flex-col gap-2" : "flex min-w-0 flex-1 flex-col gap-1"}>
          {large && eyebrow ? (
            <span className="flex items-center gap-2 text-s7 font-semibold uppercase tracking-[0.16em] text-secondary">
              <span aria-hidden className="h-px w-6 bg-secondary/60" />
              {eyebrow}
            </span>
          ) : null}
          {large ? (
            <Text as="h1" variant="pageTitle" className="text-s1 leading-tight font-bold tracking-tight text-balance break-words">
              {title}
            </Text>
          ) : (
            <h1 className="text-s4 leading-[1.5] font-bold tracking-tight text-balance break-words text-primary">{title}</h1>
          )}
          {subtitle ? (
            large ? (
              <Text as="div" variant="subtitle" className="max-w-2xl text-s5 text-muted-foreground">
                {subtitle}
              </Text>
            ) : (
              <div className="max-w-3xl text-s6 text-muted-foreground">{subtitle}</div>
            )
          ) : null}
        </div>
      </div>
      {endContent ? <div className="flex shrink-0 flex-wrap items-center gap-2">{endContent}</div> : null}
    </header>
  )
}
