import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_TALENTS } from "@/mocks/talents.mock";

import LiveTalentCard from "./live-talent-card";

const talent = MOCK_TALENTS.find((talent) => talent.id === "talent-great-moon-aroma");

if (!talent) {
  throw new Error("LiveTalentCard Story에 사용할 Talent를 찾을 수 없습니다.");
}

const meta: Meta<typeof LiveTalentCard> = {
  title: "Entities/Talent/LiveTalentCard",
  component: LiveTalentCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    talent,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
