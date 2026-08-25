import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_ACTIVITY_TYPES } from "@/mocks";

import ActivityTypePatch from "./activity-type-patch";

function requireActivityType(id: string) {
  const activityType = MOCK_ACTIVITY_TYPES.find((item) => item.id === id);

  if (!activityType) {
    throw new Error(`Activity type not found: ${id}`);
  }

  return activityType;
}

const meta: Meta<typeof ActivityTypePatch> = {
  title: "Entities/ActivityType/ActivityTypePatch",
  component: ActivityTypePatch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    activityType: requireActivityType("artist"),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MemeMaker: Story = {
  args: {
    activityType: requireActivityType("meme-maker"),
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="grid w-[min(44rem,calc(100vw-2rem))] gap-3 sm:grid-cols-2">
      {MOCK_ACTIVITY_TYPES.slice(0, 6).map((activityType) => (
        <ActivityTypePatch key={activityType.id} activityType={activityType} />
      ))}
    </div>
  ),
};
