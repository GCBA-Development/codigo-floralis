import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxList } from "./checkbox-list";

const meta: Meta<typeof CheckboxList> = {
  title: "GCBA/UI/CheckboxList",
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
    label: "Intereses del Usuario",
    options: [
      { value: "tec", label: "Tecnología" },
      { value: "dep", label: "Deportes" },
      { value: "art", label: "Arte y Cultura" },
    ],
    value: ["tec"],
  },
};