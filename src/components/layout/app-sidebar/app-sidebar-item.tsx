"use client"

import * as React from "react"
import { Collapsible } from "@base-ui/react/collapsible"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { AppLink } from "@/lib/app-link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/layout/sidebar"
import { AppSidebarContext, SubItemPopoverContext } from "./app-sidebar-context"
import { isAnyHrefActive, isHrefActive, type ActiveMatch } from "./is-href-active"

const CHEVRON_CLASS = "ml-auto transition-transform in-data-panel-open:rotate-90"

function useNavigateHandler() {
  const { onNavigate } = React.useContext(AppSidebarContext)
  const { closePopover } = React.useContext(SubItemPopoverContext)
  const { isMobile, setOpenMobile } = useSidebar()
  return () => {
    if (isMobile) setOpenMobile(false)
    closePopover?.()
    onNavigate?.()
  }
}

function hasBadge(badge: React.ReactNode) {
  return badge !== undefined && badge !== null
}

export interface AppSidebarSubItemProps {
  href: string
  icon?: IconSvgElement
  badge?: React.ReactNode
  /** `prefix` (default) también marca activo `/x/1` para `/x`. */
  match?: ActiveMatch
  children: React.ReactNode
}

/** Link de segundo nivel; va como hijo de `AppSidebarItem`. */
export function AppSidebarSubItem({ href, icon, badge, match = "prefix", children }: AppSidebarSubItemProps) {
  const { activeHref } = React.useContext(AppSidebarContext)
  const handleNavigate = useNavigateHandler()
  const isActive = isHrefActive(activeHref, href, match)

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        isActive={isActive}
        aria-current={isActive ? "page" : undefined}
        onClick={handleNavigate}
        render={<AppLink href={href} />}
      >
        {icon ? <HugeiconsIcon icon={icon} strokeWidth={2} /> : null}
        <span>{children}</span>
        {hasBadge(badge) ? <span className="ml-auto text-s6 tabular-nums">{badge}</span> : null}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}

export interface AppSidebarItemProps {
  /** Sin `href` y con sub-items, el padre solo expande/colapsa. */
  href?: string
  icon?: IconSvgElement
  badge?: React.ReactNode
  /** `prefix` (default) también marca activo `/x/1` para `/x`. */
  match?: ActiveMatch
  /** Solo con sub-items. Controlado: usar junto con `onOpenChange`. */
  open?: boolean
  /** Solo con sub-items. Si no se define, arranca abierto cuando algún sub-item está activo. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** El texto del item y, opcionalmente, `AppSidebarSubItem` (directos, sin wrappers ni fragments). */
  children: React.ReactNode
}

function splitChildren(children: React.ReactNode) {
  const subItems: React.ReactElement<AppSidebarSubItemProps>[] = []
  const label: React.ReactNode[] = []
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement<AppSidebarSubItemProps>(child) && child.type === AppSidebarSubItem) subItems.push(child)
    else label.push(child)
  }
  return { subItems, label }
}

interface ItemParts extends Omit<AppSidebarItemProps, "children"> {
  label: React.ReactNode[]
}

export function AppSidebarItem({ children, ...props }: AppSidebarItemProps) {
  const { subItems, label } = splitChildren(children)
  if (subItems.length === 0) return <LeafItem {...props} label={label} />
  return <ItemWithSubItems {...props} label={label} subItems={subItems} />
}

function LeafItem({ href, icon, badge, match = "prefix", label }: ItemParts) {
  const { activeHref } = React.useContext(AppSidebarContext)
  const handleNavigate = useNavigateHandler()
  if (href === undefined) return null
  const isActive = isHrefActive(activeHref, href, match)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        aria-current={isActive ? "page" : undefined}
        tooltip={typeof label[0] === "string" && label.length === 1 ? label[0] : undefined}
        onClick={handleNavigate}
        render={<AppLink href={href} />}
      >
        {icon ? <HugeiconsIcon icon={icon} strokeWidth={2} /> : null}
        <span>{label}</span>
      </SidebarMenuButton>
      {hasBadge(badge) ? <SidebarMenuBadge>{badge}</SidebarMenuBadge> : null}
    </SidebarMenuItem>
  )
}

function ItemWithSubItems({
  href,
  icon,
  badge,
  match = "prefix",
  open,
  defaultOpen,
  onOpenChange,
  label,
  subItems,
}: ItemParts & { subItems: React.ReactElement<AppSidebarSubItemProps>[] }) {
  const { activeHref } = React.useContext(AppSidebarContext)
  const { isMobile, state } = useSidebar()
  const handleNavigate = useNavigateHandler()
  const [userOpen, setUserOpen] = React.useState(defaultOpen)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const hasActiveSubItem = isAnyHrefActive(activeHref, subItems.map((item) => item.props))
  // Un solo aria-current por ruta: si un sub-item está activo, el padre no lo marca.
  const isActive = !hasActiveSubItem && href !== undefined && isHrefActive(activeHref, href, match)
  const isOpen = open ?? userOpen ?? hasActiveSubItem
  const isIconOnly = state === "collapsed" && !isMobile
  const iconNode = icon ? <HugeiconsIcon icon={icon} strokeWidth={2} /> : null

  function handleOpenChange(next: boolean) {
    setUserOpen(next)
    onOpenChange?.(next)
  }

  if (isIconOnly) {
    return (
      <SidebarMenuItem>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <SidebarMenuButton isActive={isActive || hasActiveSubItem} render={<PopoverTrigger />}>
            {iconNode}
            <span>{label}</span>
          </SidebarMenuButton>
          <PopoverContent
            side="right"
            sideOffset={12}
            showBackdrop={false}
            className="w-56 bg-sidebar p-2 text-sidebar-foreground"
            aria-label={typeof label[0] === "string" ? label[0] : undefined}
          >
            <SubItemPopoverContext.Provider value={{ closePopover: () => setIsPopoverOpen(false) }}>
              <p className="px-2 py-1 text-s7 font-semibold tracking-wide uppercase opacity-60">{label}</p>
              <ul className="flex flex-col gap-1">
                {href !== undefined ? (
                  <li>
                    <SidebarMenuSubButton
                      isActive={isActive}
                      aria-current={isActive ? "page" : undefined}
                      onClick={handleNavigate}
                      render={<AppLink href={href} />}
                    >
                      <span>{label}</span>
                    </SidebarMenuSubButton>
                  </li>
                ) : null}
                {subItems}
              </ul>
            </SubItemPopoverContext.Provider>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible.Root open={isOpen} onOpenChange={handleOpenChange}>
        {href !== undefined ? (
          <>
            <SidebarMenuButton
              isActive={isActive}
              aria-current={isActive ? "page" : undefined}
              onClick={handleNavigate}
              render={<AppLink href={href} />}
            >
              {iconNode}
              <span>{label}</span>
            </SidebarMenuButton>
            <SidebarMenuAction render={<Collapsible.Trigger />} aria-label={isOpen ? "Contraer submenú" : "Expandir submenú"}>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className={cn(CHEVRON_CLASS, "ml-0")} />
            </SidebarMenuAction>
          </>
        ) : (
          <SidebarMenuButton render={<Collapsible.Trigger />}>
            {iconNode}
            <span>{label}</span>
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className={CHEVRON_CLASS} />
          </SidebarMenuButton>
        )}
        {hasBadge(badge) ? <SidebarMenuBadge className="right-8">{badge}</SidebarMenuBadge> : null}
        <Collapsible.Panel>
          <SidebarMenuSub>{subItems}</SidebarMenuSub>
        </Collapsible.Panel>
      </Collapsible.Root>
    </SidebarMenuItem>
  )
}
