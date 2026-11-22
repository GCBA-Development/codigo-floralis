"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { LinkComponentContext, type LinkComponent } from "@/lib/link-component"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/layout/sidebar"
import { AppSidebarContext } from "./app-sidebar-context"

const MIN_SKELETON_ROWS = 3
// Anchos fijos (no random): el sidebar puede renderizarse en SSR y un random rompería la hidratación.
const SKELETON_WIDTHS = ["w-20", "w-32", "w-24", "w-16", "w-28"]

export interface AppSidebarProps extends React.ComponentProps<"div"> {
  /** `icon` colapsa a solo íconos; los items con sub-items abren un popover. */
  collapsible?: "offcanvas" | "icon" | "none"
  linkComponent?: LinkComponent
  /** Ruta actual (ej. `usePathname()`); define qué item queda con `aria-current="page"`. */
  activeHref?: string
  /** Se llama al navegar, además de cerrar el panel en mobile. */
  onNavigate?: () => void
  loading?: boolean
}

export function AppSidebar({
  linkComponent = "a",
  activeHref,
  onNavigate,
  loading = false,
  className,
  children,
  ...props
}: AppSidebarProps) {
  const value = React.useMemo(() => ({ activeHref, loading, onNavigate }), [activeHref, loading, onNavigate])
  return (
    <LinkComponentContext.Provider value={linkComponent}>
      <AppSidebarContext.Provider value={value}>
        <Sidebar className={cn("top-14! h-[calc(100svh-3.5rem)]!", className)} {...props}>
          <SidebarContent className="pt-2">{children}</SidebarContent>
        </Sidebar>
      </AppSidebarContext.Provider>
    </LinkComponentContext.Provider>
  )
}

// Header y footer viven dentro del único contenedor con scroll: quedan fijos con sticky.
export function AppSidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <SidebarHeader className={cn("sticky top-0 z-10 bg-sidebar", className)} {...props} />
}

export function AppSidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <SidebarFooter className={cn("sticky bottom-0 z-10 mt-auto bg-sidebar", className)} {...props} />
}

function GroupSkeleton({ rows }: { rows: number }) {
  return (
    <SidebarGroup aria-hidden="true">
      <div className="flex h-8 items-center px-2">
        <Skeleton className="h-3 w-16 bg-sidebar-foreground/15" />
      </div>
      <SidebarMenu>
        {Array.from({ length: rows }, (_, index) => (
          <SidebarMenuItem key={index}>
            <div className="flex h-8 items-center gap-2 rounded-md px-2">
              <Skeleton className="size-4 shrink-0 bg-sidebar-foreground/15" />
              <Skeleton className={cn("h-4 bg-sidebar-foreground/15", SKELETON_WIDTHS[index % SKELETON_WIDTHS.length])} />
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export interface AppSidebarGroupProps {
  label?: string
  children: React.ReactNode
}

export function AppSidebarGroup({ label, children }: AppSidebarGroupProps) {
  const { loading } = React.useContext(AppSidebarContext)
  if (loading) return <GroupSkeleton rows={Math.max(React.Children.count(children), MIN_SKELETON_ROWS)} />

  return (
    <SidebarGroup>
      {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
      <SidebarGroupContent>
        <SidebarMenu>{children}</SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
