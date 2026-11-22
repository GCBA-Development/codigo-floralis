import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { CheckboxList, type CheckboxListProps } from "./checkbox-list";

const meta: Meta<typeof CheckboxList> = {
  title: "GCBA/UI/CheckboxList",
  component: CheckboxList,
    parameters: {
    layout: "centered",
  },
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

function ControlledCheckboxList(props: CheckboxListProps) {
  const [value, setValue] = useState(props.value ?? []);
  return <CheckboxList {...props} value={value} onValueChange={setValue} />;
}

export const Toggle: Story = {
  args: Default.args,
  render: (args) => <ControlledCheckboxList {...(args as CheckboxListProps)} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sports = canvas.getByRole("checkbox", { name: "Deportes" });
    await expect(canvas.getByRole("checkbox", { name: "Tecnología" })).toBeChecked();
    await expect(sports).not.toBeChecked();
    await userEvent.click(canvas.getByText("Deportes"));
    await expect(sports).toBeChecked();
    await userEvent.click(sports);
    await expect(sports).not.toBeChecked();
  },
};

export const WithError: Story = {
  args: { ...Default.args, error: "Elegí al menos uno", value: [] },
  render: (args) => <ControlledCheckboxList {...(args as CheckboxListProps)} />,
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole("group", { name: "Intereses del Usuario" });
    await expect(group).toHaveAccessibleDescription("Elegí al menos uno");
  },
};
