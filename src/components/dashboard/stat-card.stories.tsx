import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatCard } from "./stat-card"

const meta: Meta<typeof StatCard> = { title: "GCBA/Dashboard/StatCard", component: StatCard, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof StatCard>

export const Featured: Story = { args: { label: "Inversión", value: "$1.250 M", subtitle: "Acumulado anual", featured: true } }
export const Default: Story = { args: { label: "Avance", value: "72%", subtitle: "Sobre lo planificado" } }
