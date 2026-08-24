import type { ArchiveCategory } from "@/types";

export const ARCHIVE_CATEGORY_LABELS = {
  MEME: "밈",
  TERM: "용어",
  BROADCAST: "방송",
  EVENT: "이벤트",
  PROJECT: "프로젝트",
  HISTORY: "연혁",
} satisfies Record<ArchiveCategory, string>;
