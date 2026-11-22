"use client"

import { ThemeProvider, type ThemeProviderProps } from "next-themes"

import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"

export interface FloralisProviderProps {
  children: React.ReactNode
  /** Sobrescribe la configuración de next-themes (ej. `storageKey`, `defaultTheme`). */
  theme?: Partial<ThemeProviderProps>
  /** `false` si la app monta su propio `<Toaster />`. */
  toaster?: boolean
  /** Demora (ms) de los tooltips. */
  tooltipDelay?: number
}

/** Provider raíz: tema claro/oscuro (next-themes), tooltips y toasts. Va una vez en el layout. */
export function FloralisProvider({ children, theme, toaster = true, tooltipDelay }: FloralisProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...theme}>
      <TooltipProvider delay={tooltipDelay}>
        {children}
        {toaster ? <Toaster /> : null}
      </TooltipProvider>
    </ThemeProvider>
  )
}
