"use client"

import { cn } from "@/lib/utils"
import { SidebarInset, SidebarProvider } from "@/components/layout/sidebar"

export interface AppShellProps {
  /** Normalmente un `AppNavbar`: cruza todo el ancho arriba. */
  navbar: React.ReactNode
  /** Normalmente un `AppSidebar`: arranca debajo del navbar. */
  sidebar: React.ReactNode
  children: React.ReactNode
  /** Clases extra para el `SidebarProvider` (wrapper raíz). */
  className?: string
  /** Clases extra para el contenedor del contenido (default `p-4`). */
  contentClassName?: string
}

/** Layout en "T" de las apps: navbar arriba, sidebar debajo a la izquierda y el contenido a la derecha. */
export function AppShell({ navbar, sidebar, children, className, contentClassName }: AppShellProps) {
  return (
    <SidebarProvider className={cn("flex-col", className)}>
      {/* `contents` no genera caja: el navbar sticky y el sidebar fixed se comportan igual en pantalla. */}
      <div className="contents print:hidden">{navbar}</div>
      <div className="flex flex-1">
        <div className="contents print:hidden">{sidebar}</div>
        {/* overflow-x-clip: ningún contenido ensancha la página en el celular (clip no rompe sticky ni crea scroll). */}
        <SidebarInset className="overflow-x-clip">
          <div className={cn("flex flex-1 flex-col p-4", contentClassName)}>{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
