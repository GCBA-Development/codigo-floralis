import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxList } from "./CheckBoxList";

const meta: Meta<typeof CheckboxList> = {
  title: "GCBA/Form Elements/CheckboxList",
  component: CheckboxList,
    parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckboxList>;

export const Default: Story = {
  args: {
    titulo: "Intereses del Usuario",
    opciones: [
      { codigo: "tec", nombre: "Tecnología" },
      { codigo: "dep", nombre: "Deportes" },
      { codigo: "art", nombre: "Arte y Cultura" },
    ],
    elegidos: ["tec"],
  },
};