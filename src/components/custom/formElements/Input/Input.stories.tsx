import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Phone, User, Calendar } from "lucide-react";
import  Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "GCBA/Form Elements/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "modern"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 1. Estado por defecto (Moderno)
export const Default: Story = {
  args: {
    label: "Nombre de Usuario",
    placeholder: "Escribe tu nombre...",
    variant: "modern",
    helperText: "Ingresa tu nombre tal como figura en el DNI.",
  },
};

// 2. Con Icono y Restricción de Texto (Sentence Case)
export const ConIcono: Story = {
  args: {
    label: "Correo Electrónico",
    placeholder: "ejemplo@buenosaires.gob.ar",
    startIcon: <Mail size={18} />,
    restricciones: ["sentenceCase"],
    helperText: "Automáticamente pondrá la primera letra en mayúscula.",
  },
};

// 3. Validación de Números (MUI Style)
export const SoloNumeros: Story = {
  args: {
    label: "Edad",
    placeholder: "00",
    restricciones: ["soloNumeros"],
    startIcon: <User size={18} />,
    helperText: "Este input solo permite la entrada de dígitos.",
    className: "max-w-[150px]",
  },
};

// 4. Estado de Error
export const ConError: Story = {
  args: {
    label: "Teléfono de Contacto",
    placeholder: "+54 11 ...",
    startIcon: <Phone size={18} />,
    error: true,
    helperText: "El número de teléfono no es válido.",
    defaultValue: "123-ABC",
  },
};

// 5. Tipo Fecha (Moderno)
export const Fecha: Story = {
  args: {
    label: "Fecha de Nacimiento",
    type: "date",
    startIcon: <Calendar size={18} />,
    variant: "modern",
  },
};

// 6. Deshabilitado (Estilo Gris Ciudad)
export const Disabled: Story = {
  args: {
    label: "ID de Trámite (No editable)",
    value: "99228833",
    disabled: true,
    startIcon: <User size={18} />,
  },
};