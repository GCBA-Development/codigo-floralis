import { describe, expect, it } from "vitest"

import { getInitials } from "./get-initials"

describe("getInitials", () => {
  it("toma las dos primeras palabras", () => {
    expect(getInitials("ana maría pérez")).toBe("AM")
  })
  it("tolera espacios de más y una sola palabra", () => {
    expect(getInitials("  Juan  ")).toBe("J")
  })
  it("devuelve vacío sin nombre", () => {
    expect(getInitials("   ")).toBe("")
  })
})
