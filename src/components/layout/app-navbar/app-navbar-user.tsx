"use client"

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { ArrowDown01Icon, Logout01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { AppLink } from "@/lib/app-link"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { getInitials } from "./get-initials"

const ITEM_CLASS =
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-s6 text-foreground outline-none transition-colors hover:bg-muted focus-visible:bg-muted"

function UserAvatar({ name, avatar }: { name: string; avatar?: string }) {
  if (avatar) {
    return <img src={avatar} alt="" className="size-8 shrink-0 rounded-full object-cover" />
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-s7 font-bold text-sidebar-accent-foreground"
    >
      {getInitials(name)}
    </span>
  )
}

export interface AppNavbarUserProps {
  name: string
  email?: string
  /** URL de la imagen; sin ella se muestran las iniciales. */
  avatar?: string
  loading?: boolean
  onLogout?: () => void
  logoutLabel?: string
  /** Nombre accesible del botón que abre el menú. */
  menuLabel?: string
  children?: React.ReactNode
}

export function AppNavbarUser({
  name,
  email,
  avatar,
  loading = false,
  onLogout,
  logoutLabel = "Cerrar sesión",
  menuLabel = "Menú de usuario",
  children,
}: AppNavbarUserProps) {
  if (loading) {
    return (
      <div role="status" className="flex h-9 items-center gap-2 px-1.5">
        <span className="sr-only">Cargando usuario</span>
        <Skeleton aria-hidden="true" className="size-8 rounded-full bg-sidebar-foreground/15" />
        <Skeleton aria-hidden="true" className="hidden h-3.5 w-24 bg-sidebar-foreground/15 sm:block" />
      </div>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label={menuLabel}
            className="flex h-9 items-center gap-2 rounded-md px-1.5 outline-none transition-colors hover:bg-sidebar-foreground/10 focus-visible:ring-2 focus-visible:ring-sidebar-ring aria-expanded:bg-sidebar-foreground/10"
          >
            <UserAvatar name={name} avatar={avatar} />
            <span className="hidden max-w-36 truncate text-s6 font-medium text-sidebar-foreground sm:block">{name}</span>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className="hidden size-4 shrink-0 text-sidebar-foreground/70 sm:block"
            />
          </button>
        }
      />
      <PopoverContent align="end" showBackdrop={false} className="w-64 p-0">
        <div className="flex flex-col gap-0.5 border-b border-border px-4 py-3">
          <span className="truncate text-s5 font-bold text-foreground">{name}</span>
          {email ? <span className="truncate text-s6 text-muted-foreground">{email}</span> : null}
        </div>
        <div className="flex flex-col p-1">
          {children}
          {onLogout ? (
            <>
              {children ? <div role="separator" className="-mx-1 my-1 h-px bg-border" /> : null}
              <PopoverClose
                render={
                  <button
                    type="button"
                    onClick={onLogout}
                    className={cn(ITEM_CLASS, "text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10")}
                  >
                    <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} className="size-4" />
                    {logoutLabel}
                  </button>
                }
              />
            </>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export interface AppNavbarUserItemProps {
  icon?: IconSvgElement
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  children: React.ReactNode
}

export function AppNavbarUserItem({ icon, href, onClick, children }: AppNavbarUserItemProps) {
  const content = (
    <>
      {icon ? <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4 text-muted-foreground" /> : null}
      {children}
    </>
  )
  return (
    <PopoverClose
      render={
        href ? (
          <AppLink href={href} onClick={onClick} className={ITEM_CLASS}>
            {content}
          </AppLink>
        ) : (
          <button type="button" onClick={onClick} className={ITEM_CLASS}>
            {content}
          </button>
        )
      }
    />
  )
}
