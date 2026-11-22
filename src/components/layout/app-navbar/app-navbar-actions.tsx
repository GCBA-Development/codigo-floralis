"use client"

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { AppLink } from "@/lib/app-link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { formatBadgeCount } from "./format-badge-count"

const ACTION_CLASS =
  "relative flex size-9 items-center justify-center rounded-md text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-foreground/10 focus-visible:ring-2 focus-visible:ring-sidebar-ring aria-expanded:bg-sidebar-foreground/10"

export function AppNavbarActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="app-navbar-actions" className={cn("flex items-center gap-1", className)} {...props} />
}

export interface AppNavbarActionProps {
  icon: IconSvgElement
  /** Obligatorio: es el nombre accesible y el texto del tooltip. */
  label: string
  /** Contador; con `0` o sin valor no se muestra. */
  badge?: number
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
}

export function AppNavbarAction({ icon, label, badge, href, onClick, className }: AppNavbarActionProps) {
  const hasBadge = badge !== undefined && badge > 0
  const badgeText = hasBadge ? formatBadgeCount(badge) : null
  const accessibleName = badgeText ? `${label}: ${badgeText}` : label
  const content = (
    <>
      <HugeiconsIcon icon={icon} strokeWidth={2} className="size-5" />
      {badgeText ? (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-s7 font-bold leading-none text-white tabular-nums"
        >
          {badgeText}
        </span>
      ) : null}
    </>
  )
  const classes = cn(ACTION_CLASS, className)

  const trigger = href ? (
    <AppLink href={href} aria-label={accessibleName} onClick={onClick} className={classes}>
      {content}
    </AppLink>
  ) : (
    <button type="button" aria-label={accessibleName} onClick={onClick} className={classes}>
      {content}
    </button>
  )

  return (
    <Tooltip>
      <TooltipTrigger render={trigger} />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
