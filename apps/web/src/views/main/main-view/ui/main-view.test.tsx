import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MOCK_ARCHIVES,
  MOCK_CREATIVES,
  MOCK_GATHERINGS,
  MOCK_POSTS,
  MOCK_PROJECTS,
  MOCK_SCHEDULES,
  MOCK_TALENTS,
} from "@/mocks";

import MainView from "./main-view";

describe("MainView", () => {
  it("블루점프 Activity Hub의 주요 영역을 표시합니다.", () => {
    render(<MainView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "지금 블루점프",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "지금 방송 중",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "멤버",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "최근 글",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "팬 창작",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "프로젝트",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "모임",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "일정",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "아카이브",
      }),
    ).toBeInTheDocument();
  });

  it("현재 Mock Data를 Main의 기본 상태에 반영합니다.", () => {
    render(<MainView />);

    const liveSection = screen.getByRole("region", {
      name: "지금 방송 중",
    });

    const liveTalents = MOCK_TALENTS.filter((talent) => talent.isLive);

    for (const talent of liveTalents) {
      expect(within(liveSection).getByText(talent.name)).toBeInTheDocument();
    }

    const communitySection = screen.getByRole("region", {
      name: "최근 글",
    });

    expect(communitySection).toHaveTextContent(MOCK_POSTS[0]!.title);

    const creativeSection = screen.getByRole("region", {
      name: "팬 창작",
    });

    expect(creativeSection).toHaveTextContent(MOCK_CREATIVES[0]!.title);

    const projectSection = screen.getByRole("region", {
      name: "프로젝트",
    });

    expect(projectSection).toHaveTextContent(MOCK_PROJECTS[0]!.title);

    const gatheringSection = screen.getByRole("region", {
      name: "모임",
    });

    expect(gatheringSection).toHaveTextContent(MOCK_GATHERINGS[0]!.title);

    const scheduleSection = screen.getByRole("region", {
      name: "일정",
    });

    expect(scheduleSection).toHaveTextContent(MOCK_SCHEDULES[0]!.title);

    const archiveSection = screen.getByRole("region", {
      name: "아카이브",
    });

    expect(archiveSection).toHaveTextContent(MOCK_ARCHIVES[0]!.title);
  });
});
