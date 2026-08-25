import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_TALENTS } from "@/mocks/talents.mock";

import TalentCard from "./talent-card";

const offlineTalent = MOCK_TALENTS.find((talent) => talent.id === "talent-mogugu");

if (!offlineTalent) {
  throw new Error("TalentCard Story에 사용할 Offline Talent를 찾을 수 없습니다.");
}

const liveTalent = MOCK_TALENTS.find((talent) => talent.id === "talent-jegal");

if (!liveTalent) {
  throw new Error("TalentCard Story에 사용할 Live Talent를 찾을 수 없습니다.");
}

const meta: Meta<typeof TalentCard> = {
  title: "Entities/Talent/TalentCard",
  component: TalentCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    talent: offlineTalent,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Live: Story = {
  args: {
    talent: liveTalent,
  },
};
