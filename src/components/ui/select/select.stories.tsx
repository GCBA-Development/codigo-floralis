import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"
import { MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

const meta: Meta<typeof Select> = { title: "GCBA/UI/Select", component: Select }
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select defaultValue="1">
      <SelectTrigger label="Comuna" className="w-60">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Comuna 1</SelectItem>
        <SelectItem value="2">Comuna 2</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox", { name: /Comuna/ })
    await userEvent.click(trigger)
    await userEvent.click(await screen.findByRole("option", { name: "Comuna 2" }))
    await waitFor(() => expect(trigger).toHaveTextContent("Comuna 2"))
  },
}

export const Keyboard: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox", { name: /Comuna/ })
    trigger.focus()
    await userEvent.keyboard("{Enter}")
    await screen.findByRole("listbox")
    await userEvent.keyboard("{ArrowDown}{Enter}")
    await waitFor(() => expect(trigger).toHaveTextContent("Comuna 2"))
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}

export const WithError: Story = {
  render: () => (
    <Select>
      <SelectTrigger label="Comuna" error="Elegí una comuna" className="w-60">
        <SelectValue placeholder="Seleccionar..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Comuna 1</SelectItem>
        <SelectItem value="2">Comuna 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}

const COMUNAS = Array.from({ length: 5 }, (_, index) => ({ value: String(index + 1), label: `Comuna ${index + 1}` }))

function MultiSelectDemo({ withSelectAll = true, error }: { withSelectAll?: boolean; error?: string }) {
  const [value, setValue] = useState<string[]>(["1", "2"])
  return (
    <div className="w-60">
      <MultiSelect
        label="Comunas"
        options={COMUNAS}
        value={value}
        onValueChange={setValue}
        error={error}
        selectAllLabel={withSelectAll ? "Seleccionar todo" : null}
      />
    </div>
  )
}

export const Multiple: Story = {
  render: () => <MultiSelectDemo />,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox", { name: /Comunas/ })
    await expect(trigger).toHaveTextContent("2 seleccionados")
    await userEvent.click(trigger)
    await userEvent.click(await screen.findByRole("option", { name: "Seleccionar todo" }))
    await waitFor(() => expect(trigger).toHaveTextContent("5 seleccionados"))
    await userEvent.click(screen.getByRole("option", { name: "Seleccionar todo" }))
    await waitFor(() => expect(trigger).toHaveTextContent("Seleccionar..."))
    await userEvent.click(screen.getByRole("option", { name: "Comuna 3" }))
    await waitFor(() => expect(trigger).toHaveTextContent("Comuna 3"))
  },
}
export const MultipleWithoutSelectAll: Story = { render: () => <MultiSelectDemo withSelectAll={false} /> }
export const MultipleWithError: Story = { render: () => <MultiSelectDemo error="Elegí al menos una" /> }
