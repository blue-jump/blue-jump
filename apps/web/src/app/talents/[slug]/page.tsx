import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { findTalentBySlug } from "@/mocks/sample-data.selectors";
import { TalentCommunityView } from "@/views/talent";

interface TalentCommunityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TalentCommunityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const talent = findTalentBySlug(slug);

  if (!talent) {
    notFound();
  }

  return {
    title: talent.name,
    description: `${talent.name} · ${talent.description} · 팬덤 ${talent.fandomName}`,
  };
}

export default async function TalentCommunityPage({ params }: TalentCommunityPageProps) {
  const { slug } = await params;
  const talent = findTalentBySlug(slug);

  if (!talent) {
    notFound();
  }

  return <TalentCommunityView talent={talent} />;
}
