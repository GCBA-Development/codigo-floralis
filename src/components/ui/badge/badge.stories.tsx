import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./badge"

const VARIANTS = ["primary", "secondary", "destructive", "outline", "soft", "success", "warning"] as const
const SIZES = ["sm", "md", "lg"] as const

const meta: Meta<typeof Badge> = {
  title: "GCBA/UI/Badge",
  component: Badge,
  args: { children: "Etiqueta" },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>{variant}</Badge>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {SIZES.map((size) => (
        <Badge key={size} size={size}>{size}</Badge>
      ))}
    </div>
  ),
}

export const AllCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-2">
          {VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant} size={size}>{variant}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}
