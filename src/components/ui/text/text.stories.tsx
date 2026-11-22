import type { Meta, StoryObj } from "@storybook/react-vite"
import { Text } from "./text"

const meta: Meta<typeof Text> = {
  title: "GCBA/UI/Text",
  component: Text,
  argTypes: { variant: { control: "select", options: ["pageTitle", "header", "subtitle", "body", "label", "muted", "link", "number"] } },
  args: { children: "Texto de ejemplo" },
}
export default meta
type Story = StoryObj<typeof Text>

export const Body: Story = {}
export const PageTitle: Story = { args: { variant: "pageTitle", as: "h1" } }
export const Loading: Story = { args: { loading: true } }
