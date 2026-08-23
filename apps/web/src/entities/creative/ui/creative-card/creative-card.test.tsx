import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";

import CreativeCard from "./creative-card";

const creative = MOCK_CREATIVES.find((creative) => creative.id === "creative-3");

if (!creative) {
  throw new Error("CreativeCard 테스트에 사용할 Mock Creative를 찾을 수 없습니다.");
}

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
