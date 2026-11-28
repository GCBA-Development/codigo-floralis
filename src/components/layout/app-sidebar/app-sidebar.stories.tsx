import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent, within } from "storybook/test"
import { Camera01Icon, File01Icon, Home01Icon, Wallet01Icon } from "@hugeicons/core-free-icons"

import { SidebarInset, SidebarProvider } from "@/components/layout/sidebar"
import { AppSidebar, AppSidebarGroup, AppSidebarItem, AppSidebarNav, AppSidebarSubItem, type AppSidebarProps } from "."

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

function SubItemsSidebar({ defaultOpen = true, ...props }: Omit<AppSidebarProps, "children"> & { defaultOpen?: boolean }) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar {...props}>
        <AppSidebarGroup label="Módulos">
          <AppSidebarItem href="/reclamos" icon={File01Icon}>
            Reclamos
            <AppSidebarSubItem href="/reclamos/gestion">Gestión</AppSidebarSubItem>
            <AppSidebarSubItem href="/reclamos/estadisticas" badge={3}>Estadísticas</AppSidebarSubItem>
          </AppSidebarItem>
          <AppSidebarItem icon={Wallet01Icon}>
            Presupuesto
            <AppSidebarSubItem href="/presupuesto/corridas">Corridas</AppSidebarSubItem>
            <AppSidebarSubItem href="/presupuesto/indicadores">Indicadores</AppSidebarSubItem>
          </AppSidebarItem>
        </AppSidebarGroup>
      </AppSidebar>
      <SidebarInset className="p-4 text-s5">Contenido</SidebarInset>
    </SidebarProvider>
  )
}

export const ConSubItems: StoryObj<typeof SubItemsSidebar> = {
  render: (args) => <SubItemsSidebar {...args} />,
  args: { activeHref: "/presupuesto/indicadores" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Un sub-item activo expande su padre sin intervención.
    const presupuesto = canvas.getByRole("button", { name: /Presupuesto/ })
    await expect(presupuesto).toHaveAttribute("aria-expanded", "true")
    await expect(presupuesto).toHaveAttribute("aria-controls")
    await expect(canvas.getByRole("link", { name: "Indicadores" })).toHaveAttribute("aria-current", "page")
    // Padre sin href: solo alterna.
    await userEvent.click(presupuesto)
    await expect(presupuesto).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.queryByRole("link", { name: "Corridas" })).not.toBeInTheDocument()
    // Padre con href: sigue siendo link y el chevron es un botón aparte.
    await expect(canvas.getByRole("link", { name: "Reclamos" })).toHaveAttribute("href", "/reclamos")
    await expect(canvas.getByRole("button", { name: "Expandir submenú" })).toHaveAttribute("aria-expanded", "false")
  },
}

export const SubItemsColapsado: StoryObj<typeof SubItemsSidebar> = {
  render: (args) => <SubItemsSidebar {...args} />,
  args: { activeHref: "/presupuesto/corridas", collapsible: "icon", defaultOpen: false },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: /Presupuesto/ })
    await userEvent.click(trigger)
    // El popover se renderiza en un portal, fuera del canvas.
    await expect(await screen.findByRole("link", { name: "Corridas" })).toHaveAttribute("aria-current", "page")
    await expect(screen.getByRole("link", { name: "Indicadores" })).not.toHaveAttribute("aria-current")
  },
}

function NavSidebar(props: Omit<AppSidebarProps, "children">) {
  return (
    <SidebarProvider>
      <AppSidebar {...props}>
        <AppSidebarNav
          groups={[
            {
              label: "Módulos",
              items: [
                { title: "Inicio", href: "/", icon: Home01Icon, match: "exact" },
                {
                  title: "Reclamos",
                  href: "/reclamos",
                  icon: File01Icon,
                  badge: 12,
                  children: [
                    { title: "Pendientes", href: "/reclamos/pendientes" },
                    { title: "Nuevo", href: "/reclamos/nuevo" },
                  ],
                },
                { title: "Cámaras", href: "/camaras", icon: Camera01Icon },
              ],
            },
          ]}
        />
      </AppSidebar>
      <SidebarInset />
    </SidebarProvider>
  )
}

export const ConNav: StoryObj<typeof NavSidebar> = {
  render: (args) => <NavSidebar {...args} />,
  args: { activeHref: "/reclamos/nuevo" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("link", { name: "Nuevo" })).toHaveAttribute("aria-current", "page")
    await expect(canvas.getByRole("link", { name: /Reclamos/ })).not.toHaveAttribute("aria-current")
  },
}
