import type { Metadata } from "next";

import { GatheringListView } from "@/views/gathering";

export const metadata: Metadata = {
  title: "모임",
  description: "블루점프 팬들과 함께할 수 있는 예정된 모임과 팬 활동을 살펴봅니다.",
};

export default function GatheringListPage() {
  return <GatheringListView />;
}
