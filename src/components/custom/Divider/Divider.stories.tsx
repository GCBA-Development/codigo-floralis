import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "GCBA/Layout/Divider",
  component: Divider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px] p-4">
      <p className="text-sm text-slate-500 mb-2">Sección Superior</p>
      <Divider />
      <p className="text-sm text-slate-500 mt-2">Sección Inferior</p>
    </div>
  ),
};

export const ModernGradient: Story = {
  args: {
    gradient: true,
    variant: "primary",
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center space-x-2 text-sm">
      <span>Inicio</span>
      <Divider orientation="vertical" />
      <span>Perfil</span>
      <Divider orientation="vertical" />
      <span>Configuración</span>
    </div>
  ),
};