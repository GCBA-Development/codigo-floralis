import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { Input } from "./input"

const meta: Meta<typeof Input> = { title: "GCBA/UI/Input", component: Input, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: "Nombre", placeholder: "Escribí tu nombre" } }
export const Disabled: Story = { args: { label: "Nombre", disabled: true, value: "Bloqueado" } }
export const HelperText: Story = { args: { label: "Email", description: "Usaremos este email para avisarte." } }
export const WithError: Story = { args: { label: "Email", error: "Ingresá un email válido", defaultValue: "foo" } }
export const InvalidWithoutMessage: Story = { args: { label: "Email", error: true } }
export const WithStartIcon: Story = {
  args: {
    label: "Buscar",
    startIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
}
export const OnlyNumbers: Story = {
  args: { label: "DNI", restrict: "digits", description: "Solo números" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("DNI")
    await userEvent.type(input, "12a-3 4")
    await expect(input).toHaveValue("1234")
  },
}
export const Phone: Story = {
  args: { label: "Teléfono", restrict: "phone", description: "Dígitos y +" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("Teléfono")
    await userEvent.type(input, "+54 (11) 4444")
    await expect(input).toHaveValue("+54114444")
  },
}
export const SentenceCase: Story = {
  args: { label: "Nombre", restrict: "sentenceCase", description: "Primera letra en mayúscula" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("Nombre")
    await userEvent.type(input, "hola mundo")
    await expect(input).toHaveValue("Hola mundo")
  },
}
