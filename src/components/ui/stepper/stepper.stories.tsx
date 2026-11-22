import type { Meta, StoryObj } from "@storybook/react-vite"
import { Stepper } from "./stepper"

const meta: Meta<typeof Stepper> = { title: "GCBA/UI/Stepper", component: Stepper, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  args: { activeStep: 1, steps: [{ title: "Subir" }, { title: "Validar", description: "Revisión de filas" }, { title: "Confirmar" }] },
}
