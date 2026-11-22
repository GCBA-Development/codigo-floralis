import type { Meta, StoryObj } from "@storybook/react-vite"
import { SimpleBarChart } from "./simple-bar-chart"

const meta: Meta<typeof SimpleBarChart> = { title: "GCBA/Data/SimpleBarChart", component: SimpleBarChart, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof SimpleBarChart>

export const Default: Story = {
  args: { data: [{ label: "Poda", value: 120 }, { label: "Extracción", value: 80 }, { label: "Plantación", value: 45 }] },
  render: (args) => <div className="w-[480px]"><SimpleBarChart {...args} /></div>,
}
