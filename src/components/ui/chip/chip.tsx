"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

/** Chip removible para mostrar un filtro activo — ver uso en `dashboard-filters-card.tsx` y `reclamos-page-client.tsx`. */
export function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="group flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-s7 font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
    >
      {label}
      <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3" />
    </button>
  )
}
