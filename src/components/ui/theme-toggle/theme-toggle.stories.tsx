import type { Decorator, Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { ThemeProvider } from "next-themes"

import { ThemeToggle } from "./theme-toggle"

function withProvider({ enableSystem }: { enableSystem: boolean }): Decorator {
  return (Story) => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={enableSystem} disableTransitionOnChange storageKey={STORAGE_KEY}>
      <Story />
    </ThemeProvider>
  )
}

const STORAGE_KEY = "floralis-storybook-theme-toggle"

const meta: Meta<typeof ThemeToggle> = {
  title: "GCBA/UI/ThemeToggle",
  component: ThemeToggle,
  beforeEach: () => localStorage.removeItem(STORAGE_KEY),
  decorators: [withProvider({ enableSystem: true })],
}
export default meta
type Story = StoryObj<typeof ThemeToggle>

// Clickea el botón anunciado y espera el siguiente nombre accesible.
async function clickAndExpect(canvas: ReturnType<typeof within>, from: string, to: string) {
  await userEvent.click(canvas.getByRole("button", { name: `Cambiar tema (siguiente: ${from})` }))
  await expect(canvas.getByRole("button", { name: `Cambiar tema (siguiente: ${to})` })).toBeVisible()
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await canvas.findByRole("button", { name: "Cambiar tema (siguiente: oscuro)" })
    await clickAndExpect(canvas, "oscuro", "sistema")
    await expect(document.documentElement).toHaveClass("dark")
    await clickAndExpect(canvas, "sistema", "claro")
    await clickAndExpect(canvas, "claro", "oscuro")
    await expect(document.documentElement).not.toHaveClass("dark")
  },
}

export const SinSistema: Story = {
  decorators: [withProvider({ enableSystem: false })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await canvas.findByRole("button", { name: "Cambiar tema (siguiente: oscuro)" })
    // Sin "sistema": claro y oscuro se alternan.
    await clickAndExpect(canvas, "oscuro", "claro")
    await expect(document.documentElement).toHaveClass("dark")
    await clickAndExpect(canvas, "claro", "oscuro")
    await expect(document.documentElement).not.toHaveClass("dark")
  },
}

export const Toggle: Story = {
  args: { mode: "toggle" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await canvas.findByRole("button", { name: "Cambiar tema (siguiente: oscuro)" })
    await clickAndExpect(canvas, "oscuro", "claro")
    await expect(document.documentElement).toHaveClass("dark")
    await clickAndExpect(canvas, "claro", "oscuro")
  },
}

export const EtiquetasPersonalizadas: Story = {
  args: { label: "Switch theme", themeLabels: { light: "light", dark: "dark", system: "system" } },
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByRole("button", { name: "Switch theme (siguiente: dark)" })).toBeVisible()
  },
}
