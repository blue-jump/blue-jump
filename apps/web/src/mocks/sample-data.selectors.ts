import type { ReactionTargetType, TalentId } from "@/types";

import { MOCK_ACTIVITY_TYPES } from "./activity-types.mock";
import { MOCK_ARCHIVES } from "./archives.mock";
import { MOCK_COMMENTS } from "./comments.mock";
import { MOCK_CREATIVES } from "./creatives.mock";
import { MOCK_GATHERINGS } from "./gatherings.mock";
import { MOCK_POSTS } from "./posts.mock";
import { MOCK_PROJECTS } from "./projects.mock";
import { MOCK_REACTIONS } from "./reactions.mock";
import { MOCK_SCHEDULES } from "./schedules.mock";
import { MOCK_TALENTS } from "./talents.mock";
import { MOCK_USERS } from "./users.mock";

export function findTalentById(talentId: string) {
  return MOCK_TALENTS.find((talent) => talent.id === talentId);
}

export function findTalentBySlug(slug: string) {
  return MOCK_TALENTS.find((talent) => talent.slug === slug);
}

export function findUserById(userId: string) {
  return MOCK_USERS.find((user) => user.id === userId);
}

export function findPostById(postId: string) {
  return MOCK_POSTS.find((post) => post.id === postId);
}

export function findCreativeById(creativeId: string) {
  return MOCK_CREATIVES.find((creative) => creative.id === creativeId);
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

export function getPostsByTalentId(talentId: TalentId) {
  return MOCK_POSTS.filter((post) => post.talentIds.includes(talentId));
}

export function getCreativesByTalentId(talentId: TalentId) {
  return MOCK_CREATIVES.filter((creative) => creative.talentIds.includes(talentId));
}

export function getProjectsByTalentId(talentId: TalentId) {
  return MOCK_PROJECTS.filter((project) => project.talentIds.includes(talentId));
}

export function getSchedulesByTalentId(talentId: TalentId) {
  return MOCK_SCHEDULES.filter((schedule) => schedule.talentIds.includes(talentId));
}

export function getArchivesByTalentId(talentId: TalentId) {
  return MOCK_ARCHIVES.filter((archive) => archive.talentIds.includes(talentId));
}

export function getPostsByAuthorId(userId: string) {
  return MOCK_POSTS.filter((post) => post.authorId === userId);
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
