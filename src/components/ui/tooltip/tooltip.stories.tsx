import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Tooltip> = { title: "GCBA/UI/Tooltip", component: Tooltip }
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Pasá el mouse</TooltipTrigger>
        <TooltipContent>Ayuda contextual</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
