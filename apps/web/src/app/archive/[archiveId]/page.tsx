import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { findArchiveById } from "@/mocks/sample-data.selectors";
import { ArchiveDetailView } from "@/views/archive";

export interface ArchiveDetailPageProps {
  params: Promise<{
    archiveId: string;
  }>;
}

export async function generateMetadata({ params }: ArchiveDetailPageProps): Promise<Metadata> {
  const { archiveId } = await params;
  const archive = findArchiveById(archiveId);

  if (!archive) {
    return {
      title: "아카이브를 찾을 수 없습니다",
      description: "존재하지 않는 블루점프 팬덤 기록입니다.",
    };
  }

  return {
    title: archive.title,
    description: archive.summary,
  };
}

export default async function ArchiveDetailPage({ params }: ArchiveDetailPageProps) {
  const { archiveId } = await params;
  const archive = findArchiveById(archiveId);

  if (!archive) {
    notFound();
  }

  return <ArchiveDetailView archive={archive} />;
}
