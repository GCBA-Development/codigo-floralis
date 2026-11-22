import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldError, FieldLabel, FormField } from "./field"

const meta: Meta<typeof FormField> = {
  title: "GCBA/UI/Field",
  component: FormField,
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  args: { label: "Nombre", description: "Como figura en el DNI." },
  render: (args) => (
    <FormField {...args}>
      <Input />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("Nombre")
    await expect(input).toHaveAccessibleDescription("Como figura en el DNI.")
  },
}

export const ConError: Story = {
  args: { label: "Email", error: "Ingresá un email válido", required: true },
  render: (args) => (
    <FormField {...args}>
      <Input defaultValue="foo" />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox")
    await expect(input).toBeInvalid()
    await expect(input).toHaveAccessibleDescription("Ingresá un email válido")
  },
}

export const ConTextarea: Story = {
  args: { label: "Observaciones", description: "Opcional." },
  render: (args) => (
    <FormField {...args}>
      <Textarea />
    </FormField>
  ),
}

export const ConSelect: Story = {
  args: { label: "Comuna", error: true },
  render: (args) => (
    <FormField {...args}>
      <Select defaultValue="1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Comuna 1</SelectItem>
          <SelectItem value="2">Comuna 2</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  ),
}

export const Compuesto: Story = {
  render: () => (
    <Field>
      <FieldLabel>Teléfono</FieldLabel>
      <Input type="tel" restrict="phone" />
      <FieldDescription>Solo dígitos y +.</FieldDescription>
      <FieldError match>Número demasiado corto</FieldError>
    </Field>
  ),
}
