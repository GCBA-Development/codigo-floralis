import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = { title: "GCBA/UI/Textarea", component: Textarea }
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { placeholder: "Observaciones", "aria-label": "Observaciones" } }
