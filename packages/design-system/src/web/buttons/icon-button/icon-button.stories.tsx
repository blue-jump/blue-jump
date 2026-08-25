import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import IconButton from "./icon-button";

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

const meta = {
  title: "Web/Buttons/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  args: {
    "aria-label": "메뉴 열기",
    children: <MenuIcon />,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "brand", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof IconButton>;

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
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Primary" variant="primary">
        <MenuIcon />
      </IconButton>

      <IconButton aria-label="Brand" variant="brand">
        <MenuIcon />
      </IconButton>

      <IconButton aria-label="Secondary" variant="secondary">
        <MenuIcon />
      </IconButton>

      <IconButton aria-label="Outline" variant="outline">
        <MenuIcon />
      </IconButton>

      <IconButton aria-label="Ghost" variant="ghost">
        <MenuIcon />
      </IconButton>

      <IconButton aria-label="Destructive" variant="destructive">
        <MenuIcon />
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Small" size="sm">
        <MenuIcon />
      </IconButton>

      <IconButton aria-label="Medium" size="md">
        <MenuIcon />
      </IconButton>

      <IconButton aria-label="Large" size="lg">
        <MenuIcon />
      </IconButton>
    </div>
  ),
};
