import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";
import type { Creative } from "@/types";

import CreativeCard from "./creative-card";

const mockCreative = MOCK_CREATIVES.find((creative) => creative.id === "creative-3");

if (!mockCreative) {
  throw new Error("CreativeCard 테스트에 사용할 Mock Creative를 찾을 수 없습니다.");
}

const creative: Creative = mockCreative;

const creator = findUserById(creative.creatorId);

if (!creator) {
  throw new Error(
    `CreativeCard 테스트에 사용할 Mock User를 찾을 수 없습니다: ${creative.creatorId}`,
  );
}

const talents = getTalentsByIds(creative.talentIds);

describe("CreativeCard", () => {
  it("Creative의 이미지와 주요 정보를 표시합니다.", () => {
    render(<CreativeCard creative={creative} creator={creator} talents={talents} />);

    expect(
      screen.getByRole("img", {
        name: creative.title,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: creative.title,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("팬아트")).toBeInTheDocument();
    expect(screen.getByText(creator.nickname)).toBeInTheDocument();

    const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");

    expect(screen.getByText(relatedTalentNames)).toBeInTheDocument();
  });

  it("Creative 제목에서 상세 화면으로 이동할 수 있습니다.", () => {
    render(<CreativeCard creative={creative} creator={creator} talents={talents} />);

    expect(
      screen.getByRole("link", {
        name: creative.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.CREATIVE_DETAIL(creative.id));
  });

  it("Creator에서 User Profile로 이동할 수 있습니다.", () => {
    render(<CreativeCard creative={creative} creator={creator} talents={talents} />);

    expect(
      screen.getByRole("link", {
        name: creator.nickname,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(creator.id));
  });

  it("thumbnailUrl이 없으면 이미지 대신 제목을 표시합니다.", () => {
    render(
      <CreativeCard
        creative={{
          ...creative,
          thumbnailUrl: undefined,
        }}
        creator={creator}
        talents={talents}
      />,
    );

    expect(
      screen.queryByRole("img", {
        name: creative.title,
      }),
    ).not.toBeInTheDocument();

    expect(screen.getAllByText(creative.title)).toHaveLength(2);
  });
});
