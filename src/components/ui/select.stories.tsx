import type { Meta, StoryObj } from "@storybook/react-vite"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

const meta: Meta<typeof Select> = { title: "GCBA/UI/Select", component: Select, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select defaultValue="1">
      <SelectTrigger label="Comuna" className="w-60">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Comuna 1</SelectItem>
        <SelectItem value="2">Comuna 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}
