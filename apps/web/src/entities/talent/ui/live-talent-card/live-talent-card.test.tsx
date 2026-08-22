import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import type { Talent } from "@/types";

import LiveTalentCard from "./live-talent-card";

const talent: Talent = {
  id: "talent-great-moon-aroma",
  slug: "great-moon-aroma",
  name: "대월향",
  englishName: "GreatMoonAroma",
  description: "블루점프 대표",
  fandomName: "직원단",
  signatureColor: "#0123B4",
  role: "REPRESENTATIVE",
  profileImageUrl: "/images/mock/talents/great-moon-aroma-profile.webp",
  coverImageUrl: "/images/mock/talents/great-moon-aroma-cover.webp",
  themeKey: "great-moon-aroma",
  isLive: true,
  liveTitle: "직원들 불러다가 오늘도 뭐 하나 합니다",
};

describe("LiveTalentCard", () => {
  it("현재 방송 정보와 Talent 정보를 표시합니다.", () => {
    render(<LiveTalentCard talent={talent} />);

    expect(screen.getByText("LIVE")).toBeInTheDocument();
    expect(screen.getByText("직원들 불러다가 오늘도 뭐 하나 합니다")).toBeInTheDocument();
    expect(screen.getByText("대월향")).toBeInTheDocument();
    expect(screen.getByText("직원단")).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "대월향 라이브 커버",
      }),
    ).toBeInTheDocument();
  });

  it("Talent Community 진입 링크를 제공합니다.", () => {
    render(<LiveTalentCard talent={talent} />);

    expect(
      screen.getByRole("link", {
        name: "대월향 커뮤니티로 이동",
      }),
    ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
  });
});
