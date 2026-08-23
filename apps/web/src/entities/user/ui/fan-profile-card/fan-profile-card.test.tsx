import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ActivityType, Talent, User } from "@/types";

import FanProfileCard from "./fan-profile-card";

const user: User = {
  id: "user-geumsu",
  nickname: "금자보고벌떡",
  bio: "블루점프 합방 보고 금자 방송 입갤.",
  profileImageUrl: "/images/mock/users/geumsu.webp",
  favoriteTalentIds: ["talent-jegal", "talent-mogugu"],
  activityTypeIds: ["meme-maker", "clip-maker"],
  joinedAt: "2024-09-22T10:15:00.000Z",
};

const favoriteTalents = [
  {
    id: "talent-jegal",
    slug: "jegal",
    name: "제갈금자",
    profileImageUrl: "/images/mock/talents/jegal-profile.webp",
  },
  {
    id: "talent-mogugu",
    slug: "mogugu",
    name: "모구구",
    profileImageUrl: "/images/mock/talents/mogugu-profile.webp",
  },
] satisfies Pick<Talent, "id" | "slug" | "name" | "profileImageUrl">[];

const activityTypes = [
  {
    id: "meme-maker",
    name: "Meme Maker",
  },
  {
    id: "clip-maker",
    name: "Clip Maker",
  },
] satisfies Pick<ActivityType, "id" | "name">[];

const activitySummary = {
  creativeCount: 3,
  projectCount: 2,
  gatheringCount: 1,
};

describe("FanProfileCard", () => {
  it("사용자의 팬 프로필 기본 정보를 표시합니다.", () => {
    render(
      <FanProfileCard
        user={user}
        favoriteTalents={favoriteTalents}
        activityTypes={activityTypes}
        activitySummary={activitySummary}
      />,
    );

    expect(screen.getByRole("heading", { name: user.nickname })).toBeInTheDocument();
    expect(screen.getByText(user.bio!)).toBeInTheDocument();
    expect(screen.getByText("2024년 9월부터 함께함")).toBeInTheDocument();
  });

  it("프로필 이미지에 사용자 Identity를 설명하는 대체 텍스트를 제공합니다.", () => {
    render(
      <FanProfileCard
        user={user}
        favoriteTalents={favoriteTalents}
        activityTypes={activityTypes}
        activitySummary={activitySummary}
      />,
    );

    expect(
      screen.getByRole("img", {
        name: `${user.nickname} 프로필 이미지`,
      }),
    ).toBeInTheDocument();
  });

  it("여러 관심 멤버를 각 Talent Community 링크로 표시합니다.", () => {
    render(
      <FanProfileCard
        user={user}
        favoriteTalents={favoriteTalents}
        activityTypes={activityTypes}
        activitySummary={activitySummary}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "제갈금자 멤버 커뮤니티로 이동",
      }),
    ).toHaveAttribute("href", "/talents/jegal");

    expect(
      screen.getByRole("link", {
        name: "모구구 멤버 커뮤니티로 이동",
      }),
    ).toHaveAttribute("href", "/talents/mogugu");
  });

  it("여러 활동 유형을 동일한 중요도로 표시합니다.", () => {
    render(
      <FanProfileCard
        user={user}
        favoriteTalents={favoriteTalents}
        activityTypes={activityTypes}
        activitySummary={activitySummary}
      />,
    );

    expect(screen.getByText("Meme Maker")).toBeInTheDocument();
    expect(screen.getByText("Clip Maker")).toBeInTheDocument();
  });

  it("기존 Relation에서 계산된 주요 활동 요약을 표시합니다.", () => {
    render(
      <FanProfileCard
        user={user}
        favoriteTalents={favoriteTalents}
        activityTypes={activityTypes}
        activitySummary={activitySummary}
      />,
    );

    expect(screen.getByText("창작")).toBeInTheDocument();
    expect(screen.getByText("프로젝트")).toBeInTheDocument();
    expect(screen.getByText("모임")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("Bio가 없는 사용자도 Profile을 표시할 수 있습니다.", () => {
    render(
      <FanProfileCard
        user={{
          ...user,
          bio: undefined,
        }}
        favoriteTalents={favoriteTalents}
        activityTypes={activityTypes}
        activitySummary={activitySummary}
      />,
    );

    expect(screen.getByRole("heading", { name: user.nickname })).toBeInTheDocument();
    expect(screen.queryByText(user.bio!)).not.toBeInTheDocument();
  });

  it("관심 멤버가 없는 경우 자연스러운 Empty 상태를 표시합니다.", () => {
    render(
      <FanProfileCard
        user={user}
        favoriteTalents={[]}
        activityTypes={activityTypes}
        activitySummary={activitySummary}
      />,
    );

    expect(screen.getByText("아직 표시된 관심 멤버가 없습니다.")).toBeInTheDocument();
  });
});
