export type ThemeChoice = "light" | "dark" | "system"
export type ThemeToggleMode = "cycle" | "toggle"

export const THEME_ORDER: readonly ThemeChoice[] = ["light", "dark", "system"]

export function isThemeChoice(value: string | undefined): value is ThemeChoice {
  return THEME_ORDER.includes(value as ThemeChoice)
}

/** Temas por los que cicla el botón: `themes` de next-themes no incluye "system" si el provider tiene `enableSystem: false`. */
export function getThemeCycle(themes: readonly string[]): ThemeChoice[] {
  return THEME_ORDER.filter((choice) => themes.includes(choice))
}

interface NextThemeOptions {
  mode: ThemeToggleMode
  cycle: readonly ThemeChoice[]
  theme: string | undefined
  resolvedTheme: string | undefined
}

/** Tema actual que se muestra: en `toggle` siempre el resuelto (claro/oscuro), en `cycle` la elección (puede ser "system"). */
export function getCurrentTheme({ mode, cycle, theme, resolvedTheme }: NextThemeOptions): ThemeChoice {
  const resolved: ThemeChoice = resolvedTheme === "dark" ? "dark" : "light"
  if (mode === "toggle") return resolved
  return isThemeChoice(theme) && cycle.includes(theme) ? theme : resolved
}

export function getNextTheme(options: NextThemeOptions): ThemeChoice {
  const { mode, cycle } = options
  const current = getCurrentTheme(options)
  if (mode === "toggle") return current === "dark" ? "light" : "dark"
  if (cycle.length === 0) return current
  return cycle[(cycle.indexOf(current) + 1) % cycle.length]!
}
