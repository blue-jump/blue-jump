import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import Avatar from "./avatar";

const avatarImage = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <rect width="128" height="128" fill="#0123B4" />
    <circle cx="64" cy="48" r="24" fill="#ffffff" />
    <path d="M24 116c4-28 20-42 40-42s36 14 40 42" fill="#ffffff" />
  </svg>
`)}`;

const meta = {
  title: "Web/Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  args: {
    alt: "대월향",
    fallback: "대",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: avatarImage,
  },
};

export const Fallback: Story = {
  args: {
    src: undefined,
    fallback: "대",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar alt="대월향" fallback="대" size="sm" />
      <Avatar alt="대월향" fallback="대" size="md" />
      <Avatar alt="대월향" fallback="대" size="lg" />
      <Avatar alt="대월향" fallback="대" size="xl" />
    </div>
  ),
};
