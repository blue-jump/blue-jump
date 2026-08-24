import type { Metadata } from "next";

import { ProjectListView } from "@/views/project";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "블루점프 팬들이 함께 만들고 있는 프로젝트와 새로운 참여 기회를 살펴봅니다.",
};

export default function ProjectListPage() {
  return <ProjectListView />;
}
