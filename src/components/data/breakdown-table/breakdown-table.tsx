"use client"

import { useMemo, useState } from "react"

import { Table, TableBody, TableCell, TableHeader, TableRow, TableSortableHead } from "@/components/data/table"
import { Text } from "@/components/ui/text"
import type { BreakdownItem } from "@/components/data/simple-bar-chart"
import { cn } from "@/lib/utils"

type SortKey = "label" | "value"
type SortDirection = "asc" | "desc"

type BreakdownTableProps = {
  items: BreakdownItem[]
  /** Encabezado de la primera columna (ej. "Solicitud"). */
  labelHeader: string
  /** Cuántas filas se muestran. */
  limit: number
  loading?: boolean
}

const formatShare = (share: number) => `${(share * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}%`

/**
 * Tabla ordenable de un desglose. Cada fila muestra su participación sobre el
 * total de TODOS los ítems (no sólo los visibles) con una barra proporcional,
 * así se lee el peso relativo sin comparar números a ojo.
 */
export function BreakdownTable({ items, labelHeader, limit, loading = false }: BreakdownTableProps) {
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({ key: "value", direction: "desc" })

  const total = useMemo(() => items.reduce((sum, item) => sum + item.value, 0), [items])

  const rows = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const comparison = sort.key === "label" ? a.label.localeCompare(b.label) : a.value - b.value
      return sort.direction === "asc" ? comparison : -comparison
    })
    return sorted.slice(0, limit)
  }, [items, sort, limit])

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "desc" },
    )
  }

  return (
    <div
      aria-busy={loading || undefined}
      className={cn(
        "overflow-hidden rounded-xl bg-card ring-1 ring-(--hairline) transition-opacity duration-200",
        loading && "opacity-60",
      )}
    >
      <Table className="text-s5">
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary [&_th]:text-primary-foreground [&_th_button]:hover:text-primary-foreground">
            <TableSortableHead
              className="h-10 px-4"
              sorted={sort.key === "label" ? sort.direction : "none"}
              onSort={() => toggleSort("label")}
            >
              {labelHeader}
            </TableSortableHead>
            <TableSortableHead
              align="right"
              className="h-10 px-4"
              sorted={sort.key === "value" ? sort.direction : "none"}
              onSort={() => toggleSort("value")}
            >
              Cantidad
            </TableSortableHead>
            <th
              scope="col"
              className="hidden h-10 w-44 px-4 text-left align-middle text-s7 font-semibold uppercase tracking-[0.08em] text-primary-foreground sm:table-cell"
            >
              Participación
            </th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, index) => {
            const share = total > 0 ? item.value / total : 0
            const isTop = index === 0
            return (
              <TableRow
                key={item.label}
                className={cn("transition-colors hover:bg-muted", isTop && "bg-muted/60")}
              >
                <TableCell className="w-full max-w-0 px-4 py-2.5" title={item.label}>
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-md text-s7 font-bold tabular-nums",
                        isTop ? "bg-secondary text-white" : "bg-muted text-secondary",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className={cn("truncate", isTop && "font-medium text-primary")}>{item.label}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2.5 text-right font-bold tabular-nums text-number-highlight">
                  {item.value.toLocaleString("es-AR")}
                </TableCell>
                <TableCell className="hidden px-4 py-2.5 sm:table-cell">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-ring to-secondary transition-[width] duration-500 ease-out motion-reduce:transition-none"
                        style={{ width: `${share * 100}%` }}
                      />
                    </div>
                    <Text as="span" variant="muted" className="w-10 text-right tabular-nums">
                      {formatShare(share)}
                    </Text>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
