import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_TALENTS } from "@/mocks";

import TalentSelector from "./talent-selector";

describe("TalentSelector", () => {
  it("블루점프 소속 Talent를 모두 탐색할 수 있다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    for (const talent of MOCK_TALENTS) {
      expect(
        screen.getByRole("link", {
          name: new RegExp(`^${talent.name} 커뮤니티로 이동`),
        }),
      ).toBeInTheDocument();
    }
  });

  it("각 Talent Community로 이동하는 링크를 제공한다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    for (const talent of MOCK_TALENTS) {
      expect(
        screen.getByRole("link", {
          name: new RegExp(`^${talent.name} 커뮤니티로 이동`),
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("현재 Talent를 aria-current와 화면 텍스트로 함께 표시한다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    const currentLink = screen.getByRole("link", {
      name: "하로하 커뮤니티로 이동 (현재)",
    });

    expect(currentLink).toHaveAttribute("aria-current", "page");
    expect(within(currentLink).getByText(/현재/)).toBeInTheDocument();
  });

  it("다른 Talent에는 현재 상태를 제공하지 않는다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    const otherTalentLink = screen.getByRole("link", {
      name: "제갈금자 커뮤니티로 이동",
    });

    expect(otherTalentLink).not.toHaveAttribute("aria-current");
    expect(within(otherTalentLink).queryByText(/현재/)).not.toBeInTheDocument();
  });

  it("Talent Profile 이미지에 의미 있는 대체 텍스트를 제공한다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    for (const talent of MOCK_TALENTS) {
      expect(screen.getByAltText(`${talent.name} 프로필`)).toBeInTheDocument();
    }
  });

  it("Talent 링크가 Keyboard Focus 대상이 된다", () => {
    render(<TalentSelector talents={MOCK_TALENTS} currentTalentId="talent-haroha" />);

    const harohaLink = screen.getByRole("link", {
      name: "하로하 커뮤니티로 이동 (현재)",
    });

    const moguguLink = screen.getByRole("link", {
      name: "모구구 커뮤니티로 이동",
    });

    harohaLink.focus();

    expect(harohaLink).toHaveFocus();

    moguguLink.focus();

    expect(moguguLink).toHaveFocus();
  });
});
