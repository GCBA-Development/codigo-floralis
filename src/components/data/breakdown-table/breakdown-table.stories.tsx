import type { Meta, StoryObj } from "@storybook/react-vite"
import { BreakdownTable } from "./breakdown-table"

const meta: Meta<typeof BreakdownTable> = { title: "GCBA/Data/BreakdownTable", component: BreakdownTable, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof BreakdownTable>

export const Default: Story = {
  args: { labelHeader: "Solicitud", limit: 5, items: [{ label: "Poda", value: 120 }, { label: "Extracción", value: 80 }, { label: "Plantación", value: 45 }] },
}
