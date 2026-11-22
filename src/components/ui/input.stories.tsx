import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./input"

const meta: Meta<typeof Input> = { title: "GCBA/UI/Input", component: Input, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: "Nombre", placeholder: "Escribí tu nombre" } }
export const Disabled: Story = { args: { label: "Nombre", disabled: true, value: "Bloqueado" } }
