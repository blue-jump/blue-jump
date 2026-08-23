import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Talent } from "@/types";

import TalentHero from "./talent-hero";

const TALENT: Talent = {
  id: "talent-haroha",
  slug: "haroha",
  name: "하로하",
  englishName: "Haroha",
  description: "저승차사",
  fandomName: "망령",
  signatureColor: "#FFCB0F",
  role: "MEMBER",
  generation: 3,
  profileImageUrl: "/images/mock/talents/haroha-profile.webp",
  coverImageUrl: "/images/mock/talents/haroha-cover.webp",
  themeKey: "haroha",
  isLive: false,
};

describe("TalentHero", () => {
  it("Talent의 기본 정보와 이미지를 표시한다", () => {
    render(<TalentHero talent={TALENT} />);

    expect(
      screen.getByRole("heading", {
        name: "하로하",
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Haroha")).toBeInTheDocument();
    expect(screen.getByText("저승차사")).toBeInTheDocument();
    expect(screen.getByText("3기 · 팬덤 망령")).toBeInTheDocument();

    expect(screen.getByAltText("하로하 커버 이미지")).toBeInTheDocument();
    expect(screen.getByAltText("하로하 프로필 이미지")).toBeInTheDocument();
  });

  it("대표 Talent의 소속 정보를 표시한다", () => {
    render(
      <TalentHero
        talent={{
          ...TALENT,
          id: "talent-great-moon-aroma",
          slug: "great-moon-aroma",
          name: "대월향",
          englishName: "GreatMoonAroma",
          description: "블루점프 대표",
          fandomName: "직원단",
          signatureColor: "#0123B4",
          role: "REPRESENTATIVE",
          generation: undefined,
          profileImageUrl: "/images/mock/talents/great-moon-aroma-profile.webp",
          coverImageUrl: "/images/mock/talents/great-moon-aroma-cover.webp",
          themeKey: "great-moon-aroma",
        }}
      />,
    );

    expect(screen.getByText("대표 · 팬덤 직원단")).toBeInTheDocument();
  });

  it("LIVE 상태에서는 현재 방송 제목을 함께 표시한다", () => {
    render(
      <TalentHero
        talent={{
          ...TALENT,
          isLive: true,
          liveTitle: "노래 조금 하고 잡담 많이 하는 방송",
        }}
      />,
    );

    expect(screen.getByText("LIVE")).toBeInTheDocument();
    expect(screen.getByText("노래 조금 하고 잡담 많이 하는 방송")).toBeInTheDocument();
  });

  it("방송 중이 아니면 LIVE 정보를 표시하지 않는다", () => {
    render(<TalentHero talent={TALENT} />);

    expect(screen.queryByText("LIVE")).not.toBeInTheDocument();
  });
});
