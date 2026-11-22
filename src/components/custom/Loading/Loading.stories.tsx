import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";

const meta: Meta<typeof Loading > = {
  title: "GCBA/Feedback/LoadingGCBA",
  component: Loading
};

export default meta; 

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    variant: "fullscreen",
  },
};