"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

function Pagination({
  page,
  pageCount,
  totalItems,
  onPageChange,
}: {
  page: number
  pageCount: number
  totalItems: number
  onPageChange: (page: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 pt-1" data-slot="pagination">
      <Text as="span" variant="muted">
        {totalItems === 0 ? "Sin resultados" : `${totalItems} resultado${totalItems === 1 ? "" : "s"}`}
      </Text>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Página anterior"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </Button>

        <Text as="span" variant="muted" className="whitespace-nowrap">
          Página {page} de {Math.max(pageCount, 1)}
        </Text>

        <Button
          variant="outline"
          size="icon-sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="Página siguiente"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </div>
    </div>
  )
}

export { Pagination }
