import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_TALENTS } from "@/mocks/talents.mock";

import TalentCard from "./talent-card";

const offlineTalent = MOCK_TALENTS.find((talent) => talent.id === "talent-mogugu");

if (!offlineTalent) {
  throw new Error("TalentCard 테스트에 사용할 Offline Talent를 찾을 수 없습니다.");
}

const liveTalent = MOCK_TALENTS.find((talent) => talent.id === "talent-jegal");

if (!liveTalent) {
  throw new Error("TalentCard 테스트에 사용할 Live Talent를 찾을 수 없습니다.");
}

describe("TalentCard", () => {
  it("Talent의 주요 정보를 표시합니다.", () => {
    render(<TalentCard talent={offlineTalent} />);

    expect(screen.getByText(offlineTalent.name)).toBeInTheDocument();
    expect(screen.getByText(offlineTalent.englishName)).toBeInTheDocument();
    expect(screen.getByText(`${offlineTalent.generation}기`)).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: `${offlineTalent.name} 프로필`,
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
        name: `${offlineTalent.name} 커뮤니티로 이동`,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.TALENT(offlineTalent.slug));
  });
});
