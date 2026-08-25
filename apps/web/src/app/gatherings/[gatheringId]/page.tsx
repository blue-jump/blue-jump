import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { findGatheringById } from "@/mocks/sample-data.selectors";
import { GatheringDetailView } from "@/views/gathering";

export interface GatheringDetailPageProps {
  params: Promise<{
    gatheringId: string;
  }>;
}

export async function generateMetadata({ params }: GatheringDetailPageProps): Promise<Metadata> {
  const { gatheringId } = await params;
  const gathering = findGatheringById(gatheringId);

  if (!gathering) {
    return {
      title: "모임을 찾을 수 없습니다",
      description: "존재하지 않는 블루점프 팬 모임입니다.",
    };
  }

  return {
    title: gathering.title,
    description: gathering.description,
  };
}

export default async function GatheringDetailPage({ params }: GatheringDetailPageProps) {
  const { gatheringId } = await params;
  const gathering = findGatheringById(gatheringId);

  if (!gathering) {
    notFound();
  }

  return <GatheringDetailView gathering={gathering} />;
}
