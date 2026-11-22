"use client"

import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"

import { cn } from "@/lib/utils"

/** Contenedor de un campo: `FieldLabel`, el control, `FieldDescription` y `FieldError` quedan asociados solos (ids, aria-labelledby/describedby/invalid). */
function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return <FieldPrimitive.Root data-slot="field" className={cn("flex w-full flex-col", className)} {...props} />
}

type FieldLabelProps = FieldPrimitive.Label.Props & {
  /** Superpone la etiqueta sobre el control (estilo "floating"); el padre debe ser `relative`. */
  inset?: boolean
}

function FieldLabel({ className, inset = false, ...props }: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        "text-s7 font-medium text-muted-foreground",
        inset && "pointer-events-none absolute top-1.5 left-2.5",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn("mt-1 px-2.5 text-s7 text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      role="alert"
      className={cn("mt-1 px-2.5 text-s7 text-destructive", className)}
      {...props}
    />
  )
}

type FieldMessagesProps = {
  /** Para apuntarlo desde `aria-describedby` cuando no hay un `Field` que lo vincule solo. */
  id?: string
  description?: React.ReactNode
  /** Mensaje (string) o solo estado inválido (`true`, sin texto). Reemplaza a `description`. */
  error?: string | boolean
}

/** Muestra el error si hay mensaje y, si no, la descripción. */
function FieldMessages({ id, description, error }: FieldMessagesProps) {
  if (typeof error === "string" && error) {
    return (
      <FieldError id={id} match>
        {error}
      </FieldError>
    )
  }
  if (description) return <FieldDescription id={id}>{description}</FieldDescription>
  return null
}

type FormFieldProps = Omit<FieldMessagesProps, "id"> & {
  label?: React.ReactNode
  required?: boolean
  disabled?: boolean
  name?: string
  className?: string
  /** El control: `Input`, `Textarea`, `SelectTrigger`, ... se asocia solo al label. */
  children: React.ReactNode
}

/** `Field` + label + mensajes en un solo componente, para envolver cualquier control. */
function FormField({ label, description, error, required, disabled, name, className, children }: FormFieldProps) {
  return (
    <Field invalid={Boolean(error)} disabled={disabled} name={name} className={className}>
      {label ? (
        <FieldLabel className="mb-1">
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </FieldLabel>
      ) : null}
      {children}
      <FieldMessages description={description} error={error} />
    </Field>
  )
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldMessages, FormField }
export type { FieldLabelProps, FieldMessagesProps, FormFieldProps }
