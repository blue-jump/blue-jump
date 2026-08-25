import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import {
  findUserById,
  getActivityTypesByIds,
  getCreativesByCreatorId,
  getGatheringsByParticipantId,
  getProjectsByParticipantId,
  getTalentsByIds,
} from "@/mocks";

import FanProfileCard from "./fan-profile-card";

function requireUser(userId: string) {
  const user = findUserById(userId);

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  return user;
}

function buildFanProfileCardArgs(userId: string) {
  const user = requireUser(userId);

  return {
    user,
    favoriteTalents: getTalentsByIds(user.favoriteTalentIds),
    activityTypes: getActivityTypesByIds(user.activityTypeIds),
    activitySummary: {
      creativeCount: getCreativesByCreatorId(user.id).length,
      projectCount: getProjectsByParticipantId(user.id).length,
      gatheringCount: getGatheringsByParticipantId(user.id).length,
    },
  };
}

const meta: Meta<typeof FanProfileCard> = {
  title: "Entities/User/FanProfileCard",
  component: FanProfileCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: buildFanProfileCardArgs("user-geumsu"),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Archivist: Story = {
  args: buildFanProfileCardArgs("user-night-shift"),
};

export const Creator: Story = {
  args: buildFanProfileCardArgs("user-ghost"),
};

export const RecentMember: Story = {
  args: buildFanProfileCardArgs("user-yardbug"),
};
