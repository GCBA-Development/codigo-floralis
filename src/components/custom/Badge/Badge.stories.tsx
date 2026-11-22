import type { Meta, StoryObj } from "@storybook/react";
import  Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "GCBA/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive", "soft", "success", "warning"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: "Nuevo",
    variant: "default",
  },
};

export const ModernSoft: Story = {
  args: {
    children: "En Revisión",
    variant: "soft",
  },
};

export const SuccessStatus: Story = {
  args: {
    children: "Completado",
    variant: "success",
    size: "sm",
  },
};