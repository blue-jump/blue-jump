import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import LinkButton from "./link-button";

const meta = {
  title: "Web/Buttons/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  args: {
    href: "#",
    children: "커뮤니티 보기",
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
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Brand: Story = {
  args: {
    variant: "brand",
    children: "BLUE JUMP",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <LinkButton href="#" variant="primary">
        Primary
      </LinkButton>

      <LinkButton href="#" variant="brand">
        Brand
      </LinkButton>

      <LinkButton href="#" variant="secondary">
        Secondary
      </LinkButton>

      <LinkButton href="#" variant="outline">
        Outline
      </LinkButton>

      <LinkButton href="#" variant="ghost">
        Ghost
      </LinkButton>

      <LinkButton href="#" variant="destructive">
        Destructive
      </LinkButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <LinkButton href="#" size="sm">
        Small
      </LinkButton>

      <LinkButton href="#" size="md">
        Medium
      </LinkButton>

      <LinkButton href="#" size="lg">
        Large
      </LinkButton>
    </div>
  ),
};
