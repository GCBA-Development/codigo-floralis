import * as React from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

type SortDirection = "asc" | "desc" | "none"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-s6", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("border-b border-(--hairline) bg-muted/30", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("divide-y divide-(--hairline)", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr data-slot="table-row" className={cn("transition-colors duration-150 hover:bg-muted/40 data-[state=selected]:bg-secondary/5", className)} {...props} />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-4 text-left align-middle text-s7 font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function TableSortableHead({
  className,
  align = "left",
  sorted = "none",
  onSort,
  children,
  ...props
}: Omit<React.ComponentProps<"th">, "children"> & {
  align?: "left" | "right"
  sorted?: SortDirection
  onSort?: () => void
  children?: React.ReactNode
}) {
  return (
    <th
      data-slot="table-head"
      aria-sort={sorted === "none" ? "none" : sorted === "asc" ? "ascending" : "descending"}
      className={cn(
        "h-11 px-4 align-middle text-s7 font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-muted-foreground",
        align === "right" ? "text-right" : "text-left",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onSort}
        className={cn(
          "inline-flex items-center gap-1 rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          align === "right" && "flex-row-reverse"
        )}
      >
        {children}
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={12}
          className={cn(
            "transition-transform",
            sorted === "asc" && "rotate-180",
            sorted === "none" && "opacity-30"
          )}
        />
      </button>
    </th>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-4 py-3.5 align-middle text-foreground", className)}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableSortableHead, TableCell }
