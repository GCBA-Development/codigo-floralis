import { Text } from "@/components/ui/text"

interface PageHeaderProps {
  title: string
  subtitle?: string
  /** Etiqueta pequeña sobre el título (ej. "Panel general"). */
  eyebrow?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, subtitle, eyebrow, actions }: PageHeaderProps) {
  return (
    <div className="rise-in flex items-end justify-between gap-6 pb-2 pt-1">
      <div className="flex min-w-0 flex-col gap-2">
        {eyebrow ? (
          <span className="flex items-center gap-2 text-s7 font-semibold uppercase tracking-[0.16em] text-secondary">
            <span aria-hidden className="h-px w-6 bg-secondary/60" />
            {eyebrow}
          </span>
        ) : null}
        <Text as="h1" variant="pageTitle" className="text-s1 font-bold tracking-tight">
          {title}
        </Text>
        {subtitle ? (
          <Text as="p" variant="subtitle" className="max-w-2xl text-s5 text-muted-foreground">
            {subtitle}
          </Text>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  )
}
