import { describe, expect, it } from "vitest"

import { getNextTheme, getThemeCycle } from "./theme-cycle"

const withSystem = getThemeCycle(["light", "dark", "system"])
const withoutSystem = getThemeCycle(["light", "dark"])

describe("getThemeCycle", () => {
  it("conserva el orden claro, oscuro, sistema y omite lo no disponible", () => {
    expect(getThemeCycle(["system", "dark", "light"])).toEqual(["light", "dark", "system"])
    expect(withoutSystem).toEqual(["light", "dark"])
  })
})

describe("getNextTheme", () => {
  it("cicla con sistema", () => {
    const next = (theme: string) => getNextTheme({ mode: "cycle", cycle: withSystem, theme, resolvedTheme: "light" })
    expect([next("light"), next("dark"), next("system")]).toEqual(["dark", "system", "light"])
  })
  it("cicla sin sistema, también si el tema guardado era system", () => {
    const next = (theme: string, resolvedTheme = "light") => getNextTheme({ mode: "cycle", cycle: withoutSystem, theme, resolvedTheme })
    expect([next("light"), next("dark")]).toEqual(["dark", "light"])
    expect(next("system", "dark")).toBe("light")
  })
  it("toggle alterna según el tema resuelto, aunque el elegido sea system", () => {
    const next = (resolvedTheme: string) => getNextTheme({ mode: "toggle", cycle: withSystem, theme: "system", resolvedTheme })
    expect(next("dark")).toBe("light")
    expect(next("light")).toBe("dark")
  })
})
