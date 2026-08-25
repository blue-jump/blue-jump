import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";
import type { Creative } from "@/types";

import CreativeDetailView from "./creative-detail-view";

const mockCreative = MOCK_CREATIVES.find(
  (creative) =>
    Boolean(findUserById(creative.creatorId)) && getTalentsByIds(creative.talentIds).length > 0,
);

if (!mockCreative) {
  throw new Error("CreativeDetailView 테스트에 사용할 Mock Creative를 찾을 수 없습니다.");
}

const creative: Creative = mockCreative;

const creator = findUserById(creative.creatorId);

if (!creator) {
  throw new Error(
    `CreativeDetailView 테스트에 사용할 Mock User를 찾을 수 없습니다: ${creative.creatorId}`,
  );
}

const talents = getTalentsByIds(creative.talentIds);

describe("CreativeDetailView", () => {
  it("선택된 Creative와 Creator Relation을 표시합니다.", () => {
    render(<CreativeDetailView creative={creative} />);

    const heading = screen.getByRole("heading", {
      name: creative.title,
      level: 1,
    });

    const article = heading.closest("article");

    if (!article) {
      throw new Error("Creative Detail Article을 찾을 수 없습니다.");
    }

    expect(heading).toBeInTheDocument();
    expect(within(article).getByText(creator.nickname)).toBeInTheDocument();

    if (creative.description) {
      expect(within(article).getByText(creative.description)).toBeInTheDocument();
    }
  });

  it("Creator에서 해당 User Profile로 이동할 수 있습니다.", () => {
    render(<CreativeDetailView creative={creative} />);

    const heading = screen.getByRole("heading", {
      name: creative.title,
      level: 1,
    });

    const article = heading.closest("article");

    if (!article) {
      throw new Error("Creative Detail Article을 찾을 수 없습니다.");
    }

    expect(
      within(article).getByRole("link", {
        name: creator.nickname,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(creator.id));
  });

  it("Creative에 연결된 관련 멤버를 Talent Community 링크로 표시합니다.", () => {
    render(<CreativeDetailView creative={creative} />);

    expect(talents.length).toBeGreaterThan(0);

    for (const talent of talents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("현재 Creative의 Talent Relation만 표시합니다.", () => {
    render(<CreativeDetailView creative={creative} />);

    const unrelatedTalentIds = new Set(creative.talentIds);

    const unrelatedTalents = getTalentsByIds(
      MOCK_CREATIVES.flatMap((item) => item.talentIds),
    ).filter((talent) => !unrelatedTalentIds.has(talent.id));

    for (const talent of unrelatedTalents) {
      expect(
        screen.queryByRole("link", {
          name: talent.name,
        }),
      ).not.toBeInTheDocument();
    }
  });

  it("contentUrl이 존재하면 외부 원본 콘텐츠 링크를 표시합니다.", () => {
    const creativeWithContentUrl: Creative = {
      ...creative,
      contentUrl: creative.contentUrl ?? "https://example.com/blue-jump-creative",
    };

    render(<CreativeDetailView creative={creativeWithContentUrl} />);

    const link = screen.getByRole("link", {
      name: /원본 콘텐츠 보기/,
    });

    expect(link).toHaveAttribute("href", creativeWithContentUrl.contentUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
