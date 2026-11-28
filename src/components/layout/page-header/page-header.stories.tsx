import type { Meta, StoryObj } from "@storybook/react-vite"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { PageHeader } from "./page-header"

const meta: Meta<typeof PageHeader> = { title: "GCBA/Layout/PageHeader", component: PageHeader }
export default meta
type Story = StoryObj<typeof PageHeader>

const volver = (
  <Button size="icon-sm" variant="ghost" aria-label="Volver">
    <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
  </Button>
)

const acciones = (
  <>
    <Button size="sm" variant="outline">Exportar</Button>
    <Button size="sm">Nuevo usuario</Button>
  </>
)

export const Default: Story = { args: { title: "Título de la página", subtitle: "Descripción breve de la sección" } }

export const ConStart: Story = { args: { start: volver, title: "Reclamo #1234", subtitle: "Ingresado el 12/03/2026" } }

export const ConAcciones: Story = {
  args: { title: "Gestión de usuarios", subtitle: "Alta, edición y baja de usuarios de la plataforma.", end: acciones },
}

export const Completo: Story = {
  args: { start: volver, title: "Detalle del usuario", subtitle: "Ana Pérez · ana@example.com", end: acciones },
}

export const TituloLargo: Story = {
  args: {
    start: volver,
    title: "Relevamiento integral del arbolado de alineación en la Comuna 4 con detalle de especies por cuadra",
    subtitle: "El título hace wrap prolijo y las acciones bajan en pantallas chicas.",
    end: acciones,
  },
}

export const Large: Story = { args: { size: "lg", eyebrow: "Panel general", title: "Título de la página", subtitle: "Descripción breve de la sección" } }
