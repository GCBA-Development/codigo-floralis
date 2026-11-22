import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "GCBA/Form Elements/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Un selector unificado y moderno que soporta selección simple, múltiple, estados de error y diferentes tamaños. Construido sobre Radix UI y Tailwind CSS.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "Estilo visual del componente",
      control: { type: "select" },
      options: ["default", "modern", "glass"],
      table: {
        defaultValue: { summary: "modern" },
      },
    },
    size: {
      description: "Tamaño y escala del selector",
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
      },
    },
    multiple: {
      description: "Habilita la selección de múltiples elementos",
      control: { type: "boolean" },
    },
    label: {
      description: "Etiqueta superior",
      control: { type: "text" },
    },
    error: {
      description: "Mensaje de validación o error",
      control: { type: "text" },
    },
    onChange: { action: "changed" }, 
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Interactivo: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.multiple ? [] : "");
    
    return (
      <div className="w-[350px] p-4">
        <Select 
          {...args} 
          value={val} 
          onChange={(newVal) => {
            setVal(newVal);
            args.onChange(newVal);
          }} 
        />
        {/* Debug visual del valor actual */}
        <div className="mt-8 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Value:</p>
          <code className="text-xs text-slate-700">{JSON.stringify(val)}</code>
        </div>
      </div>
    );
  },
  args: {
    label: "Selector de Áreas",
    placeholder: "Seleccioná una oficina...",
    multiple: false,
    variant: "modern",
    size: "md",
    options: [
      { label: "Sistemas", key: "SIST" },
      { label: "Hacienda", key: "HACI" },
      { label: "Educación", key: "EDUC" },
      { label: "Salud", key: "SALU" },
      { label: "Seguridad", key: "SEGU" },
    ],
  },
};

export const Múltiple: Story = {
  ...Interactivo,
  args: {
    ...Interactivo.args,
    label: "Selección Múltiple",
    multiple: true,
  },
};

export const ConError: Story = {
  ...Interactivo,
  args: {
    ...Interactivo.args,
    label: "Campo con Error",
    error: "Este campo es obligatorio para continuar",
  },
};