import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { findProjectById } from "@/mocks/sample-data.selectors";
import { ProjectDetailView } from "@/views/project";

export interface ProjectDetailPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = findProjectById(projectId);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
      description: "존재하지 않는 블루점프 팬 프로젝트입니다.",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = await params;
  const project = findProjectById(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
