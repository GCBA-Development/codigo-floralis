import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"
import { Dropzone } from "./dropzone"

const meta: Meta<typeof Dropzone> = { title: "GCBA/UI/Dropzone", component: Dropzone }
export default meta
type Story = StoryObj<typeof Dropzone>

export const Default: Story = {
  args: { onFiles: fn(), accept: ".xlsx,.csv", hint: "Excel o CSV, hasta 10 MB" },
  play: async ({ args, canvasElement }) => {
    const input = canvasElement.querySelector<HTMLInputElement>("input[type=file]")!
    const file = new File(["a,b"], "datos.csv", { type: "text/csv" })
    await userEvent.upload(input, file)
    await waitFor(() => expect(args.onFiles).toHaveBeenCalledWith([file]))
  },
}

export const WithError: Story = { args: { onFiles: fn(), error: "El archivo no es válido" } }

export const RejectsOversizedFile: Story = {
  args: { onFiles: fn(), accept: ".csv", maxSize: 1_000 },
  play: async ({ args, canvasElement }) => {
    const input = canvasElement.querySelector<HTMLInputElement>("input[type=file]")!
    await userEvent.upload(input, new File(["x".repeat(2_000)], "grande.csv", { type: "text/csv" }))
    await expect(await within(canvasElement).findByRole("alert")).toHaveTextContent("grande.csv")
    await expect(args.onFiles).not.toHaveBeenCalled()
  },
}
