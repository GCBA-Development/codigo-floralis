import type { Meta, StoryObj } from "@storybook/react-vite"
import { KpiCard } from "./kpi-card"

const meta: Meta<typeof KpiCard> = { title: "GCBA/Dashboard/KpiCard", component: KpiCard, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof KpiCard>

export const Highlight: Story = { args: { label: "Total de intervenciones", value: 12840, variant: "highlight" } }
export const Default: Story = { args: { label: "Pendientes", value: 320 } }
export const Loading: Story = { args: { label: "Pendientes", value: 0, loading: true } }
