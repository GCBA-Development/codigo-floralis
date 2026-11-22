"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CloudUploadIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

/**
 * Zona de arrastre/selección de archivos. No sube nada: entrega los `File` a `onFiles`
 * para que el caller decida (ej. importaciones). Portado de codigo-floralis sin react-dropzone.
 */
export function Dropzone({
  onFiles,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  error,
  label = "Arrastrá un archivo o hacé clic para elegirlo",
  hint,
  className,
}: {
  onFiles: (files: File[]) => void
  /** Igual que `<input accept>`, ej. ".xlsx,.csv" */
  accept?: string
  multiple?: boolean
  /** Bytes */
  maxSize?: number
  disabled?: boolean
  error?: string
  label?: string
  hint?: string
  className?: string
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | null>(null)

  const handle = (list: FileList | null) => {
    if (!list?.length) return
    const files = Array.from(list).slice(0, multiple ? undefined : 1)
    const exts = accept?.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean)
    // El drop no respeta `accept`, se valida a mano.
    const bad = files.find(
      (f) =>
        (exts?.length &&
          !exts.some((a) =>
            a.startsWith(".") ? f.name.toLowerCase().endsWith(a) : f.type.startsWith(a.replace("*", ""))
          )) ||
        (maxSize && f.size > maxSize)
    )
    if (bad) {
      setLocalError(
        maxSize && bad.size > maxSize
          ? `"${bad.name}" supera ${(maxSize / 1_000_000).toFixed(1)} MB`
          : `"${bad.name}" no tiene un formato permitido`
      )
      return
    }
    setLocalError(null)
    onFiles(files)
  }

  const shownError = localError ?? error

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-invalid={!!shownError}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled) handle(e.dataTransfer.files)
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-4 py-8 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
          dragging && "border-primary bg-primary/5",
          shownError && "border-destructive bg-destructive/5",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <HugeiconsIcon icon={CloudUploadIcon} strokeWidth={2} className="size-6 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-s7 text-muted-foreground">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            handle(e.target.files)
            e.target.value = "" // permite re-elegir el mismo archivo
          }}
        />
      </div>
      {shownError && (
        <p role="alert" className="text-s7 text-destructive">
          {shownError}
        </p>
      )}
    </div>
  )
}
