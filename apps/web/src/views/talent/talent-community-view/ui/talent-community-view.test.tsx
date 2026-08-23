import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MOCK_TALENTS } from "@/mocks";
import type { Talent } from "@/types";

import TalentCommunityView from "./talent-community-view";

function getTalent(id: Talent["id"]) {
  const talent = MOCK_TALENTS.find((item) => item.id === id);

  if (!talent) {
    throw new Error(`Talent를 찾을 수 없습니다: ${id}`);
  }

  return talent;
}

function expectBefore(first: Element, second: Element) {
  expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
}

describe("TalentCommunityView", () => {
  it("선택된 Talent의 Theme Context를 Community Root에 적용한다", () => {
    const talent = getTalent("talent-haroha");

    const { container } = render(<TalentCommunityView talent={talent} />);

    const root = container.firstElementChild;

    if (!root) {
      throw new Error("Talent Community Root가 렌더링되지 않았습니다.");
    }

    expect(root).toHaveAttribute("data-talent-theme", "haroha");
    expect(root).toHaveStyle("--talent-primary: #FFCB0F");
  });

  it("현재 Talent와 관련된 콘텐츠만 표시한다", () => {
    const talent = getTalent("talent-haroha");

    render(<TalentCommunityView talent={talent} />);

    expect(screen.getByText("로하 노래는 밤에 들으면 안 된다")).toBeInTheDocument();
    expect(screen.getByText("망령 회수하러 온 하로하")).toBeInTheDocument();
    expect(screen.getByText("하로하 커버곡 팬 MV")).toBeInTheDocument();
    expect(screen.getByText("노래 조금 하고 잡담 많이 하는 방송")).toBeInTheDocument();
    expect(screen.getByText("노래하는 저승차사")).toBeInTheDocument();

    expect(screen.queryByText("구구야 그건 버튼이 아니야...")).not.toBeInTheDocument();
    expect(screen.queryByText("구구 또 속음 38초 요약")).not.toBeInTheDocument();
  });

  it("여러 Talent와 연결된 콘텐츠도 현재 Community에 표시한다", () => {
    const talent = getTalent("talent-haroha");

    render(<TalentCommunityView talent={talent} />);

    expect(screen.getByText("오늘 단체합방 결론: 대표님이 제일 신남")).toBeInTheDocument();

    expect(screen.getByText("블루점프 명장면 아카이브 정리")).toBeInTheDocument();

    expect(screen.getByText("대표님이 또 뭔가 준비한 블루점프 단체합방")).toBeInTheDocument();

    expect(screen.getByText("대표와 직원들")).toBeInTheDocument();
  });

  it("Project, Schedule, Archive를 정의된 우선순위로 표시한다", () => {
    const talent = getTalent("talent-haroha");

    render(<TalentCommunityView talent={talent} />);

    const recruitingProject = screen.getByText("하로하 커버곡 팬 MV");
    const inProgressProject = screen.getByText("블루점프 명장면 아카이브 정리");

    expectBefore(recruitingProject, inProgressProject);

    const earlierSchedule = screen.getByText("대표님이 또 뭔가 준비한 블루점프 단체합방");
    const laterSchedule = screen.getByText("노래 조금 하고 잡담 많이 하는 방송");

    expectBefore(earlierSchedule, laterSchedule);

    const recentArchive = screen.getByText("노래하는 저승차사");
    const olderArchive = screen.getByText("대표와 직원들");

    expectBefore(recentArchive, olderArchive);
  });

  it("관련 콘텐츠가 없으면 각 영역에 Empty 상태를 표시한다", () => {
    const talent = {
      id: "talent-empty",
      slug: "empty",
      name: "테스트",
      englishName: "Test",
      description: "테스트 Talent",
      fandomName: "테스트 팬덤",
      signatureColor: "#246BFD",
      role: "MEMBER",
      generation: 4,
      themeKey: "empty",
      isLive: false,
    } satisfies Talent;

    render(<TalentCommunityView talent={talent} />);

    expect(screen.getByText("테스트와 관련된 게시글이 없습니다.")).toBeInTheDocument();
    expect(screen.getByText("테스트와 관련된 창작물이 없습니다.")).toBeInTheDocument();
    expect(screen.getByText("테스트와 관련된 프로젝트가 없습니다.")).toBeInTheDocument();
    expect(screen.getByText("테스트와 관련된 일정이 없습니다.")).toBeInTheDocument();
    expect(screen.getByText("테스트와 관련된 기록이 없습니다.")).toBeInTheDocument();
  });
});
