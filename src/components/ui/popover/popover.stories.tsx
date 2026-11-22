import type { Meta, StoryObj } from "@storybook/react-vite"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Popover> = { title: "GCBA/UI/Popover", component: Popover }
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Abrir</PopoverTrigger>
      <PopoverContent>Contenido del popover</PopoverContent>
    </Popover>
  ),
}
