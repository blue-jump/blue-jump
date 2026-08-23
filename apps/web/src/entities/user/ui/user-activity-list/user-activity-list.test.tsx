import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import UserActivityList, { type UserActivityItem } from "./user-activity-list";

const activities = [
  {
    id: "post-1",
    kind: "POST",
    title: "오늘 단체합방 결론: 대표님이 제일 신남",
    referenceAt: "2026-08-21T13:18:00.000Z",
    referenceLabel: "작성 시각",
    timestampPrecision: "datetime",
    href: "/community/post-1",
  },
  {
    id: "creative-1",
    kind: "CREATIVE",
    title: "블루점프 사내 조직도 최신판.jpg",
    referenceAt: "2026-08-21T14:02:00.000Z",
    referenceLabel: "제작 시각",
    timestampPrecision: "datetime",
    href: "/creative/creative-1",
  },
  {
    id: "project-1",
    kind: "PROJECT",
    title: "블루점프 명장면 아카이브 정리",
    referenceAt: "2026-08-03T00:00:00.000Z",
    referenceLabel: "프로젝트 시작",
    timestampPrecision: "date",
  },
  {
    id: "gathering-1",
    kind: "GATHERING",
    title: "블루점프 팝업 첫날 같이 갈 사람",
    referenceAt: "2026-09-12T02:00:00.000Z",
    referenceLabel: "모임 일정",
    timestampPrecision: "datetime",
  },
] satisfies UserActivityItem[];

describe("UserActivityList", () => {
  it("서로 다른 종류의 팬 활동을 표시합니다.", () => {
    render(<UserActivityList activities={activities} />);

    expect(screen.getByText("게시글 작성")).toBeInTheDocument();
    expect(screen.getByText("창작 제작")).toBeInTheDocument();
    expect(screen.getByText("프로젝트 참여")).toBeInTheDocument();
    expect(screen.getByText("모임 참여")).toBeInTheDocument();
  });

  it("각 활동의 제목을 표시합니다.", () => {
    render(<UserActivityList activities={activities} />);

    for (const activity of activities) {
      expect(screen.getByText(activity.title)).toBeInTheDocument();
    }
  });

  it("각 활동의 시각 의미를 함께 표시합니다.", () => {
    render(<UserActivityList activities={activities} />);

    expect(screen.getByText("작성 시각")).toBeInTheDocument();
    expect(screen.getByText("제작 시각")).toBeInTheDocument();
    expect(screen.getByText("프로젝트 시작")).toBeInTheDocument();
    expect(screen.getByText("모임 일정")).toBeInTheDocument();
  });

  it("href가 있는 활동은 콘텐츠로 이동할 수 있습니다.", () => {
    render(<UserActivityList activities={activities} />);

    expect(
      screen.getByRole("link", {
        name: "오늘 단체합방 결론: 대표님이 제일 신남",
      }),
    ).toHaveAttribute("href", "/community/post-1");

    expect(
      screen.getByRole("link", {
        name: "블루점프 사내 조직도 최신판.jpg",
      }),
    ).toHaveAttribute("href", "/creative/creative-1");
  });

  it("Route가 없는 활동에는 임의의 Link를 만들지 않습니다.", () => {
    render(<UserActivityList activities={activities} />);

    expect(
      screen.queryByRole("link", {
        name: "블루점프 명장면 아카이브 정리",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("link", {
        name: "블루점프 팝업 첫날 같이 갈 사람",
      }),
    ).not.toBeInTheDocument();
  });

  it("전달받은 Activity 순서를 유지합니다.", () => {
    render(<UserActivityList activities={activities} />);

    const items = screen.getAllByRole("listitem");

    expect(within(items[0]!).getByText(activities[0]!.title)).toBeInTheDocument();
    expect(within(items[1]!).getByText(activities[1]!.title)).toBeInTheDocument();
    expect(within(items[2]!).getByText(activities[2]!.title)).toBeInTheDocument();
    expect(within(items[3]!).getByText(activities[3]!.title)).toBeInTheDocument();
  });

  it("활동이 없으면 자연스러운 Empty 상태를 표시합니다.", () => {
    render(<UserActivityList activities={[]} />);

    expect(screen.getByText("아직 남겨진 팬 활동이 없습니다.")).toBeInTheDocument();
  });
});
