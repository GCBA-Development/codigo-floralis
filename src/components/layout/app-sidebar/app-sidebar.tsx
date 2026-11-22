"use client"

import * as React from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { LinkComponentContext, type LinkComponent } from "@/lib/link-component"
import { AppLink } from "@/lib/app-link"
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/layout/sidebar"
import { isHrefActive, type ActiveMatch } from "./is-href-active"

const MIN_SKELETON_ROWS = 3
// Anchos fijos (no random): el sidebar puede renderizarse en SSR y un random rompería la hidratación.
const SKELETON_WIDTHS = ["w-20", "w-32", "w-24", "w-16", "w-28"]

interface AppSidebarContextValue {
  activeHref?: string
  loading: boolean
  onNavigate?: () => void
}

const AppSidebarContext = React.createContext<AppSidebarContextValue>({ loading: false })

export interface AppSidebarProps extends React.ComponentProps<"div"> {
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

export interface AppSidebarItemProps {
  href: string
  icon?: IconSvgElement
  badge?: React.ReactNode
  /** `prefix` (default) también marca activo `/x/1` para `/x`. */
  match?: ActiveMatch
  children: React.ReactNode
}

export function AppSidebarItem({ href, icon, badge, match = "prefix", children }: AppSidebarItemProps) {
  const { activeHref, onNavigate } = React.useContext(AppSidebarContext)
  const { isMobile, setOpenMobile } = useSidebar()
  const isActive = isHrefActive(activeHref, href, match)

  function handleClick() {
    if (isMobile) setOpenMobile(false)
    onNavigate?.()
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        aria-current={isActive ? "page" : undefined}
        tooltip={typeof children === "string" ? children : undefined}
        onClick={handleClick}
        render={<AppLink href={href} />}
      >
        {icon ? <HugeiconsIcon icon={icon} strokeWidth={2} /> : null}
        <span>{children}</span>
      </SidebarMenuButton>
      {badge !== undefined && badge !== null ? <SidebarMenuBadge>{badge}</SidebarMenuBadge> : null}
    </SidebarMenuItem>
  )
}
