import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = { title: "GCBA/UI/Skeleton", component: Skeleton, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = { args: { className: "h-10 w-60" } }
