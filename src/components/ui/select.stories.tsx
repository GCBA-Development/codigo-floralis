import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

const meta: Meta<typeof Select> = { title: "GCBA/UI/Select", component: Select, tags: ["autodocs"] }
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

export const Multiple: Story = { render: () => <MultiSelectDemo /> }
export const MultipleWithoutSelectAll: Story = { render: () => <MultiSelectDemo withSelectAll={false} /> }
export const MultipleWithError: Story = { render: () => <MultiSelectDemo error="Elegí al menos una" /> }
