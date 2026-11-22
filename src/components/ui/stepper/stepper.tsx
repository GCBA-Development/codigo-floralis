"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export type StepItem = { title: string; description?: string }

/**
 * Indicador de pasos (ej. wizard de importación). Portado de codigo-floralis,
 * con pasos como data en vez de children clonados.
 */
export function Stepper({
  steps,
  activeStep,
  onStepClick,
  className,
}: {
  steps: StepItem[]
  activeStep: number
  /** Si se pasa, sólo los pasos ya completados son clickeables. */
  onStepClick?: (index: number) => void
  className?: string
}) {
  return (
    <ol className={cn("flex w-full items-start", className)}>
      {steps.map((step, i) => {
        const completed = i < activeStep
        const active = i === activeStep
        const clickable = !!onStepClick && completed
        return (
          <li key={step.title} className="relative flex flex-1 flex-col items-center text-center">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-4 left-[calc(50%+1.25rem)] h-0.5 w-[calc(100%-2.5rem)] bg-border transition-colors",
                  completed && "bg-primary"
                )}
              />
            )}
            <button
              type="button"
              disabled={!clickable}
              onClick={() => onStepClick?.(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors disabled:cursor-default",
                completed && "border-primary bg-primary text-primary-foreground",
                active && "border-primary text-primary",
                !completed && !active && "border-border text-muted-foreground"
              )}
            >
              {completed ? <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} className="size-4" /> : i + 1}
            </button>
            <span className={cn("mt-2 text-sm font-medium", active || completed ? "text-foreground" : "text-muted-foreground")}>
              {step.title}
            </span>
            {step.description && (
              <span className="mt-0.5 max-w-40 text-s7 text-muted-foreground">{step.description}</span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
