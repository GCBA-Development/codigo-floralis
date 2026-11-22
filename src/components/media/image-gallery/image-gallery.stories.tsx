import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent, within } from "storybook/test"
import { ImageGallery } from "./image-gallery"

const meta: Meta<typeof ImageGallery> = {
  title: "GCBA/Media/ImageGallery",
  component: ImageGallery,
}

export default meta
type Story = StoryObj<typeof ImageGallery>

const mockImages = ["https://picsum.photos/800/600?random=1", "https://picsum.photos/800/600?random=2"]

function ControlledGallery({ editable }: { editable?: boolean }) {
  const [images, setImages] = React.useState(mockImages)
  return <ImageGallery value={images} editable={editable} onValueChange={setImages} />
}

export const Default: Story = {
  render: () => <ControlledGallery />,
}

export const Editable: Story = {
  render: () => <ControlledGallery editable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const thumbnails = canvas.getAllByRole("img", { name: "Miniatura" })
    await userEvent.click(thumbnails[1])
    await userEvent.click(await screen.findByRole("button", { name: "Eliminar imagen" }))
    await expect(canvas.getAllByRole("img", { name: "Miniatura" })).toHaveLength(1)
  },
}
