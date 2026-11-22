"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { ComputerIcon, Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"

export type ThemeChoice = "light" | "dark" | "system"

const THEME_ORDER: readonly ThemeChoice[] = ["light", "dark", "system"]
const THEME_ICONS = { light: Sun03Icon, dark: Moon02Icon, system: ComputerIcon } as const
const DEFAULT_THEME_LABELS: Record<ThemeChoice, string> = { light: "claro", dark: "oscuro", system: "sistema" }

// Los snapshots distinguen servidor (false) de cliente hidratado (true) sin useEffect + setState.
const subscribeNoop = () => () => {}
const useIsMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false)

function isThemeChoice(value: string | undefined): value is ThemeChoice {
  return THEME_ORDER.includes(value as ThemeChoice)
}

export interface ThemeToggleProps extends Omit<React.ComponentProps<typeof Button>, "onClick" | "children" | "aria-label"> {
  /** Nombre accesible base; se le agrega el tema actual. */
  label?: string
  /** Nombre de cada tema, usado para anunciar el tema actual. */
  themeLabels?: Partial<Record<ThemeChoice, string>>
}

/** Botón que cicla claro -> oscuro -> sistema. Requiere `FloralisProvider` (o el `ThemeProvider` de next-themes). */
export function ThemeToggle({ label = "Cambiar tema", themeLabels, variant = "ghost", size = "icon", ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const isMounted = useIsMounted()

  if (!isMounted) {
    // Mismo tamaño que el botón real para no mover el layout al hidratar.
    return <Button variant={variant} size={size} disabled aria-label={label} data-slot="theme-toggle" {...props} />
  }

  const current = isThemeChoice(theme) ? theme : "system"
  const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length]
  const names = { ...DEFAULT_THEME_LABELS, ...themeLabels }

  return (
    <Button
      variant={variant}
      size={size}
      data-slot="theme-toggle"
      aria-label={`${label} (actual: ${names[current]})`}
      onClick={() => setTheme(next)}
      {...props}
    >
      <HugeiconsIcon icon={THEME_ICONS[current]} strokeWidth={2} />
    </Button>
  )
}
