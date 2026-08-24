import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";

import GatheringDetail from "./gathering-detail";

function getGatheringDetailArgs(gatheringId: string) {
  const gathering = MOCK_GATHERINGS.find((gathering) => gathering.id === gatheringId);

  if (!gathering) {
    throw new Error(
      `GatheringDetail Story에 사용할 Mock Gathering을 찾을 수 없습니다: ${gatheringId}`,
    );
  }

  const organizer = findUserById(gathering.organizerId);

  if (!organizer) {
    throw new Error(
      `GatheringDetail Story에 사용할 Organizer를 찾을 수 없습니다: ${gathering.organizerId}`,
    );
  }

  return {
    gathering,
    organizer,
    participants: getUsersByIds(gathering.participantIds),
    talents: getTalentsByIds(gathering.talentIds),
  };
}

const openArgs = getGatheringDetailArgs("gathering-haroha-work");
const fullArgs = getGatheringDetailArgs("gathering-fourth-generation");

const meta = {
  title: "Entities/Gathering/GatheringDetail",
  component: GatheringDetail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GatheringDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: openArgs,
};

export const Full: Story = {
  args: fullArgs,
};

export const Completed: Story = {
  args: {
    ...openArgs,
    gathering: {
      ...openArgs.gathering,
      status: "COMPLETED",
    },
  },
};
