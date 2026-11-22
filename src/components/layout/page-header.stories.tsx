import type { Meta, StoryObj } from "@storybook/react-vite"
import { PageHeader } from "./page-header"

const meta: Meta<typeof PageHeader> = { title: "GCBA/Layout/PageHeader", component: PageHeader, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = { args: { eyebrow: "Panel general", title: "Título de la página", subtitle: "Descripción breve de la sección" } }
