/** Umbral WCAG 2.x AA para texto normal. */
export const WCAG_AA_NORMAL_TEXT = 4.5

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export type Rgb = readonly [red: number, green: number, blue: number]

export function parseHexColor(hex: string): Rgb {
  const value = hex.trim()
  if (!HEX_PATTERN.test(value)) throw new Error(`Color hex inválido: "${hex}"`)
  const digits = value.slice(1)
  const full = digits.length === 3 ? [...digits].map((digit) => digit + digit).join("") : digits
  return [0, 2, 4].map((start) => parseInt(full.slice(start, start + 2), 16)) as unknown as Rgb
}

function linearizeChannel(channel: number): number {
  const normalized = channel / 255
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number {
  const [red, green, blue] = parseHexColor(hex).map(linearizeChannel)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export function contrastRatio(foregroundHex: string, backgroundHex: string): number {
  const [lighter, darker] = [relativeLuminance(foregroundHex), relativeLuminance(backgroundHex)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

export function passesAA(ratio: number, minimum: number = WCAG_AA_NORMAL_TEXT): boolean {
  return ratio >= minimum
}
