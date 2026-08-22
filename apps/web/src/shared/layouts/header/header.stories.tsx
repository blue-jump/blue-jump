import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import Header from "./header";

const meta = {
  title: "Shared/Layouts/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
