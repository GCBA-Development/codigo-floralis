export type ActiveMatch = "exact" | "prefix"

const pathOf = (href: string) => href.split(/[?#]/)[0]!.replace(/(.)\/$/, "$1")

/** `prefix` marca activo `/reclamos/12` para `/reclamos`; la raíz `/` solo matchea exacta. */
export function isHrefActive(activeHref: string | undefined, href: string, match: ActiveMatch = "prefix") {
  if (activeHref === undefined) return false
  const active = pathOf(activeHref)
  const target = pathOf(href)
  if (active === target) return true
  return match === "prefix" && target !== "/" && active.startsWith(`${target}/`)
}
