import type { Metadata } from "next";

import { TalentListView } from "@/views/talent";

export const metadata: Metadata = {
  title: "멤버",
  description: "블루점프 소속 멤버와 각 커뮤니티를 확인합니다.",
};

export default function TalentListPage() {
  return <TalentListView />;
}
