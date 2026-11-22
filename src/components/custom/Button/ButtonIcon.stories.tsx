import type { Meta, StoryObj } from "@storybook/react";
import ButtonIcon from "./ButtonIcon"; 

const meta: Meta<typeof ButtonIcon> = {
  title: "Components/Custom/ButtonIcon", 
  component: ButtonIcon,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    // Añadimos controles para los iconos si quieres probarlos en Storybook
    startIcon: { control: { disable: true } },
    endIcon: { control: { disable: true } },
  },
};

export default meta;

// Cambiamos el tipo para que sea más robusto
type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    children: "Botón Ciudad",
    variant: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Borde Amarillo",
    variant: "outline",
  },
};

// Historia para probar el Input de archivos que creamos
export const Upload: Story = {
  args: {
    children: "Subir Documento",
    variant: "secondary",
    handleFileChange: (e) => console.log(e.target.files),
  },
};