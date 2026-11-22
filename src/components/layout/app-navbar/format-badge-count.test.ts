import { describe, expect, it } from "vitest"

import { formatBadgeCount } from "./format-badge-count"

describe("formatBadgeCount", () => {
  it("muestra el número hasta 99", () => {
    expect(formatBadgeCount(99)).toBe("99")
  })
  it("topea en 99+", () => {
    expect(formatBadgeCount(100)).toBe("99+")
  })
})
