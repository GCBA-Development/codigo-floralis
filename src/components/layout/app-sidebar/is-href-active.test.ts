import { describe, expect, it } from "vitest"

import { isHrefActive } from "./is-href-active"

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
