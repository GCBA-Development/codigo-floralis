import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { contrastRatio, passesAA } from "./contrast"
import { SEMANTIC_COLOR_PAIRS, resolveThemeTokens, type ThemeName } from "./theme-tokens"

const css = readFileSync(new URL("../index.css", import.meta.url), "utf8")
const themes: readonly ThemeName[] = ["light", "dark"]

describe.each(themes)("tema %s", (theme) => {
  const tokens = resolveThemeTokens(css, theme)

  it.each(SEMANTIC_COLOR_PAIRS)("%s sobre %s cumple AA", (foreground, background) => {
    const ratio = contrastRatio(tokens[`--${foreground}`], tokens[`--${background}`])
    const accepted = theme === "light" && ACCEPTED_LIGHT_EXCEPTIONS.includes(`${foreground}/${background}`)
    // Una excepción que empieza a cumplir AA ya no lo es: hay que sacarla de la lista.
    expect(passesAA(ratio), `${foreground}/${background} = ${ratio.toFixed(2)}:1`).toBe(!accepted)
  })
})

// Pares que no cumplen AA en el tema claro y se aceptan para conservar los colores de front-arbolado.
const ACCEPTED_LIGHT_EXCEPTIONS = [
  "muted-foreground/background",
  "muted-foreground/muted",
  "warning-foreground/warning",
]

describe("paridad de temas", () => {
  it("el tema oscuro redefine todos los tokens semánticos de color", () => {
    const light = resolveThemeTokens(css, "light")
    const dark = resolveThemeTokens(css, "dark")
    const sharedColors = Object.keys(light).filter((name) => !name.startsWith("--fl-") && light[name].startsWith("#"))
    const notRedefined = sharedColors.filter((name) => light[name] === dark[name] && !ALLOWED_SAME_IN_BOTH.includes(name))
    expect(notRedefined).toEqual([])
  })
})

// Valores que son iguales a propósito en ambos temas (texto blanco sobre superficies de color de marca).
const ALLOWED_SAME_IN_BOTH = [
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--sidebar-foreground",
  "--sidebar-border",
  "--sidebar-accent",
  "--sidebar-accent-foreground",
]

// Colores del tema claro previos a la migración a dos niveles: no deben cambiar sin decisión explícita.
const ORIGINAL_LIGHT_TOKENS: Record<string, string> = {
  "--background": "#f1f1f3", "--foreground": "#1d3343", "--card": "#ffffff", "--popover": "#ffffff",
  "--primary": "#1d3343", "--primary-foreground": "#ffffff", "--secondary": "#035c80",
  "--muted": "#f4f5f6", "--muted-foreground": "#6b7280", "--warning-foreground": "#ffffff", "--accent": "#f4f5f6", "--destructive": "#cb3232", "--success": "#00642f",
  "--warning": "#e88700", "--info": "#00769a", "--border": "#dde2e8", "--input": "#e5e7eb",
  "--ring": "#0892cb", "--field-border": "#9ca3af", "--field-border-disabled": "#d1d5db",
  "--sidebar": "#1d3343", "--sidebar-border": "#2c4256", "--sidebar-accent": "#035c80",
  "--number-highlight": "#056088",
}

describe("tema claro", () => {
  it("conserva los colores originales de front-arbolado", () => {
    const light = resolveThemeTokens(css, "light")
    for (const [name, hex] of Object.entries(ORIGINAL_LIGHT_TOKENS)) expect(light[name], name).toBe(hex)
  })
})
