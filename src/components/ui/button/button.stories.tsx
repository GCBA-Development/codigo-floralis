import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "GCBA/UI/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "tertiary", "outline", "ghost", "destructive", "cta", "link"] },
    size: { control: "select", options: ["md", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"] },
  },
  args: { children: "Guardar" },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: "secondary" } }
export const Cta: Story = { args: { variant: "cta", children: "Empezar" } }
export const Destructive: Story = { args: { variant: "destructive", children: "Eliminar" } }
export const Disabled: Story = { args: { disabled: true } }
