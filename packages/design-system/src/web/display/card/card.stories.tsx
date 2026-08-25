import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import Card from "./card";

const meta = {
  title: "Web/Display/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  args: {
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">오늘 블루점프에서</h3>

        <p className="text-muted-foreground text-sm">새 글과 팬 창작물을 확인해 보세요.</p>
      </div>
    ),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "soft"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Soft: Story = {
  args: {
    variant: "soft",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  render: () => (
    <div className="grid w-240 grid-cols-3 gap-4">
      <Card variant="default">
        <div className="space-y-2">
          <strong>Default</strong>
          <p className="text-muted-foreground text-sm">기본적인 콘텐츠 영역입니다.</p>
        </div>
      </Card>

      <Card variant="elevated">
        <div className="space-y-2">
          <strong>Elevated</strong>
          <p className="text-muted-foreground text-sm">조금 더 강조가 필요한 영역입니다.</p>
        </div>
      </Card>

      <Card variant="soft">
        <div className="space-y-2">
          <strong>Soft</strong>
          <p className="text-muted-foreground text-sm">배경과 자연스럽게 이어지는 영역입니다.</p>
        </div>
      </Card>
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div className="grid w-240 grid-cols-4 gap-4">
      <Card padding="none">
        <div className="p-2">
          <strong>None</strong>
        </div>
      </Card>

      <Card padding="sm">
        <strong>Small</strong>
      </Card>

      <Card padding="md">
        <strong>Medium</strong>
      </Card>

      <Card padding="lg">
        <strong>Large</strong>
      </Card>
    </div>
  ),
};
