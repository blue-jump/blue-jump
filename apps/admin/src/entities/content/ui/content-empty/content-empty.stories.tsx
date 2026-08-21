import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import ContentEmpty from "./content-empty";

const meta = {
  title: "Entities/Content/ContentEmpty",
  component: ContentEmpty,
  parameters: {
    layout: "centered",
  },
  args: {
    filtered: false,
  },
} satisfies Meta<typeof ContentEmpty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filtered: Story = {
  args: {
    filtered: true,
  },
};
