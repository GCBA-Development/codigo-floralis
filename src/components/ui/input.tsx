import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  label?: React.ReactNode
  /** Ícono a la derecha del input (ej. mostrar/ocultar contraseña). Opcional. */
  icon?: IconSvgElement
  /** Si se pasa junto con `icon`, lo vuelve clickeable. Sin esto el ícono es decorativo. */
  onIconClick?: () => void
  /** `aria-label` del botón del ícono — obligatorio en la práctica si `onIconClick` está presente. */
  iconLabel?: string
}

function Input({
  className,
  type,
  label,
  id,
  icon,
  onIconClick,
  iconLabel,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  const input = (
    <InputPrimitive
      id={inputId}
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-t-md border-0 border-b-2 border-field-border bg-muted/40 px-2.5 py-1 text-s5 text-foreground transition-all duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-s6 file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-muted/60 focus-visible:border-border focus-visible:bg-muted/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-field-border-disabled disabled:bg-transparent disabled:text-muted-foreground disabled:opacity-60 aria-invalid:border-destructive md:text-s6",
        label && "h-11 pt-4.5 pb-1",
        icon && "pr-9",
        className
      )}
      {...props}
    />
  )

  if (!label && !icon) return input

  return (
    <div className="relative w-full">
      {input}
      {label && (
        <label
          htmlFor={inputId}
          className="pointer-events-none absolute top-1.5 left-2.5 text-s7 font-medium text-muted-foreground"
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
  )
}

export { Input }
