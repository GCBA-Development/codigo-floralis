import type { Meta, StoryObj } from "@storybook/react-vite"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./sheet"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Sheet> = { title: "GCBA/UI/Sheet", component: Sheet }
export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Abrir panel</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalle</SheetTitle>
          <SheetDescription>Panel lateral</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
