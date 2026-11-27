import { describe, expect, it } from "vitest"

import { breakdownTotal } from "./breakdown-total"

const items = [
  { label: "A", value: 60 },
  { label: "B", value: 20 },
]

describe("breakdownTotal", () => {
  it("sin total usa la suma de los ítems", () => {
    expect(breakdownTotal(items)).toBe(80)
  })
  it("con total usa el total real (los ítems son un top N)", () => {
    expect(breakdownTotal(items, 200)).toBe(200)
  })
  it("un total menor que la suma no baja de la suma", () => {
    expect(breakdownTotal(items, 50)).toBe(80)
  })
  it("sin ítems y sin total es 0", () => {
    expect(breakdownTotal([])).toBe(0)
  })
})
