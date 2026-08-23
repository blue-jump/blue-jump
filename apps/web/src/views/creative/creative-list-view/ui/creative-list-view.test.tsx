import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CREATIVE_TYPE_LABELS } from "@/entities/creative";
import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { findUserById } from "@/mocks/sample-data.selectors";
import { MOCK_TALENTS } from "@/mocks/talents.mock";
import type { Creative } from "@/types";

import CreativeListView from "./creative-list-view";

const resolvedCreatives: Creative[] = [...MOCK_CREATIVES]
  .filter((creative) => findUserById(creative.creatorId))
  .sort(
    (leftCreative, rightCreative) =>
      new Date(rightCreative.createdAt).getTime() - new Date(leftCreative.createdAt).getTime(),
  );

const filterTargetCreative = resolvedCreatives[0];

if (!filterTargetCreative) {
  throw new Error("CreativeListView 테스트에 사용할 Mock Creative를 찾을 수 없습니다.");
}

const filterTargetTalent = MOCK_TALENTS.find((talent) =>
  filterTargetCreative.talentIds.includes(talent.id),
);

if (!filterTargetTalent) {
  throw new Error(
    `CreativeListView 테스트에 사용할 Mock Talent를 찾을 수 없습니다: ${filterTargetCreative.id}`,
  );
}

describe("CreativeListView", () => {
  it("블루점프 팬 창작물 전체를 표시합니다.", () => {
    render(<CreativeListView />);

    expect(
      screen.getByRole("heading", {
        name: "창작",
        level: 1,
      }),
    ).toBeInTheDocument();

    for (const creative of resolvedCreatives) {
      expect(
        screen.getByRole("link", {
          name: creative.title,
        }),
      ).toBeInTheDocument();
    }
  });

  it("Creative를 최근 생성 시각 순서로 표시합니다.", () => {
    render(<CreativeListView />);

    for (let index = 0; index < resolvedCreatives.length - 1; index += 1) {
      const currentCreative = resolvedCreatives[index];
      const nextCreative = resolvedCreatives[index + 1];

      if (!currentCreative || !nextCreative) {
        continue;
      }

      const currentLink = screen.getByRole("link", {
        name: currentCreative.title,
      });

      const nextLink = screen.getByRole("link", {
        name: nextCreative.title,
      });

      expect(
        currentLink.compareDocumentPosition(nextLink) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("Creative Type을 기준으로 필터링합니다.", async () => {
    const user = userEvent.setup();

    render(<CreativeListView />);

    await user.click(
      screen.getByRole("button", {
        name: CREATIVE_TYPE_LABELS[filterTargetCreative.type],
      }),
    );

    const expectedCreatives = resolvedCreatives.filter(
      (creative) => creative.type === filterTargetCreative.type,
    );

    const hiddenCreatives = resolvedCreatives.filter(
      (creative) => creative.type !== filterTargetCreative.type,
    );

    for (const creative of expectedCreatives) {
      expect(
        screen.getByRole("link", {
          name: creative.title,
        }),
      ).toBeInTheDocument();
    }

    for (const creative of hiddenCreatives) {
      expect(
        screen.queryByRole("link", {
          name: creative.title,
        }),
      ).not.toBeInTheDocument();
    }
  });

  it("관련 멤버를 기준으로 필터링합니다.", async () => {
    const user = userEvent.setup();

    render(<CreativeListView />);

    await user.click(
      screen.getByRole("button", {
        name: filterTargetTalent.name,
      }),
    );

    const expectedCreatives = resolvedCreatives.filter((creative) =>
      creative.talentIds.includes(filterTargetTalent.id),
    );

    const hiddenCreatives = resolvedCreatives.filter(
      (creative) => !creative.talentIds.includes(filterTargetTalent.id),
    );

    for (const creative of expectedCreatives) {
      expect(
        screen.getByRole("link", {
          name: creative.title,
        }),
      ).toBeInTheDocument();
    }

    for (const creative of hiddenCreatives) {
      expect(
        screen.queryByRole("link", {
          name: creative.title,
        }),
      ).not.toBeInTheDocument();
    }
  });

  it("Creative Type과 멤버 Filter를 함께 적용합니다.", async () => {
    const user = userEvent.setup();

    render(<CreativeListView />);

    await user.click(
      screen.getByRole("button", {
        name: CREATIVE_TYPE_LABELS[filterTargetCreative.type],
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: filterTargetTalent.name,
      }),
    );

    const expectedCreatives = resolvedCreatives.filter(
      (creative) =>
        creative.type === filterTargetCreative.type &&
        creative.talentIds.includes(filterTargetTalent.id),
    );

    const hiddenCreatives = resolvedCreatives.filter(
      (creative) =>
        !(
          creative.type === filterTargetCreative.type &&
          creative.talentIds.includes(filterTargetTalent.id)
        ),
    );

    for (const creative of expectedCreatives) {
      expect(
        screen.getByRole("link", {
          name: creative.title,
        }),
      ).toBeInTheDocument();
    }

    for (const creative of hiddenCreatives) {
      expect(
        screen.queryByRole("link", {
          name: creative.title,
        }),
      ).not.toBeInTheDocument();
    }
  });

  it("Filter 결과가 없으면 Empty 상태를 표시합니다.", async () => {
    const user = userEvent.setup();

    const creative = resolvedCreatives.find((item) => item.talentIds.length < MOCK_TALENTS.length);

    if (!creative) {
      throw new Error(
        "CreativeListView Empty 상태 테스트에 사용할 Mock Creative를 찾을 수 없습니다.",
      );
    }

    const unrelatedTalent = MOCK_TALENTS.find((talent) => !creative.talentIds.includes(talent.id));

    if (!unrelatedTalent) {
      throw new Error(
        `CreativeListView Empty 상태 테스트에 사용할 관련 없는 Mock Talent를 찾을 수 없습니다: ${creative.id}`,
      );
    }

    render(<CreativeListView creatives={[creative]} />);

    await user.click(
      screen.getByRole("button", {
        name: unrelatedTalent.name,
      }),
    );

    expect(screen.getByText("조건에 맞는 창작물이 없습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: creative.title,
      }),
    ).not.toBeInTheDocument();
  });

  it("Creative가 없으면 Empty 상태를 표시합니다.", () => {
    render(<CreativeListView creatives={[]} />);

    expect(screen.getByText("아직 등록된 창작물이 없습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("group", {
        name: "창작 콘텐츠 유형",
      }),
    ).not.toBeInTheDocument();
  });
});
