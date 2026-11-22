import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-20 w-full rounded-t-md border-0 border-b-2 border-field-border bg-muted/40 px-2.5 py-1.5 text-s5 text-foreground transition-all duration-200 outline-none placeholder:text-muted-foreground hover:bg-muted/60 focus-visible:border-border focus-visible:bg-muted/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-field-border-disabled disabled:bg-transparent disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive md:text-s6",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
