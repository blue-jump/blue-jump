import type { Metadata } from "next";

import { CommunityListView } from "@/views/community";

export const metadata: Metadata = {
  title: "커뮤니티",
  description: "블루점프 팬들의 게시글과 이야기를 탐색합니다.",
};

export default function CommunityPage() {
  return <CommunityListView />;
}
