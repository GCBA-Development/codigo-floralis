import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Stepper } from "./stepper"

const meta: Meta<typeof Stepper> = { title: "GCBA/UI/Stepper", component: Stepper, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  args: { activeStep: 1, steps: [{ title: "Subir" }, { title: "Validar", description: "Revisión de filas" }, { title: "Confirmar" }] },
}

export const OnlyCompletedStepsClickable: Story = {
  args: { ...Default.args, activeStep: 2, onStepClick: fn(), steps: [{ title: "Subir" }, { title: "Validar" }, { title: "Confirmar" }, { title: "Resultado" }] },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: /Subir/ })).toBeEnabled()
    await expect(canvas.getByRole("button", { name: /Validar/ })).toBeEnabled()
    await expect(canvas.getByRole("button", { name: /Confirmar/ })).toBeDisabled()
    await expect(canvas.getByRole("button", { name: /Resultado/ })).toBeDisabled()
    await userEvent.click(canvas.getByRole("button", { name: /Validar/ }))
    await expect(args.onStepClick).toHaveBeenCalledTimes(1)
    await expect(args.onStepClick).toHaveBeenCalledWith(1)
  },
}
