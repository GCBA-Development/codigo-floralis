import type { Meta, StoryObj } from "@storybook/react-vite"
import { AlertDialog, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog"
import { Button } from "@/components/ui/button"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

const meta: Meta<typeof AlertDialog> = { title: "GCBA/UI/AlertDialog", component: AlertDialog }
export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>Eliminar</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>¿Eliminar el registro?</AlertDialogTitle>
        <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="outline" />}>Cancelar</AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>Eliminar</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Eliminar" })
    await userEvent.click(trigger)
    const dialog = await screen.findByRole("alertdialog", { name: "¿Eliminar el registro?" })
    // El popup entra con opacity 0 (data-starting-style) y se anima: esperamos a que termine de aparecer.
    await waitFor(() => expect(dialog).toBeVisible())
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}
