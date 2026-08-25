import type { ProjectStatus } from "@/types";

export const PROJECT_STATUS_LABELS = {
  RECRUITING: "모집 중",
  IN_PROGRESS: "진행 중",
  COMPLETED: "완료",
} satisfies Record<ProjectStatus, string>;
