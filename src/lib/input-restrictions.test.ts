import { describe, expect, it } from "vitest"
import { applyRestriction } from "./input-restrictions"

describe("applyRestriction", () => {
  it("numeros descarta todo lo que no es dígito", () => {
    expect(applyRestriction("12a-3 4", "numeros")).toBe("1234")
  })
  it("telefono conserva dígitos y +", () => {
    expect(applyRestriction("+54 (11) 4444-5555", "telefono")).toBe("+541144445555")
  })
  it("sentenceCase capitaliza solo la primera letra", () => {
    expect(applyRestriction("hola Mundo", "sentenceCase")).toBe("Hola Mundo")
    expect(applyRestriction("", "sentenceCase")).toBe("")
  })
  it("sin restricción devuelve el valor intacto", () => {
    expect(applyRestriction("a1 b2")).toBe("a1 b2")
  })
})
