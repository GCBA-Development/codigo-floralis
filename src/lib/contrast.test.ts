import { describe, expect, it } from "vitest"
import { contrastRatio, parseHexColor, passesAA } from "./contrast"

describe("contrastRatio", () => {
  it("negro sobre blanco es 21:1", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5)
  })
  it("es simétrico", () => {
    expect(contrastRatio("#1d3343", "#ffffff")).toBeCloseTo(contrastRatio("#ffffff", "#1d3343"), 10)
  })
  it("mismo color es 1:1", () => {
    expect(contrastRatio("#6b7280", "#6b7280")).toBeCloseTo(1, 10)
  })
  it("valor conocido: #767676 sobre blanco ≈ 4.54", () => {
    expect(contrastRatio("#767676", "#ffffff")).toBeCloseTo(4.54, 2)
  })
})

describe("parseHexColor", () => {
  it("acepta formato corto", () => {
    expect(parseHexColor("#fff")).toEqual([255, 255, 255])
  })
  it("rechaza valores que no son hex", () => {
    expect(() => parseHexColor("rgb(0,0,0)")).toThrow()
  })
})

describe("passesAA", () => {
  it("usa 4.5 por defecto y acepta umbral propio", () => {
    expect(passesAA(4.5)).toBe(true)
    expect(passesAA(4.49)).toBe(false)
    expect(passesAA(3.2, 3)).toBe(true)
  })
})
