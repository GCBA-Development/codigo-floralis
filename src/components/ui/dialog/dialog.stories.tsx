import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

const meta: Meta<typeof Dialog> = { title: "GCBA/UI/Dialog", component: Dialog, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Abrir</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar registro</DialogTitle>
          <DialogDescription>Los cambios se guardan al confirmar.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Abrir" })
    await userEvent.click(trigger)
    await expect(await screen.findByRole("dialog", { name: "Editar registro" })).toBeVisible()
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}
