import type { Meta, StoryObj } from "@storybook/react-vite"
import { Chip } from "./chip"

const meta: Meta<typeof Chip> = { title: "GCBA/UI/Chip", component: Chip, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = { args: { label: "Comuna 1", onRemove: () => {} } }
