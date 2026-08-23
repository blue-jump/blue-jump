import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_TALENTS } from "@/mocks";

import TalentListView from "./talent-list-view";

describe("TalentListView", () => {
  it("블루점프 소속 Talent 전체를 표시한다", () => {
    render(<TalentListView />);

    expect(
      screen.getByRole("heading", {
        name: "버튜버",
        level: 1,
      }),
    ).toBeInTheDocument();

    for (const talent of MOCK_TALENTS) {
      expect(
        screen.getByRole("link", {
          name: `${talent.name} 커뮤니티로 이동`,
        }),
      ).toBeInTheDocument();
    }
  });

  it("Talent 선택 시 해당 Talent Community로 이동한다", () => {
    render(<TalentListView />);

    for (const talent of MOCK_TALENTS) {
      expect(
        screen.getByRole("link", {
          name: `${talent.name} 커뮤니티로 이동`,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("각 TalentCard에서 이름과 대표 또는 기수 정보를 확인할 수 있다", () => {
    render(<TalentListView />);

    for (const talent of MOCK_TALENTS) {
      const talentLink = screen.getByRole("link", {
        name: `${talent.name} 커뮤니티로 이동`,
      });

      const affiliation =
        talent.role === "REPRESENTATIVE"
          ? "대표"
          : talent.generation
            ? `${talent.generation}기`
            : "멤버";

      expect(within(talentLink).getByText(talent.name)).toBeInTheDocument();
      expect(within(talentLink).getByText(talent.englishName)).toBeInTheDocument();
      expect(within(talentLink).getByText(affiliation)).toBeInTheDocument();
    }
  });

  it("각 Talent의 프로필 이미지를 표시한다", () => {
    render(<TalentListView />);

    for (const talent of MOCK_TALENTS) {
      expect(screen.getByAltText(`${talent.name} 프로필`)).toBeInTheDocument();
    }
  });
});
