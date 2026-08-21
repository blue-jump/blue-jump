import type { Reaction } from "@/types";

export const MOCK_REACTIONS = [
  {
    id: "reaction-1",
    targetType: "POST",
    targetId: "post-1",
    emoji: "ㅋㅋ",
    userIds: ["user-geumsu", "user-sagol", "user-ghost", "user-nureongi", "user-hambak"],
  },
  {
    id: "reaction-2",
    targetType: "POST",
    targetId: "post-2",
    emoji: "🔥",
    userIds: ["user-night-shift", "user-sagol", "user-yardbug"],
  },
  {
    id: "reaction-3",
    targetType: "POST",
    targetId: "post-4",
    emoji: "🎵",
    userIds: ["user-night-shift", "user-yardbug", "user-hambak"],
  },
  {
    id: "reaction-4",
    targetType: "COMMENT",
    targetId: "comment-7",
    emoji: "ㅋㅋ",
    userIds: ["user-night-shift", "user-geumsu", "user-sagol"],
  },
  {
    id: "reaction-5",
    targetType: "CREATIVE",
    targetId: "creative-1",
    emoji: "💙",
    userIds: ["user-night-shift", "user-geumsu", "user-sagol", "user-nureongi"],
  },
  {
    id: "reaction-6",
    targetType: "CREATIVE",
    targetId: "creative-3",
    emoji: "🗡️",
    userIds: ["user-ghost", "user-yardbug", "user-hambak"],
  },
  {
    id: "reaction-7",
    targetType: "CREATIVE",
    targetId: "creative-5",
    emoji: "🐞",
    userIds: ["user-yardbug", "user-hambak", "user-geumsu"],
  },
] satisfies Reaction[];
