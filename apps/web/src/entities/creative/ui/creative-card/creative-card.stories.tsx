import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";

import CreativeCard from "./creative-card";

function getCreativeCardArgs(creativeId: string) {
  const creative = MOCK_CREATIVES.find((creative) => creative.id === creativeId);

  if (!creative) {
    throw new Error(`CreativeCard Story에 사용할 Mock Creative를 찾을 수 없습니다: ${creativeId}`);
  }

  const creator = findUserById(creative.creatorId);

  if (!creator) {
    throw new Error(
      `CreativeCard Story에 사용할 Mock User를 찾을 수 없습니다: ${creative.creatorId}`,
    );
  }

  return {
    creative,
    creator,
    talents: getTalentsByIds(creative.talentIds),
  };
}

const meta: Meta<typeof CreativeCard> = {
  title: "Entities/Creative/CreativeCard",
  component: CreativeCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80 max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: getCreativeCardArgs("creative-3"),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const FanArt: Story = {};

export const Clip: Story = {
  args: getCreativeCardArgs("creative-2"),
};

export const Meme: Story = {
  args: getCreativeCardArgs("creative-1"),
};
