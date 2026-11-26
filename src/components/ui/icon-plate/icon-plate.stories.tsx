import type { Meta, StoryObj } from "@storybook/react-vite"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { IconPlate } from "./icon-plate"

const meta: Meta<typeof IconPlate> = {
  title: "GCBA/UI/IconPlate",
  component: IconPlate,
  argTypes: {
    variant: { control: "select", options: ["blue", "navy"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { children: <HugeiconsIcon icon={Cancel01Icon} /> },
}
export default meta
type Story = StoryObj<typeof IconPlate>

export const Default: Story = {}
export const Navy: Story = { args: { variant: "navy" } }

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <IconPlate key={size} {...args} size={size} />
      ))}
    </div>
  ),
}
