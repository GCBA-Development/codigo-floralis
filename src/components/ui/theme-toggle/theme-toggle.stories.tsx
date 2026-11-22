import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { ThemeProvider } from "next-themes"

import { ThemeToggle } from "./theme-toggle"

const STORAGE_KEY = "floralis-storybook-theme-toggle"

const meta: Meta<typeof ThemeToggle> = {
  title: "GCBA/UI/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  beforeEach: () => localStorage.removeItem(STORAGE_KEY),
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange storageKey={STORAGE_KEY}>
        <Story />
      </ThemeProvider>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = await canvas.findByRole("button", { name: "Cambiar tema (actual: claro)" })
    await userEvent.click(toggle)
    await expect(canvas.getByRole("button", { name: "Cambiar tema (actual: oscuro)" })).toBeVisible()
    await expect(document.documentElement).toHaveClass("dark")
    await userEvent.click(canvas.getByRole("button", { name: "Cambiar tema (actual: oscuro)" }))
    await expect(canvas.getByRole("button", { name: "Cambiar tema (actual: sistema)" })).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Cambiar tema (actual: sistema)" }))
    await expect(canvas.getByRole("button", { name: "Cambiar tema (actual: claro)" })).toBeVisible()
    await expect(document.documentElement).not.toHaveClass("dark")
  },
}

export const EtiquetasPersonalizadas: Story = {
  args: { label: "Switch theme", themeLabels: { light: "light", dark: "dark", system: "system" } },
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByRole("button", { name: "Switch theme (actual: light)" })).toBeVisible()
  },
}
