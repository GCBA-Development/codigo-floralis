import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"
import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Camera01Icon,
  ChartBarLineIcon,
  File01Icon,
  Home01Icon,
  Notification03Icon,
  Tree03Icon,
} from "@hugeicons/core-free-icons"

import { SidebarInset, SidebarProvider } from "@/components/layout/sidebar"
import {
  AppNavbar,
  AppNavbarAction,
  AppNavbarActions,
  AppNavbarBrand,
  AppNavbarEnd,
  AppNavbarSidebarTrigger,
  AppNavbarStart,
  AppNavbarUser,
} from "@/components/layout/app-navbar"
import { AppSidebar, AppSidebarFooter, AppSidebarGroup, AppSidebarHeader, AppSidebarItem } from "."

function DemoShell({ loading = false, initialPath = "/reclamos/12" }: { loading?: boolean; initialPath?: string }) {
  const [path, setPath] = useState(initialPath)
  return (
    <SidebarProvider className="flex-col">
      <AppNavbar>
        <AppNavbarStart>
          <AppNavbarSidebarTrigger />
          <AppNavbarBrand
            href="/"
            logo={<HugeiconsIcon icon={Tree03Icon} strokeWidth={2} className="size-8" />}
            title="GCBA"
            subtitle="Arbolado"
          />
        </AppNavbarStart>
        <AppNavbarEnd>
          <AppNavbarActions>
            <AppNavbarAction icon={Notification03Icon} label="Avisos" badge={3} />
          </AppNavbarActions>
          <AppNavbarUser name="Ana Pérez" email="ana@example.com" onLogout={fn()} />
        </AppNavbarEnd>
      </AppNavbar>
      <div className="flex flex-1">
        <AppSidebar activeHref={path} loading={loading} onNavigate={fn()}>
          <AppSidebarHeader>
            <p className="px-2 text-s6 text-sidebar-foreground/70">Comuna 4</p>
          </AppSidebarHeader>
          <AppSidebarGroup label="Módulos">
            <AppSidebarItem href="/" icon={Home01Icon} match="exact">
              Inicio
            </AppSidebarItem>
            <AppSidebarItem href="/reclamos" icon={File01Icon} badge={12}>
              Reclamos
            </AppSidebarItem>
            <AppSidebarItem href="/camaras" icon={Camera01Icon}>
              Cámaras
            </AppSidebarItem>
          </AppSidebarGroup>
          <AppSidebarGroup label="Análisis">
            <AppSidebarItem href="/reportes" icon={ChartBarLineIcon}>
              Reportes
            </AppSidebarItem>
          </AppSidebarGroup>
          <AppSidebarFooter>
            <p className="px-2 text-s7 text-sidebar-foreground/60">v0.1.0</p>
          </AppSidebarFooter>
        </AppSidebar>
        <SidebarInset>
          <div className="flex flex-col gap-3 p-6">
            <p className="text-s5">Ruta actual: {path}</p>
            <button type="button" className="w-fit rounded-md border px-3 py-1 text-s6" onClick={() => setPath("/camaras")}>
              Ir a cámaras
            </button>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

const meta: Meta<typeof DemoShell> = {
  title: "GCBA/Layout/AppShell",
  component: DemoShell,
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof DemoShell>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sidebar = canvasElement.querySelector("[data-slot=sidebar]")!
    await expect(canvas.getByRole("link", { name: /Reclamos/ })).toHaveAttribute("aria-current", "page")
    await expect(canvas.getByRole("link", { name: "Inicio" })).not.toHaveAttribute("aria-current")
    await expect(sidebar).toHaveAttribute("data-state", "expanded")
    await userEvent.click(canvas.getByRole("button", { name: "Alternar barra lateral" }))
    await waitFor(() => expect(sidebar).toHaveAttribute("data-state", "collapsed"))
  },
}

export const Cargando: Story = { args: { loading: true } }

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
}
