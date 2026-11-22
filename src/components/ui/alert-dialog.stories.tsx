import type { Meta, StoryObj } from "@storybook/react-vite"
import { AlertDialog, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog"
import { Button } from "./button"

const meta: Meta<typeof AlertDialog> = { title: "GCBA/UI/AlertDialog", component: AlertDialog, tags: ["autodocs"] }
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
}
