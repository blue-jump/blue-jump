import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CREATIVE_TYPE_LABELS } from "@/entities/creative";
import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { MOCK_TALENTS } from "@/mocks/talents.mock";

import CreativeFilter from "./creative-filter";
import { getAvailableCreativeTypes } from "../../lib";

const availableTypes = getAvailableCreativeTypes(MOCK_CREATIVES);

const creative = MOCK_CREATIVES[0];

if (!creative) {
  throw new Error("CreativeFilter 테스트에 사용할 Mock Creative를 찾을 수 없습니다.");
}

const talent = MOCK_TALENTS.find((talent) => creative.talentIds.includes(talent.id));

if (!talent) {
  throw new Error(`CreativeFilter 테스트에 사용할 Mock Talent를 찾을 수 없습니다: ${creative.id}`);
}

describe("CreativeFilter", () => {
  it("현재 Mock Creative에 존재하는 콘텐츠 유형만 표시합니다.", () => {
    render(
      <CreativeFilter
        creatives={MOCK_CREATIVES}
        talents={MOCK_TALENTS}
        value={{
          type: "ALL",
          talentId: "ALL",
        }}
        resultCount={MOCK_CREATIVES.length}
        onValueChange={() => undefined}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "전체",
      }),
    ).toBeInTheDocument();

    for (const type of availableTypes) {
      expect(
        screen.getByRole("button", {
          name: CREATIVE_TYPE_LABELS[type],
        }),
      ).toBeInTheDocument();
    }
  });

  it("전체 멤버와 블루점프 멤버 전체를 표시합니다.", () => {
    render(
      <CreativeFilter
        creatives={MOCK_CREATIVES}
        talents={MOCK_TALENTS}
        value={{
          type: "ALL",
          talentId: "ALL",
        }}
        resultCount={MOCK_CREATIVES.length}
        onValueChange={() => undefined}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "전체 멤버",
      }),
    ).toBeInTheDocument();

    for (const talent of MOCK_TALENTS) {
      expect(
        screen.getByRole("button", {
          name: talent.name,
        }),
      ).toBeInTheDocument();
    }
  });

  it("현재 선택된 콘텐츠 유형과 멤버를 aria-pressed로 표시합니다.", () => {
    render(
      <CreativeFilter
        creatives={MOCK_CREATIVES}
        talents={MOCK_TALENTS}
        value={{
          type: creative.type,
          talentId: talent.id,
        }}
        resultCount={1}
        onValueChange={() => undefined}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: CREATIVE_TYPE_LABELS[creative.type],
      }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", {
        name: talent.name,
      }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", {
        name: "전체",
      }),
    ).toHaveAttribute("aria-pressed", "false");

    expect(
      screen.getByRole("button", {
        name: "전체 멤버",
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("콘텐츠 유형을 선택하면 기존 멤버 조건을 유지하여 변경합니다.", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <CreativeFilter
        creatives={MOCK_CREATIVES}
        talents={MOCK_TALENTS}
        value={{
          type: "ALL",
          talentId: talent.id,
        }}
        resultCount={MOCK_CREATIVES.length}
        onValueChange={onValueChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: CREATIVE_TYPE_LABELS[creative.type],
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith({
      type: creative.type,
      talentId: talent.id,
    });
  });

  it("멤버를 선택하면 기존 콘텐츠 유형 조건을 유지하여 변경합니다.", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <CreativeFilter
        creatives={MOCK_CREATIVES}
        talents={MOCK_TALENTS}
        value={{
          type: creative.type,
          talentId: "ALL",
        }}
        resultCount={MOCK_CREATIVES.length}
        onValueChange={onValueChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: talent.name,
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith({
      type: creative.type,
      talentId: talent.id,
    });
  });

  it("Filter 결과가 없으면 Empty 상태를 표시합니다.", () => {
    render(
      <CreativeFilter
        creatives={MOCK_CREATIVES}
        talents={MOCK_TALENTS}
        value={{
          type: creative.type,
          talentId: talent.id,
        }}
        resultCount={0}
        onValueChange={() => undefined}
      />,
    );

    expect(screen.getByText("조건에 맞는 창작물이 없습니다.")).toBeInTheDocument();
  });
});
