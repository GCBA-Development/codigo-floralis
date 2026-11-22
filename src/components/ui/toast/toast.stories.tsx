import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toaster } from "./toast"
import { toast } from "@/lib/toast"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Toaster> = { title: "GCBA/UI/Toast", component: Toaster }
export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex gap-2">
        <Button onClick={() => toast.success("Guardado correctamente")}>Success</Button>
        <Button variant="destructive" onClick={() => toast.error("No pudimos completar la operación")}>Error</Button>
        <Button variant="outline" onClick={() => toast.warning("Revisá los datos")}>Warning</Button>
        <Button variant="outline" onClick={() => toast.info("Dato informativo")}>Info</Button>
      </div>
    </>
  ),
}
