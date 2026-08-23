import type { Post } from "@/types";

export const POST_CATEGORY_LABELS = {
  GENERAL: "일반",
  MEME: "밈",
  QUESTION: "질문",
  INFORMATION: "정보",
} satisfies Record<Post["category"], string>;
