import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./input"

const meta: Meta<typeof Input> = { title: "GCBA/UI/Input", component: Input, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: "Nombre", placeholder: "Escribí tu nombre" } }
export const Disabled: Story = { args: { label: "Nombre", disabled: true, value: "Bloqueado" } }
export const HelperText: Story = { args: { label: "Email", helperText: "Usaremos este email para avisarte." } }
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
export const OnlyNumbers: Story = { args: { label: "DNI", restrict: "digits", helperText: "Solo números" } }
export const Phone: Story = { args: { label: "Teléfono", restrict: "phone", helperText: "Dígitos y +" } }
export const SentenceCase: Story = { args: { label: "Nombre", restrict: "sentenceCase", helperText: "Primera letra en mayúscula" } }
