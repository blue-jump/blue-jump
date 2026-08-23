import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { getTalentsByIds } from "@/mocks/sample-data.selectors";
import { MOCK_SCHEDULES } from "@/mocks/schedules.mock";

import ScheduleItem from "./schedule-item";

function getScheduleItemArgs(scheduleId: string) {
  const schedule = MOCK_SCHEDULES.find((schedule) => schedule.id === scheduleId);

  if (!schedule) {
    throw new Error(`ScheduleItem Story에 사용할 Mock Schedule을 찾을 수 없습니다: ${scheduleId}`);
  }

  return {
    schedule,
    talents: getTalentsByIds(schedule.talentIds),
  };
}

const meta: Meta<typeof ScheduleItem> = {
  title: "Entities/Schedule/ScheduleItem",
  component: ScheduleItem,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-lg max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: getScheduleItemArgs("schedule-haroha-song"),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Live: Story = {};

export const Event: Story = {
  args: getScheduleItemArgs("schedule-fourth-generation"),
};

export const MultiTalent: Story = {
  args: getScheduleItemArgs("schedule-blue-jump-group"),
};
