import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "GCBA/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "tertiary", "outline", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["md", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"] },
  },
  args: { children: "Guardar" },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: "secondary" } }
export const Destructive: Story = { args: { variant: "destructive", children: "Eliminar" } }
export const Disabled: Story = { args: { disabled: true } }
