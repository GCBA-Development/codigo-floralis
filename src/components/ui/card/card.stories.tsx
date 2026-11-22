import type { Meta, StoryObj } from "@storybook/react-vite"
import { Card, CardContent, CardTitle } from "./card"

const meta: Meta<typeof Card> = { title: "GCBA/UI/Card", component: Card }
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardTitle>Título</CardTitle>
      <CardContent>Contenido de la tarjeta</CardContent>
    </Card>
  ),
}
