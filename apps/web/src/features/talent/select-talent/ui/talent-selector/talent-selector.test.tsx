import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_TALENTS } from "@/mocks/talents.mock";

import TalentSelector from "./talent-selector";

describe("TalentSelector", () => {
  it("블루점프 소속 Talent를 모두 표시한다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    expect(screen.getAllByRole("link")).toHaveLength(MOCK_TALENTS.length);

    for (const talent of MOCK_TALENTS) {
      expect(screen.getByText(talent.name)).toBeInTheDocument();
    }
  });

  it("각 Talent Community로 이동하는 링크를 제공한다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    for (const talent of MOCK_TALENTS) {
      const link = screen.getByRole("link", {
        name: new RegExp(talent.name),
      });

      expect(link).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("현재 Talent를 aria-current와 텍스트로 표시한다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    const currentLink = screen.getByRole("link", {
      name: /하로하.*현재/,
    });

    expect(currentLink).toHaveAttribute("aria-current", "page");
    expect(currentLink).toHaveTextContent("현재");
  });

  it("현재 Talent가 아닌 항목에는 aria-current를 제공하지 않는다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    const otherTalentLink = screen.getByRole("link", {
      name: /제갈금자/,
    });

    expect(otherTalentLink).not.toHaveAttribute("aria-current");
  });
});
