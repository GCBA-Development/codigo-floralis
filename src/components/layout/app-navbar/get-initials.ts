const MAX_INITIALS = 2

/** "Ana María Pérez" -> "AM"; vacío -> "". */
export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map((word) => word[0]!.toUpperCase())
    .join("")
}
