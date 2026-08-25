import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import FilterOption from "./filter-option";

const meta: Meta<typeof FilterOption> = {
  title: "Web/FilterOption",
  component: FilterOption,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "전체",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    selected: false,
    disabled: true,
  },
};
