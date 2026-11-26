// Lee los tokens de `tokens.css` (única fuente de verdad) y resuelve `var(--x)` hasta llegar a un hex.
// Lo usan el test de contraste y la historia de Colors; no se exporta desde la librería.

export type ThemeName = "light" | "dark"
export type TokenMap = Readonly<Record<string, string>>

const VAR_REFERENCE = /^var\((--[\w-]+)\)$/

function extractBlock(css: string, selector: string): string {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) throw new Error(`No se encontró el bloque "${selector}" en tokens.css`)
  const end = css.indexOf("\n}", start)
  return css.slice(start, end)
}

function parseDeclarations(block: string): Record<string, string> {
  const declarations: Record<string, string> = {}
  for (const [, name, value] of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) declarations[name] = value.trim()
  return declarations
}

function resolveValue(value: string, declarations: Record<string, string>, trail: readonly string[] = []): string {
  const reference = VAR_REFERENCE.exec(value)?.[1]
  if (!reference) return value
  if (trail.includes(reference)) throw new Error(`Referencia circular: ${[...trail, reference].join(" -> ")}`)
  const target = declarations[reference]
  if (target === undefined) throw new Error(`Token sin definir: ${reference}`)
  return resolveValue(target, declarations, [...trail, reference])
}

/** Tokens del tema con todas sus referencias resueltas. En `dark` los tokens no redefinidos heredan de `:root`. */
export function resolveThemeTokens(css: string, theme: ThemeName): TokenMap {
  const root = parseDeclarations(extractBlock(css, ":root"))
  const declarations = theme === "dark" ? { ...root, ...parseDeclarations(extractBlock(css, ".dark")) } : root
  return Object.fromEntries(Object.entries(declarations).map(([name, value]) => [name, resolveValue(value, declarations)]))
}

export const PRIMITIVE_PREFIX = "--fl-"

export function isPrimitiveToken(name: string): boolean {
  return name.startsWith(PRIMITIVE_PREFIX)
}

export const SEMANTIC_COLOR_PAIRS = [
  ["foreground", "background"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["muted-foreground", "muted"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["accent-foreground", "accent"],
  ["destructive-foreground", "destructive"],
  ["success-foreground", "success"],
  ["warning-foreground", "warning"],
  ["info-foreground", "info"],
  ["highlight-foreground", "highlight"],
  ["sidebar-foreground", "sidebar"],
  ["sidebar-accent-foreground", "sidebar-accent"],
  ["number-highlight", "card"],
  ["destructive", "background"],
  ["destructive", "card"],
] as const satisfies readonly (readonly [string, string])[]
