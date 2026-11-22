"use client"

import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { mergeProps } from "@base-ui/react/merge-props"

import { cn } from "@/lib/utils"
import { Field, FieldLabel, FieldMessages } from "@/components/ui/field"

type TextareaProps = React.ComponentProps<"textarea"> & {
  label?: React.ReactNode
  /** Texto de ayuda debajo del campo. */
  description?: React.ReactNode
  /** Mensaje de error (string) o solo estado inválido (true). Tiene prioridad sobre `description`. */
  error?: string | boolean
}

function Textarea({ className, label, description, error, ...props }: TextareaProps) {
  const textarea = (
    <FieldPrimitive.Control
      render={(controlProps) => (
        <textarea
          data-slot="textarea"
          {...mergeProps<"textarea">(controlProps as React.ComponentProps<"textarea">, props)}
          className={cn(
            "min-h-20 w-full rounded-t-md border-0 border-b-2 border-field-border bg-muted/40 px-2.5 py-1.5 text-s5 text-foreground transition-all duration-200 outline-none placeholder:text-muted-foreground hover:bg-muted/60 focus-visible:border-border focus-visible:bg-muted/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-field-border-disabled disabled:bg-transparent disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive md:text-s6",
            label && "pt-5.5",
            className
          )}
        />
      )}
    />
  )

  return (
    <Field invalid={Boolean(error)}>
      <div className="relative w-full">
        {textarea}
        {label && <FieldLabel inset>{label}</FieldLabel>}
      </div>
      <FieldMessages description={description} error={error} />
    </Field>
  )
}

export { Textarea }
export type { TextareaProps }
