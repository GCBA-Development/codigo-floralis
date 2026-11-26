import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { iconPlateVariants } from "./icon-plate.variants"

function IconPlate({
  className,
  variant = "blue",
  size = "md",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof iconPlateVariants>) {
  return (
    <div
      data-slot="icon-plate"
      className={cn(iconPlateVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { IconPlate }
