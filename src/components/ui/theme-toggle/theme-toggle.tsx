"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { ComputerIcon, Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { getCurrentTheme, getNextTheme, getThemeCycle, type ThemeChoice, type ThemeToggleMode } from "./theme-cycle"

const THEME_ICONS = { light: Sun03Icon, dark: Moon02Icon, system: ComputerIcon } as const
const DEFAULT_THEME_LABELS: Record<ThemeChoice, string> = { light: "claro", dark: "oscuro", system: "sistema" }

// Los snapshots distinguen servidor (false) de cliente hidratado (true) sin useEffect + setState.
const subscribeNoop = () => () => {}
const useIsMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false)

export interface ThemeToggleProps extends Omit<React.ComponentProps<typeof Button>, "onClick" | "children" | "aria-label"> {
  /** Nombre accesible base; se le agrega el tema actual. */
  label?: string
  /** Nombre de cada tema, usado para anunciar el tema actual. */
  themeLabels?: Partial<Record<ThemeChoice, string>>
  /** `cycle` (default) recorre los temas disponibles; `toggle` solo alterna claro y oscuro. */
  mode?: ThemeToggleMode
}

/** Botón que cicla claro -> oscuro (-> sistema si el provider lo habilita) o, con `mode="toggle"`, alterna claro y oscuro. Requiere `FloralisProvider` (o el `ThemeProvider` de next-themes). */
export function ThemeToggle({ label = "Cambiar tema", themeLabels, mode = "cycle", variant = "ghost", size = "icon", ...props }: ThemeToggleProps) {
  const { theme, resolvedTheme, themes, setTheme } = useTheme()
  const isMounted = useIsMounted()

  if (!isMounted) {
    // Mismo tamaño que el botón real para no mover el layout al hidratar.
    return <Button variant={variant} size={size} disabled aria-label={label} data-slot="theme-toggle" {...props} />
  }

  const themeState = { mode, cycle: getThemeCycle(themes), theme, resolvedTheme }
  const current = getCurrentTheme(themeState)
  const next = getNextTheme(themeState)
  const names = { ...DEFAULT_THEME_LABELS, ...themeLabels }

  return (
    <Button
      variant={variant}
      size={size}
      data-slot="theme-toggle"
      aria-label={`${label} (siguiente: ${names[next]})`}
      onClick={() => setTheme(next)}
      {...props}
    >
      <HugeiconsIcon icon={THEME_ICONS[current]} strokeWidth={2} />
    </Button>
  )
}
