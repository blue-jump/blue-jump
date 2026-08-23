import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";
import type { Creative } from "@/types";

import CreativeDetail from "./creative-detail";

const mockCreative = MOCK_CREATIVES.find((creative) => creative.id === "creative-3");

if (!mockCreative) {
  throw new Error("CreativeDetail 테스트에 사용할 Mock Creative를 찾을 수 없습니다.");
}

const creative: Creative = mockCreative;

const creator = findUserById(creative.creatorId);

if (!creator) {
  throw new Error(
    `CreativeDetail 테스트에 사용할 Mock User를 찾을 수 없습니다: ${creative.creatorId}`,
  );
}

const talents = getTalentsByIds(creative.talentIds);

describe("CreativeDetail", () => {
  it("Creative의 상세 정보를 표시합니다.", () => {
    render(<CreativeDetail creative={creative} creator={creator} talents={talents} />);

    expect(
      screen.getByRole("heading", {
        name: creative.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(creator.nickname)).toBeInTheDocument();

    if (creative.description) {
      expect(screen.getByText(creative.description)).toBeInTheDocument();
    }
  });

  it("Creative의 대표 이미지를 표시합니다.", () => {
    render(<CreativeDetail creative={creative} creator={creator} talents={talents} />);

    if (creative.thumbnailUrl) {
      expect(
        screen.getByRole("img", {
          name: creative.title,
        }),
      ).toBeInTheDocument();

      return;
    }

    expect(
      screen.getByRole("img", {
        name: `${creative.title} 대표 이미지`,
      }),
    ).toBeInTheDocument();
  });

  it("Creative 생성 시각을 time 요소로 제공합니다.", () => {
    render(<CreativeDetail creative={creative} creator={creator} talents={talents} />);

    const time = screen.getByText((_, element) => element?.tagName === "TIME");

    expect(time).toHaveAttribute("datetime", creative.createdAt);
  });

  it("관련 멤버를 각각의 Talent Community 링크로 표시합니다.", () => {
    render(<CreativeDetail creative={creative} creator={creator} talents={talents} />);

    for (const talent of talents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("contentUrl이 존재하면 외부 원본 콘텐츠 링크를 제공합니다.", () => {
    const creativeWithContentUrl: Creative = {
      ...creative,
      contentUrl: creative.contentUrl ?? "https://example.com/creative",
    };

    render(
      <CreativeDetail creative={creativeWithContentUrl} creator={creator} talents={talents} />,
    );

    const link = screen.getByRole("link", {
      name: /원본 콘텐츠 보기/,
    });

    expect(link).toHaveAttribute("href", creativeWithContentUrl.contentUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("contentUrl이 없으면 외부 원본 콘텐츠 링크를 표시하지 않습니다.", () => {
    const creativeWithoutContentUrl: Creative = {
      ...creative,
      contentUrl: undefined,
    };

    render(
      <CreativeDetail creative={creativeWithoutContentUrl} creator={creator} talents={talents} />,
    );

    expect(
      screen.queryByRole("link", {
        name: /원본 콘텐츠 보기/,
      }),
    ).not.toBeInTheDocument();
  });
});
