const MAX_BADGE_COUNT = 99

/** 7 -> "7"; 100 -> "99+". */
export function formatBadgeCount(count: number) {
  return count > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : String(count)
}
