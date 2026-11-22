import type { Meta, StoryObj } from "@storybook/react-vite"
import { KpiCard } from "./kpi-card"

const meta: Meta<typeof KpiCard> = { title: "GCBA/Data/KpiCard", component: KpiCard }
export default meta
type Story = StoryObj<typeof KpiCard>

export const Primary: Story = { args: { label: "Total de intervenciones", value: 12840, variant: "primary" } }
export const Secondary: Story = { args: { label: "Pendientes", value: 320 } }
export const Loading: Story = { args: { label: "Pendientes", value: 0, loading: true } }
