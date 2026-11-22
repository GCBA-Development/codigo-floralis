import type { Meta, StoryObj } from "@storybook/react-vite"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta: Meta<typeof RadioGroup> = { title: "GCBA/UI/RadioGroup", component: RadioGroup }
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a" aria-label="Opciones">
      <label className="flex items-center gap-2 text-s5"><RadioGroupItem value="a" /> Opción A</label>
      <label className="flex items-center gap-2 text-s5"><RadioGroupItem value="b" /> Opción B</label>
    </RadioGroup>
  ),
}
