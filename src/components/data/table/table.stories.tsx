import type { Meta, StoryObj } from "@storybook/react-vite"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./table"

const meta: Meta<typeof Table> = { title: "GCBA/Data/Table", component: Table }
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

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow><TableHead>Comuna</TableHead><TableHead>Cantidad</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>1</TableCell><TableCell>120</TableCell></TableRow>
        <TableRow><TableCell>2</TableCell><TableCell>85</TableCell></TableRow>
      </TableBody>
      <TableFooter>
        <TableRow><TableCell>Total</TableCell><TableCell>205</TableCell></TableRow>
      </TableFooter>
    </Table>
  ),
}
