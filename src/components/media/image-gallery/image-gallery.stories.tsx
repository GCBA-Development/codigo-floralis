import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from "./image-gallery";

const meta: Meta<typeof ImageGallery> = {
  title: "GCBA/Media/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "modern", "glass"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const mockImages = [
"https://picsum.photos/800/600?random=1",
      "https://picsum.photos/800/600?random=2"
];

export const Modern: Story = {
  args: {
    imagenes: mockImages,
    editable: true,
    variant: "modern",
    size: "md",
    ruta: "informes/tormentas",
    handleChange: (ruta, imgs) => console.log(ruta, imgs),
  },
};

export const GlassGallery: Story = {
  args: {
    ...Modern.args,
    variant: "glass",
    size: "lg",
  },
};