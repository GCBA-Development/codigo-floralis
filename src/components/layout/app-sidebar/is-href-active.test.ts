import { describe, expect, it } from "vitest"

import { isAnyHrefActive, isHrefActive } from "./is-href-active"

describe("isHrefActive", () => {
  it("matchea exacto ignorando query, hash y barra final", () => {
    expect(isHrefActive("/reclamos/?q=1#x", "/reclamos")).toBe(true)
  })
  it("prefix incluye subrutas pero no rutas hermanas", () => {
    expect(isHrefActive("/reclamos/12", "/reclamos")).toBe(true)
    expect(isHrefActive("/reclamos-viejos", "/reclamos")).toBe(false)
  })
  it("exact no incluye subrutas", () => {
    expect(isHrefActive("/reclamos/12", "/reclamos", "exact")).toBe(false)
  })
  it("la raíz solo matchea exacta", () => {
    expect(isHrefActive("/avisos", "/")).toBe(false)
    expect(isHrefActive("/", "/")).toBe(true)
  })
  it("sin activeHref nada está activo", () => {
    expect(isHrefActive(undefined, "/")).toBe(false)
  })
})

describe("isAnyHrefActive", () => {
  const targets = [{ href: "/presupuesto/corridas" }, { href: "/presupuesto", match: "exact" as const }]
  it("true si algún sub-item coincide", () => {
    expect(isAnyHrefActive("/presupuesto/corridas/3", targets)).toBe(true)
  })
  it("respeta el match de cada sub-item", () => {
    expect(isAnyHrefActive("/presupuesto/indicadores", targets)).toBe(false)
  })
  it("false sin activeHref o sin sub-items", () => {
    expect(isAnyHrefActive(undefined, targets)).toBe(false)
    expect(isAnyHrefActive("/x", [])).toBe(false)
  })
})
