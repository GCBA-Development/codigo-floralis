import type { Meta, StoryObj } from "@storybook/react-vite"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = { title: "GCBA/UI/Separator", component: Separator, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = { render: () => <div className="w-60"><Separator /></div> }
