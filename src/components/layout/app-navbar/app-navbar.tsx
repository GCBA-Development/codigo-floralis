"use client"

import { cn } from "@/lib/utils"
import { LinkComponentContext, type LinkComponent } from "@/lib/link-component"
import { AppLink } from "@/lib/app-link"
import { SidebarTrigger } from "@/components/layout/sidebar"

/** Altura de la barra; `AppSidebar` la usa para ubicarse debajo. */
export const APP_NAVBAR_HEIGHT_CLASS = "h-14"

export interface AppNavbarProps extends React.ComponentProps<"header"> {
  /** Componente para los links internos (ej. `next/link`). Default `"a"`. */
  linkComponent?: LinkComponent
}

export function AppNavbar({ linkComponent = "a", className, children, ...props }: AppNavbarProps) {
  return (
    <LinkComponentContext.Provider value={linkComponent}>
      <header
        data-slot="app-navbar"
        className={cn(
          "sticky top-0 z-30 flex shrink-0 items-center gap-2 border-b border-sidebar-border bg-sidebar px-3 text-sidebar-foreground",
          APP_NAVBAR_HEIGHT_CLASS,
          className
        )}
        {...props}
      >
        {children}
      </header>
    </LinkComponentContext.Provider>
  )
}

export function AppNavbarStart({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="app-navbar-start" className={cn("flex min-w-0 items-center gap-2", className)} {...props} />
}

export function AppNavbarEnd({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="app-navbar-end" className={cn("ml-auto flex items-center gap-1", className)} {...props} />
}

export function AppNavbarSidebarTrigger({ className, ...props }: React.ComponentProps<typeof SidebarTrigger>) {
  return (
    <SidebarTrigger
      className={cn("text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground", className)}
      {...props}
    />
  )
}

export interface AppNavbarBrandProps {
  href: string
  className?: string
  logo?: React.ReactNode
  title: string
  subtitle?: string
}

export function AppNavbarBrand({ href, logo, title, subtitle, className }: AppNavbarBrandProps) {
  return (
    <AppLink
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-1 py-1 outline-none transition-colors hover:bg-sidebar-foreground/10 focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
    >
      {logo}
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="text-s4 font-bold text-sidebar-foreground">{title}</span>
        {subtitle ? <span className="text-s5 font-normal text-sidebar-foreground/70">{subtitle}</span> : null}
      </span>
    </AppLink>
  )
}
