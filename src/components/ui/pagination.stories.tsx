import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Pagination } from "./pagination"

const meta: Meta<typeof Pagination> = { title: "GCBA/UI/Pagination", component: Pagination, tags: ["autodocs"] }
export default meta
type Story = StoryObj<typeof Pagination>

function PaginationDemo() {
  const [page, setPage] = useState(1)
  return <Pagination page={page} pageCount={5} totalItems={48} onPageChange={setPage} />
}

export const Default: Story = { render: () => <PaginationDemo /> }
export const Empty: Story = { args: { page: 1, pageCount: 1, totalItems: 0, onPageChange: () => {} } }
