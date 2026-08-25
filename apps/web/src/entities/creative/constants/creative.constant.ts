import type { CreativeType } from "@/types";

export const CREATIVE_TYPE_LABELS = {
  FAN_ART: "팬아트",
  COMIC: "만화",
  MEME: "밈",
  CLIP: "클립",
  VIDEO: "영상",
  MUSIC: "음악",
  THREE_D: "3D",
  DESIGN: "디자인",
  TOOL: "도구",
} satisfies Record<CreativeType, string>;
