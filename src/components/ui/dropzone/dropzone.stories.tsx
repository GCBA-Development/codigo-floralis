import type { Meta, StoryObj } from "@storybook/react-vite"
import { Dropzone } from "./dropzone"

const meta: Meta<typeof Dropzone> = { title: "GCBA/UI/Dropzone", component: Dropzone, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Dropzone>

export const Default: Story = { args: { onFiles: () => {}, accept: ".xlsx,.csv", hint: "Excel o CSV, hasta 10 MB" } }
export const WithError: Story = { args: { onFiles: () => {}, error: "El archivo no es válido" } }
