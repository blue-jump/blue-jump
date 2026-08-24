import type { Metadata } from "next";

import { ArchiveListView } from "@/views/archive";

export const metadata: Metadata = {
  title: "아카이브",
  description: "블루점프 팬덤에서 쌓여 온 말과 사건, 방송과 프로젝트의 기록을 살펴봅니다.",
};

export default function ArchiveListPage() {
  return <ArchiveListView />;
}
