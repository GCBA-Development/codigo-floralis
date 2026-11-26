import type { BreakdownItem } from "./breakdown-table"

/**
 * Denominador de la participación. Con `total` (por ejemplo, el total real cuando
 * `items` es sólo un top N) se usa ese valor; sin él, la suma de los ítems.
 * Nunca es menor que la suma: un `total` desactualizado no puede dar más del 100%.
 */
export function breakdownTotal(items: BreakdownItem[], total?: number): number {
  const sum = items.reduce((acc, item) => acc + item.value, 0)
  return total == null ? sum : Math.max(total, sum)
}
