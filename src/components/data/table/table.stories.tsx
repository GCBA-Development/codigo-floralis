import type { Meta, StoryObj } from "@storybook/react-vite"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

const meta: Meta<typeof Table> = { title: "GCBA/Data/Table", component: Table, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow><TableHead>Comuna</TableHead><TableHead>Cantidad</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>1</TableCell><TableCell>120</TableCell></TableRow>
        <TableRow><TableCell>2</TableCell><TableCell>85</TableCell></TableRow>
      </TableBody>
    </Table>
  ),
}
