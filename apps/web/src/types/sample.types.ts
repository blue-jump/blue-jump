export type TalentId = string;
export type UserId = string;
export type ActivityTypeId = string;
export type PostId = string;
export type CommentId = string;
export type CreativeId = string;
export type ProjectId = string;
export type GatheringId = string;

export type TalentRole = "REPRESENTATIVE" | "MEMBER";
export type TalentGeneration = 2 | 3 | 4;

export interface Talent {
  id: TalentId;
  slug: string;
  name: string;
  englishName: string;
  description: string;
  fandomName: string;
  signatureColor: string;
  role: TalentRole;
  generation?: TalentGeneration;
  profileImageUrl?: string;
  coverImageUrl?: string;
  themeKey: string;
  isLive: boolean;
  liveTitle?: string;
}

export interface ActivityType {
  id: ActivityTypeId;
  name: string;
  description: string;
}

export interface User {
  id: UserId;
  nickname: string;
  bio?: string;
  profileImageUrl?: string;
  favoriteTalentIds: TalentId[];
  activityTypeIds: ActivityTypeId[];
  joinedAt: string;
}

export type PostCategory = "GENERAL" | "MEME" | "QUESTION" | "INFORMATION";

export interface Post {
  id: PostId;
  authorId: UserId;
  talentIds: TalentId[];
  category: PostCategory;
  title: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: CommentId;
  postId: PostId;
  authorId: UserId;
  body: string;
  createdAt: string;
}

export type ReactionTargetType = "POST" | "COMMENT" | "CREATIVE";

export interface Reaction {
  id: string;
  targetType: ReactionTargetType;
  targetId: string;
  emoji: string;
  userIds: UserId[];
}

export type CreativeType =
  | "FAN_ART"
  | "COMIC"
  | "MEME"
  | "CLIP"
  | "VIDEO"
  | "MUSIC"
  | "THREE_D"
  | "DESIGN"
  | "TOOL";

export interface Creative {
  id: CreativeId;
  creatorId: UserId;
  talentIds: TalentId[];
  type: CreativeType;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  createdAt: string;
}

export type ProjectStatus = "RECRUITING" | "IN_PROGRESS" | "COMPLETED";

export interface ProjectRole {
  id: string;
  name: string;
  capacity: number;
  filled: number;
}

export interface Project {
  id: ProjectId;
  organizerId: UserId;
  talentIds: TalentId[];
  participantIds: UserId[];
  title: string;
  summary: string;
  status: ProjectStatus;
  roles: ProjectRole[];
  startedAt?: string;
  completedAt?: string;
}

export type GatheringStatus = "OPEN" | "FULL" | "COMPLETED";

export interface Gathering {
  id: GatheringId;
  organizerId: UserId;
  participantIds: UserId[];
  talentIds: TalentId[];
  title: string;
  description: string;
  location: string;
  startsAt: string;
  capacity: number;
  status: GatheringStatus;
}

export type ScheduleType = "LIVE" | "EVENT" | "ANNIVERSARY";

export interface Schedule {
  id: string;
  talentIds: TalentId[];
  title: string;
  type: ScheduleType;
  startsAt: string;
  endsAt?: string;
  externalUrl?: string;
}

export type ArchiveCategory = "MEME" | "TERM" | "BROADCAST" | "EVENT" | "PROJECT" | "HISTORY";

export interface Archive {
  id: string;
  talentIds: TalentId[];
  category: ArchiveCategory;
  title: string;
  summary: string;
  occurredAt: string;
  relatedPostIds?: PostId[];
  relatedCreativeIds?: CreativeId[];
  relatedProjectIds?: ProjectId[];
}
