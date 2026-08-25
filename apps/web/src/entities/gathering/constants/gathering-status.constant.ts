import type { GatheringStatus } from "@/types";

export const GATHERING_STATUS_LABELS = {
  OPEN: "모집 중",
  FULL: "정원 마감",
  COMPLETED: "종료",
} satisfies Record<GatheringStatus, string>;
