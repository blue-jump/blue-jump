import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import Badge from "./badge";

const meta = {
  title: "Web/Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "직원단",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "neutral",
        "primary",
        "brand",
        "accent",
        "outline",
        "success",
        "warning",
        "destructive",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Brand: Story = {
  args: {
    variant: "brand",
    children: "BLUE JUMP",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">완료</Badge>
      <Badge variant="warning">모집 중</Badge>
      <Badge variant="destructive">마감</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};
