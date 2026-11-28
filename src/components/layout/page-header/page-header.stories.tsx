import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/components/ui/button"
import { PageHeader } from "./page-header"

const meta: Meta<typeof PageHeader> = { title: "GCBA/Layout/PageHeader", component: PageHeader }
export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = { args: { title: "Título de la página", subtitle: "Descripción breve de la sección" } }

export const ConAcciones: Story = {
  args: {
    title: "Gestión de usuarios",
    subtitle: "Alta, edición y baja de usuarios de la plataforma.",
    actions: (
      <>
        <Button size="sm" variant="outline">Exportar</Button>
        <Button size="sm">Nuevo usuario</Button>
      </>
    ),
  },
}

export const Large: Story = { args: { size: "large", eyebrow: "Panel general", title: "Título de la página", subtitle: "Descripción breve de la sección" } }
