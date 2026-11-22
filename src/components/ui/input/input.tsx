"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { applyRestriction, type InputRestriction } from "@/lib/input-restrictions"
import { Field, FieldLabel, FieldMessages } from "@/components/ui/field"

type InputProps = React.ComponentProps<"input"> & {
  label?: React.ReactNode
  /** Ícono a la derecha del input (ej. mostrar/ocultar contraseña). Opcional. */
  icon?: IconSvgElement
  /** Si se pasa junto con `icon`, lo vuelve clickeable. Sin esto el ícono es decorativo. */
  onIconClick?: () => void
  /** `aria-label` del botón del ícono — obligatorio en la práctica si `onIconClick` está presente. */
  iconLabel?: string
  /** Ícono decorativo a la izquierda. */
  startIcon?: React.ReactNode
  /** Texto de ayuda debajo del campo. */
  description?: React.ReactNode
  /** @deprecated Usá `description`. Se elimina en la próxima versión. */
  helperText?: string
  /** Mensaje de error (string) o solo estado inválido (true). Tiene prioridad sobre `description`. */
  error?: string | boolean
  /** Filtra lo que se escribe. `onChange` recibe el valor ya filtrado. */
  restrict?: InputRestriction
}

function Input({
  className,
  type,
  label,
  icon,
  onIconClick,
  iconLabel,
  startIcon,
  description,
  helperText,
  error,
  restrict,
  onChange,
  ...props
}: InputProps) {
  const helpText = description ?? helperText

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (restrict) {
      const filtered = applyRestriction(event.target.value, restrict)
      if (filtered !== event.target.value) event.target.value = filtered
    }
    onChange?.(event)
  }

  const input = (
    <InputPrimitive
      type={type}
      data-slot="input"
      onChange={handleChange}
      className={cn(
        "h-8 w-full min-w-0 rounded-t-md border-0 border-b-2 border-field-border bg-muted/40 px-2.5 py-1 text-s5 text-foreground transition-all duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-s6 file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-muted/60 focus-visible:border-border focus-visible:bg-muted/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-field-border-disabled disabled:bg-transparent disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive md:text-s6",
        label && "h-11 pt-4.5 pb-1",
        icon && "pr-9",
        startIcon && "pl-9",
        className
      )}
      {...props}
    />
  )

  // Sin decoración, el input queda suelto: si lo envuelve un `FormField`, ese `Field` lo asocia.
  if (!label && !icon && !startIcon && !helpText && !error) return input

  return (
    <Field invalid={Boolean(error)}>
      <div className="relative w-full">
        {startIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground [&_svg]:size-4.5"
          >
            {startIcon}
          </span>
        )}
        {input}
        {label && (
          <FieldLabel inset className={cn(startIcon && "left-9")}>
            {label}
          </FieldLabel>
        )}
        {icon && (onIconClick ? (
          <button
            type="button"
            onClick={onIconClick}
            aria-label={iconLabel}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-4.5" />
          </button>
        ) : (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
          >
            <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-4.5" />
          </span>
        ))}
      </div>
      <FieldMessages description={helpText} error={error} />
    </Field>
  )
}

export { Input }
