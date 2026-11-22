export type InputRestriction = "numeros" | "telefono" | "sentenceCase"

const NON_DIGITS = /\D/g
const NON_PHONE_CHARS = /[^\d+]/g

/** Devuelve el valor filtrado/normalizado según la restricción. Sin restricción, el valor intacto. */
export function applyRestriction(value: string, restrict?: InputRestriction): string {
  switch (restrict) {
    case "numeros":
      return value.replace(NON_DIGITS, "")
    case "telefono":
      return value.replace(NON_PHONE_CHARS, "")
    case "sentenceCase":
      return value.charAt(0).toUpperCase() + value.slice(1)
    default:
      return value
  }
}
