import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_TALENTS } from "@/mocks/talents.mock";

import LiveTalentCard from "./live-talent-card";

const talent = MOCK_TALENTS.find((talent) => talent.id === "talent-great-moon-aroma");

if (!talent) {
  throw new Error("LiveTalentCard 테스트에 사용할 Talent를 찾을 수 없습니다.");
}

if (!talent.liveTitle) {
  throw new Error("LiveTalentCard 테스트에 사용할 Talent의 liveTitle이 없습니다.");
}

describe("LiveTalentCard", () => {
  it("현재 방송 정보와 Talent 정보를 표시합니다.", () => {
    render(<LiveTalentCard talent={talent} />);

    expect(screen.getByText("LIVE")).toBeInTheDocument();
    expect(screen.getByText(talent.liveTitle)).toBeInTheDocument();
    expect(screen.getByText(talent.name)).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: `${talent.name} 라이브 커버`,
      }),
    ).toBeInTheDocument();
  });

  it("Talent Community 진입 링크를 제공합니다.", () => {
    render(<LiveTalentCard talent={talent} />);

    expect(
      screen.getByRole("link", {
        name: `${talent.name} 커뮤니티로 이동`,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
  });
});
