import * as React from "react"

import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-2 rounded-[20px] bg-card p-3 text-card-foreground shadow-(--shadow-surface) ring-1 ring-(--hairline)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <Text
      as="h3"
      variant="header"
      data-slot="card-title"
      className={cn(className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn(className)} {...props} />
  )
}

export { Card, CardTitle, CardContent }
