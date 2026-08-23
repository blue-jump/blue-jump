import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { findUserById } from "@/mocks/sample-data.selectors";
import { UserProfileView } from "@/views/profile";

export interface UserProfileDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export async function generateMetadata({ params }: UserProfileDetailPageProps): Promise<Metadata> {
  const { userId } = await params;

  const user = findUserById(userId);

  if (!user) {
    return {
      title: "프로필을 찾을 수 없습니다",
      description: "존재하지 않는 블루점프 팬 프로필입니다.",
    };
  }

  return {
    title: `${user.nickname} 팬 프로필`,
    description: user.bio
      ? `${user.nickname}님의 블루점프 팬 프로필입니다. ${user.bio}`
      : `${user.nickname}님의 블루점프 팬 프로필과 활동 기록을 확인합니다.`,
  };
}

export default async function UserProfileDetailPage({ params }: UserProfileDetailPageProps) {
  const { userId } = await params;

  const user = findUserById(userId);

  if (!user) {
    notFound();
  }

  return <UserProfileView user={user} />;
}
