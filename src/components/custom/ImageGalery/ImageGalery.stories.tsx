import type { Meta, StoryObj } from "@storybook/react";
import  ImageGalery from "./ImageGalery";

const meta: Meta<typeof ImageGalery> = {
  title: "GCBA/Molecule/ImageGalery",
  component: ImageGalery,
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
type Story = StoryObj<typeof ImageGalery>;

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