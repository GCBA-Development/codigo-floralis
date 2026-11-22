import type { Meta, StoryObj } from "@storybook/react";
import  { TimePickerCustom } from "./time-picker";

const meta: Meta<typeof TimePickerCustom> = {
  title: "GCBA/UI/TimePicker",
  component: TimePickerCustom,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "modern", "glass"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePickerCustom>;

export const Default: Story = {
  args: {
    label: "Horario de Inicio",
    variant: "outline",
    defaultValue: "08:00",
  },
};

export const Modern: Story = {
  args: {
    label: "Horario de Cierre",
    variant: "modern",
    description: "Seleccione la hora de finalización del turno.",
  },
};

export const ConError: Story = {
  args: {
    label: "Hora de Entrega",
    error: "El horario seleccionado no es válido.",
    defaultValue: "25:00",
  },
};

export const Disabled: Story = {
  args: {
    label: "Hora Bloqueada",
    disabled: true,
    value: "12:00",
  },
};