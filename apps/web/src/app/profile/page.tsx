import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { SAMPLE_DEMO_USER_ID } from "@/constants";
import { findUserById } from "@/mocks/sample-data.selectors";
import { UserProfileView } from "@/views/profile";

export const metadata: Metadata = {
  title: "팬 프로필",
  description: "블루점프 팬덤에서 좋아하는 멤버와 지금까지의 팬 활동을 확인합니다.",
};

export default function UserProfilePage() {
  const user = findUserById(SAMPLE_DEMO_USER_ID);

  if (!user) {
    notFound();
  }

  return <UserProfileView user={user} />;
}
