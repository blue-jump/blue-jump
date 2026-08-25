import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { URLS } from "@/constants";
import {
  findUserById,
  getCreativesByCreatorId,
  getGatheringsByParticipantId,
  getPostsByAuthorId,
  getProjectsByParticipantId,
} from "@/mocks";

import UserActivityList, { type UserActivityItem } from "./user-activity-list";

function requireUser(userId: string) {
  const user = findUserById(userId);

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  return user;
}

function buildUserActivities(userId: string): UserActivityItem[] {
  const user = requireUser(userId);

  const activities: UserActivityItem[] = [
    ...getPostsByAuthorId(user.id).map((post) => ({
      id: post.id,
      kind: "POST" as const,
      title: post.title,
      referenceAt: post.createdAt,
      referenceLabel: "작성 시각",
      timestampPrecision: "datetime" as const,
      href: URLS.CLIENT.POST(post.id),
    })),

    ...getCreativesByCreatorId(user.id).map((creative) => ({
      id: creative.id,
      kind: "CREATIVE" as const,
      title: creative.title,
      referenceAt: creative.createdAt,
      referenceLabel: "제작 시각",
      timestampPrecision: "datetime" as const,
      href: URLS.CLIENT.CREATIVE_DETAIL(creative.id),
    })),

    ...getProjectsByParticipantId(user.id).flatMap((project) =>
      project.startedAt
        ? [
            {
              id: project.id,
              kind: "PROJECT" as const,
              title: project.title,
              referenceAt: project.startedAt,
              referenceLabel: "프로젝트 시작",
              timestampPrecision: "date" as const,
            },
          ]
        : [],
    ),

    ...getGatheringsByParticipantId(user.id).map((gathering) => ({
      id: gathering.id,
      kind: "GATHERING" as const,
      title: gathering.title,
      referenceAt: gathering.startsAt,
      referenceLabel: "모임 일정",
      timestampPrecision: "datetime" as const,
    })),
  ];

  return activities.sort(
    (left, right) => new Date(right.referenceAt).getTime() - new Date(left.referenceAt).getTime(),
  );
}

const meta: Meta<typeof UserActivityList> = {
  title: "Entities/User/UserActivityList",
  component: UserActivityList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    activities: buildUserActivities("user-geumsu"),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MixedActivity: Story = {
  args: {
    activities: buildUserActivities("user-night-shift"),
  },
};

export const CreatorActivity: Story = {
  args: {
    activities: buildUserActivities("user-yardbug"),
  },
};

export const Empty: Story = {
  args: {
    activities: [],
  },
};
