import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { SAMPLE_DEMO_USER_ID } from "@/constants";
import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { MOCK_USERS } from "@/mocks/users.mock";

import GatheringParticipationDemo from "./gathering-participation-demo";

const openGathering = MOCK_GATHERINGS.find(
  (gathering) =>
    gathering.status === "OPEN" &&
    gathering.participantIds.length < gathering.capacity &&
    !gathering.participantIds.includes(SAMPLE_DEMO_USER_ID),
);

if (!openGathering) {
  throw new Error(
    "GatheringParticipationDemo Story에 사용할 참가 가능한 Mock Gathering을 찾을 수 없습니다.",
  );
}

const participatingGathering = MOCK_GATHERINGS.find((gathering) =>
  gathering.participantIds.includes(SAMPLE_DEMO_USER_ID),
);

if (!participatingGathering) {
  throw new Error(
    "GatheringParticipationDemo Story에 사용할 Demo User 참가 Gathering을 찾을 수 없습니다.",
  );
}

const fullGathering = MOCK_GATHERINGS.find((gathering) => gathering.status === "FULL");

if (!fullGathering) {
  throw new Error(
    "GatheringParticipationDemo Story에 사용할 FULL Mock Gathering을 찾을 수 없습니다.",
  );
}

const fullGatheringNonParticipant = MOCK_USERS.find(
  (user) => !fullGathering.participantIds.includes(user.id),
);

if (!fullGatheringNonParticipant) {
  throw new Error(
    `GatheringParticipationDemo Story에 사용할 FULL Gathering 미참여 User를 찾을 수 없습니다: ${fullGathering.id}`,
  );
}

const meta: Meta<typeof GatheringParticipationDemo> = {
  title: "Features/Gathering/GatheringParticipationDemo",
  component: GatheringParticipationDemo,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-xl max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    gathering: openGathering,
    currentUserId: SAMPLE_DEMO_USER_ID,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const Participating: Story = {
  args: {
    gathering: participatingGathering,
    currentUserId: SAMPLE_DEMO_USER_ID,
  },
};

export const Full: Story = {
  args: {
    gathering: fullGathering,
    currentUserId: fullGatheringNonParticipant.id,
  },
};

export const Completed: Story = {
  args: {
    gathering: {
      ...openGathering,
      status: "COMPLETED",
    },
    currentUserId: SAMPLE_DEMO_USER_ID,
  },
};
