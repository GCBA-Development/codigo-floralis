import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"
import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Camera01Icon,
  ChartBarLineIcon,
  File01Icon,
  Home01Icon,
  Notification03Icon,
  Tree03Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
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
import { AppSidebar, AppSidebarFooter, AppSidebarHeader, AppSidebarNav, type AppSidebarNavGroup } from "@/components/layout/app-sidebar"
import { AppShell } from "./app-shell"

const groups: AppSidebarNavGroup[] = [
  {
    label: "Módulos",
    items: [
      { title: "Inicio", href: "/", icon: Home01Icon, match: "exact" },
      { title: "Reclamos", href: "/reclamos", icon: File01Icon, badge: 12 },
      { title: "Cámaras", href: "/camaras", icon: Camera01Icon },
    ],
  },
  { label: "Análisis", items: [{ title: "Reportes", href: "/reportes", icon: ChartBarLineIcon }] },
]

function DemoShell({ loading = false, initialPath = "/reclamos/12" }: { loading?: boolean; initialPath?: string }) {
  const [path, setPath] = useState(initialPath)
  return (
    <AppShell
      navbar={
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
      }
      sidebar={
        <AppSidebar activeHref={path} loading={loading} onNavigate={fn()}>
          <AppSidebarHeader>
            <p className="px-2 text-s6 text-sidebar-foreground/70">Comuna 4</p>
          </AppSidebarHeader>
          <AppSidebarNav groups={groups} />
          <AppSidebarFooter>
            <p className="px-2 text-s7 text-sidebar-foreground/60">v0.1.0</p>
          </AppSidebarFooter>
        </AppSidebar>
      }
    >
      <PageHeader
        start={
          <Button size="icon-sm" variant="ghost" aria-label="Volver">
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
          </Button>
        }
        title="Reclamo #12"
        subtitle={`Ruta actual: ${path}`}
        end={
          <Button size="sm" variant="outline" onClick={() => setPath("/camaras")}>
            Ir a cámaras
          </Button>
        }
      />
    </AppShell>
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
