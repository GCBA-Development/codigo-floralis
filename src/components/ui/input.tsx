import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { applyRestriction, type InputRestriction } from "@/lib/input-restrictions"

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
  helperText?: string
  /** Mensaje de error (string) o solo estado inválido (true). Tiene prioridad sobre `helperText`. */
  error?: string | boolean
  /** Filtra lo que se escribe. `onChange` recibe el valor ya filtrado. */
  restrict?: InputRestriction
}

function Input({
  className,
  type,
  label,
  id,
  icon,
  onIconClick,
  iconLabel,
  startIcon,
  helperText,
  error,
  restrict,
  onChange,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`

  const errorMessage = typeof error === "string" ? error : undefined
  const message = errorMessage ?? helperText
  const isInvalid = Boolean(error)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (restrict) {
      const filtered = applyRestriction(event.target.value, restrict)
      if (filtered !== event.target.value) event.target.value = filtered
    }
    onChange?.(event)
  }

  const input = (
    <InputPrimitive
      id={inputId}
      type={type}
      data-slot="input"
      aria-invalid={isInvalid || undefined}
      aria-describedby={cn(message && messageId, ariaDescribedBy) || undefined}
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

  if (!label && !icon && !startIcon && !message) return input

  return (
    <div className="w-full">
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
          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute top-1.5 left-2.5 text-s7 font-medium text-muted-foreground",
              startIcon && "left-9"
            )}
          >
            {label}
          </label>
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
      {message && (
        <p
          id={messageId}
          role={errorMessage ? "alert" : undefined}
          className={cn("mt-1 px-2.5 text-s7", errorMessage ? "text-destructive" : "text-muted-foreground")}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export { Input }
