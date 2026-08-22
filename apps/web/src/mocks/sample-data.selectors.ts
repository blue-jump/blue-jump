import type { ReactionTargetType } from "@/types";

import { MOCK_ACTIVITY_TYPES } from "./activity-types.mock";
import { MOCK_COMMENTS } from "./comments.mock";
import { MOCK_CREATIVES } from "./creatives.mock";
import { MOCK_GATHERINGS } from "./gatherings.mock";
import { MOCK_PROJECTS } from "./projects.mock";
import { MOCK_REACTIONS } from "./reactions.mock";
import { MOCK_TALENTS } from "./talents.mock";
import { MOCK_USERS } from "./users.mock";

export function findTalentById(talentId: string) {
  return MOCK_TALENTS.find((talent) => talent.id === talentId);
}

export function findUserById(userId: string) {
  return MOCK_USERS.find((user) => user.id === userId);
}

export function getTalentsByIds(talentIds: string[]) {
  const talentIdSet = new Set(talentIds);

  return MOCK_TALENTS.filter((talent) => talentIdSet.has(talent.id));
}

export function getActivityTypesByIds(activityTypeIds: string[]) {
  const activityTypeIdSet = new Set(activityTypeIds);

  return MOCK_ACTIVITY_TYPES.filter((activityType) => activityTypeIdSet.has(activityType.id));
}

export function getCommentsByPostId(postId: string) {
  return MOCK_COMMENTS.filter((comment) => comment.postId === postId);
}

export function getReactionsByTarget(targetType: ReactionTargetType, targetId: string) {
  return MOCK_REACTIONS.filter(
    (reaction) => reaction.targetType === targetType && reaction.targetId === targetId,
  );
}

export function getCreativesByCreatorId(userId: string) {
  return MOCK_CREATIVES.filter((creative) => creative.creatorId === userId);
}

export function getProjectsByParticipantId(userId: string) {
  return MOCK_PROJECTS.filter((project) => project.participantIds.includes(userId));
}

export function getGatheringsByParticipantId(userId: string) {
  return MOCK_GATHERINGS.filter((gathering) => gathering.participantIds.includes(userId));
}
