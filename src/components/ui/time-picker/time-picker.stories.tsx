import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import  { TimePicker } from "./time-picker";

const meta: Meta<typeof TimePicker> = {
  title: "GCBA/UI/TimePicker",
  component: TimePicker,
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "modern", "glass"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    label: "Horario de Inicio",
    variant: "outline",
    defaultValue: "08:00",
  },
};

export const TypeATime: Story = {
  args: { label: "Horario de Apertura" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText(/Horario de Apertura/)
    await userEvent.type(input, "09:30")
    await expect(input).toHaveValue("09:30")
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
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText(/Hora de Entrega/)
    await expect(input).toBeInvalid()
    await expect(input).toHaveAccessibleDescription("El horario seleccionado no es válido.")
  },
};

export const Disabled: Story = {
  args: {
    label: "Hora Bloqueada",
    disabled: true,
    value: "12:00",
  },
};