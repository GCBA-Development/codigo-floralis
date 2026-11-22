import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Camera01Icon, File01Icon, Home01Icon } from "@hugeicons/core-free-icons"

import { SidebarInset, SidebarProvider } from "@/components/layout/sidebar"
import { AppSidebar, AppSidebarGroup, AppSidebarItem, type AppSidebarProps } from "."

function DemoSidebar(props: Omit<AppSidebarProps, "children">) {
  return (
    <SidebarProvider>
      <AppSidebar {...props}>
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
      </AppSidebar>
      <SidebarInset className="p-4 text-s5">Contenido</SidebarInset>
    </SidebarProvider>
  )
}

const meta: Meta<typeof DemoSidebar> = {
  title: "GCBA/Layout/AppSidebar",
  component: DemoSidebar,
  parameters: { layout: "fullscreen" },
}
export default meta
type Story = StoryObj<typeof DemoSidebar>

export const ItemActivo: Story = {
  args: { activeHref: "/reclamos/12" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: /Reclamos/ })).toHaveAttribute("aria-current", "page")
    await expect(canvas.getByRole("link", { name: "Inicio" })).not.toHaveAttribute("aria-current")
  },
}

export const Cargando: Story = { args: { loading: true } }
