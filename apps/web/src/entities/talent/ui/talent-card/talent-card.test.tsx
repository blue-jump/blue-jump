import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import type { Talent } from "@/types";

import TalentCard from "./talent-card";

const offlineTalent: Talent = {
  id: "talent-mogugu",
  slug: "mogugu",
  name: "모구구",
  englishName: "9mogu9",
  description: "꼬마 견습 사신",
  fandomName: "사골",
  signatureColor: "#FDDFC0",
  role: "MEMBER",
  generation: 2,
  profileImageUrl: "/images/mock/talents/mogugu-profile.webp",
  coverImageUrl: "/images/mock/talents/mogugu-cover.webp",
  themeKey: "mogugu",
  isLive: false,
};

const liveTalent: Talent = {
  id: "talent-jegal",
  slug: "jegal",
  name: "제갈금자",
  englishName: "Jegal",
  description: "블루점프의 악마",
  fandomName: "금수",
  signatureColor: "#F7394F",
  role: "MEMBER",
  generation: 2,
  profileImageUrl: "/images/mock/talents/jegal-profile.webp",
  coverImageUrl: "/images/mock/talents/jegal-cover.webp",
  themeKey: "jegal",
  isLive: true,
  liveTitle: "금수들 오늘도 출석해라",
};

describe("TalentCard", () => {
  it("Talent의 주요 정보를 표시합니다.", () => {
    render(<TalentCard talent={offlineTalent} />);

    expect(screen.getByText("모구구")).toBeInTheDocument();
    expect(screen.getByText("9mogu9")).toBeInTheDocument();
    expect(screen.getByText("2기 · 사골")).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "모구구 프로필",
      }),
    ).toBeInTheDocument();
  });

  it("현재 방송 중인 Talent에는 LIVE 상태를 표시합니다.", () => {
    render(<TalentCard talent={liveTalent} />);

    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("Talent Community 진입 링크를 제공합니다.", () => {
    render(<TalentCard talent={offlineTalent} />);

    expect(
      screen.getByRole("link", {
        name: "모구구 커뮤니티로 이동",
      }),
    ).toHaveAttribute("href", URLS.CLIENT.TALENT(offlineTalent.slug));
  });
});
