import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";

import GatheringCard from "./gathering-card";

function getGatheringCardArgs(gatheringId: string) {
  const gathering = MOCK_GATHERINGS.find((gathering) => gathering.id === gatheringId);

  if (!gathering) {
    throw new Error(
      `GatheringCard Story에 사용할 Mock Gathering을 찾을 수 없습니다: ${gatheringId}`,
    );
  }

  return {
    gathering,
    talents: getTalentsByIds(gathering.talentIds),
  };
}

const meta: Meta<typeof GatheringCard> = {
  title: "Entities/Gathering/GatheringCard",
  component: GatheringCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-md max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: getGatheringCardArgs("gathering-haroha-work"),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const Full: Story = {
  args: getGatheringCardArgs("gathering-fourth-generation"),
};

export const BlueJump: Story = {
  args: getGatheringCardArgs("gathering-blue-jump-pop-up"),
};
