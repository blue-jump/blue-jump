import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import type { Gathering } from "@/types";

import GatheringListView from "./gathering-list-view";

const scheduledGatherings = [...MOCK_GATHERINGS].sort(
  (leftGathering, rightGathering) =>
    new Date(leftGathering.startsAt).getTime() - new Date(rightGathering.startsAt).getTime(),
);

describe("GatheringListView", () => {
  it("기존 Mock Gathering 전체를 표시합니다.", () => {
    render(<GatheringListView />);

    expect(
      screen.getByRole("heading", {
        name: "모임",
        level: 1,
      }),
    ).toBeInTheDocument();

    for (const gathering of MOCK_GATHERINGS) {
      expect(
        screen.getByRole("link", {
          name: gathering.title,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.GATHERING_DETAIL(gathering.id));
    }

    expect(
      screen.getByText(`${MOCK_GATHERINGS.length}`, {
        selector: "strong",
      }),
    ).toBeInTheDocument();
  });

  it("예정된 Gathering을 startsAt이 가까운 순서로 표시합니다.", () => {
    if (scheduledGatherings.length < 2) {
      throw new Error(
        "GatheringListView 일정 정렬 테스트에는 예정된 Mock Gathering이 두 개 이상 필요합니다.",
      );
    }

    render(<GatheringListView />);

    for (let index = 0; index < scheduledGatherings.length - 1; index += 1) {
      const currentGathering = scheduledGatherings[index];
      const nextGathering = scheduledGatherings[index + 1];

      if (!currentGathering || !nextGathering) {
        continue;
      }

      const currentLink = screen.getByRole("link", {
        name: currentGathering.title,
      });

      const nextLink = screen.getByRole("link", {
        name: nextGathering.title,
      });

      expect(
        currentLink.compareDocumentPosition(nextLink) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("종료된 Gathering은 예정된 Gathering보다 뒤에 표시합니다.", () => {
    const sourceGathering = MOCK_GATHERINGS[0];

    if (!sourceGathering) {
      throw new Error("GatheringListView 완료 상태 테스트에 사용할 Mock Gathering이 필요합니다.");
    }

    const completedGathering: Gathering = {
      ...sourceGathering,
      id: `${sourceGathering.id}-completed`,
      title: `${sourceGathering.title} 종료`,
      status: "COMPLETED",
    };

    render(<GatheringListView gatherings={[completedGathering, ...MOCK_GATHERINGS]} />);

    const completedLink = screen.getByRole("link", {
      name: completedGathering.title,
    });

    const completedArticle = completedLink.closest("article");
    const gatheringArticles = screen.getAllByRole("article");

    if (!completedArticle) {
      throw new Error("종료된 Gathering Card를 찾을 수 없습니다.");
    }

    expect(gatheringArticles.at(-1)).toBe(completedArticle);
  });

  it("Gathering이 없으면 Empty 상태를 표시합니다.", () => {
    render(<GatheringListView gatherings={[]} />);

    expect(screen.getByText("아직 예정된 모임이 없습니다.")).toBeInTheDocument();

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
