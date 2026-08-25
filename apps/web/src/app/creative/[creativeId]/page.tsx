import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { findCreativeById } from "@/mocks/sample-data.selectors";
import { CreativeDetailView } from "@/views/creative";

interface CreativeDetailPageProps {
  params: Promise<{
    creativeId: string;
  }>;
}

export async function generateMetadata({ params }: CreativeDetailPageProps): Promise<Metadata> {
  const { creativeId } = await params;
  const creative = findCreativeById(creativeId);

  if (!creative) {
    return {
      title: "창작물을 찾을 수 없습니다",
    };
  }

  return {
    title: creative.title,
    description: creative.description ?? `${creative.title} - 블루점프 팬 창작물`,
  };
}

export default async function CreativeDetailPage({ params }: CreativeDetailPageProps) {
  const { creativeId } = await params;
  const creative = findCreativeById(creativeId);

  if (!creative) {
    notFound();
  }

  return <CreativeDetailView creative={creative} />;
}
