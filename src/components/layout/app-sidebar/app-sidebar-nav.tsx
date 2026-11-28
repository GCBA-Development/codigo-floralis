"use client"

import * as React from "react"
import type { IconSvgElement } from "@hugeicons/react"

import { AppSidebarGroup } from "./app-sidebar"
import { AppSidebarContext } from "./app-sidebar-context"
import { AppSidebarItem, AppSidebarSubItem } from "./app-sidebar-item"
import type { ActiveMatch } from "./is-href-active"

export interface AppSidebarNavSubItem {
  title: string
  href: string
  match?: ActiveMatch
}

export interface AppSidebarNavItem {
  title: string
  href: string
  icon?: IconSvgElement
  badge?: React.ReactNode
  match?: ActiveMatch
  children?: readonly AppSidebarNavSubItem[]
}

export interface AppSidebarNavGroup {
  label: string
  items: readonly AppSidebarNavItem[]
}

export interface AppSidebarNavProps {
  groups: readonly AppSidebarNavGroup[]
  /** Pisa el `loading` de `AppSidebar` (muestra el skeleton de cada grupo). */
  loading?: boolean
}

/** Renderiza la navegación del sidebar a partir de datos. Va dentro de `AppSidebar`. */
export function AppSidebarNav({ groups, loading }: AppSidebarNavProps) {
  const context = React.useContext(AppSidebarContext)
  const value = React.useMemo(() => ({ ...context, loading: loading ?? context.loading }), [context, loading])

  return (
    <AppSidebarContext.Provider value={value}>
      {groups.map((group) => (
        <AppSidebarGroup key={group.label} label={group.label}>
          {group.items.map((item) => (
            <AppSidebarItem key={item.href} href={item.href} icon={item.icon} badge={item.badge} match={item.match}>
              {item.title}
              {item.children?.map((child) => (
                <AppSidebarSubItem key={child.href} href={child.href} match={child.match}>
                  {child.title}
                </AppSidebarSubItem>
              ))}
            </AppSidebarItem>
          ))}
        </AppSidebarGroup>
      ))}
    </AppSidebarContext.Provider>
  )
}
