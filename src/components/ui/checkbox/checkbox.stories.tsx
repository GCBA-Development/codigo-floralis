import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = { title: "GCBA/UI/Checkbox", component: Checkbox }
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = { args: { "aria-label": "Aceptar" } }
export const Checked: Story = { args: { defaultChecked: true, "aria-label": "Aceptar" } }
export const Disabled: Story = { args: { disabled: true, "aria-label": "Aceptar" } }
