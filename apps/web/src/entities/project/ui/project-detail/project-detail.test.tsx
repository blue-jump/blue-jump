import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";

import ProjectDetail from "./project-detail";
import { PROJECT_STATUS_LABELS } from "../../constants";

const project = MOCK_PROJECTS.find((project) => project.id === "project-haroha-fan-mv");

if (!project) {
  throw new Error("ProjectDetail 테스트에 사용할 Mock Project를 찾을 수 없습니다.");
}

const organizer = findUserById(project.organizerId);

if (!organizer) {
  throw new Error(
    `ProjectDetail 테스트에 사용할 Organizer를 찾을 수 없습니다: ${project.organizerId}`,
  );
}

const participants = getUsersByIds(project.participantIds);
const talents = getTalentsByIds(project.talentIds);

describe("ProjectDetail", () => {
  it("Project의 상세 정보를 표시합니다.", () => {
    render(
      <ProjectDetail
        project={project}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: project.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(project.summary)).toBeInTheDocument();

    expect(screen.getByText(PROJECT_STATUS_LABELS[project.status])).toBeInTheDocument();

    expect(screen.getAllByText(`${participants.length}명`).length).toBeGreaterThan(0);
  });

  it("Project 시작 시점을 time 요소로 표시합니다.", () => {
    render(
      <ProjectDetail
        project={project}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    if (!project.startedAt) {
      throw new Error("시작 시점 테스트에 사용할 startedAt이 필요합니다.");
    }

    const startLabel = screen.getByText("시작");
    const startItem = startLabel.closest("div");

    if (!startItem) {
      throw new Error("Project 시작 시점 영역을 찾을 수 없습니다.");
    }

    expect(within(startItem).getByRole("time")).toHaveAttribute("datetime", project.startedAt);
  });

  it("모집 역할별 현재 인원과 정원을 표시합니다.", () => {
    render(
      <ProjectDetail
        project={project}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "함께할 사람",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Project 모집 역할 영역을 찾을 수 없습니다.");
    }

    for (const role of project.roles) {
      expect(within(section).getByText(role.name)).toBeInTheDocument();

      expect(within(section).getByText(`${role.filled} / ${role.capacity}`)).toBeInTheDocument();
    }
  });

  it("Organizer에서 해당 User Profile로 이동할 수 있습니다.", () => {
    render(
      <ProjectDetail
        project={project}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "주최자",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Project Organizer 영역을 찾을 수 없습니다.");
    }

    expect(
      within(section).getByRole("link", {
        name: new RegExp(organizer.nickname),
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(organizer.id));
  });

  it("참여자에서 각각의 User Profile로 이동할 수 있습니다.", () => {
    render(
      <ProjectDetail
        project={project}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "참여자",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Project 참여자 영역을 찾을 수 없습니다.");
    }

    for (const participant of participants) {
      expect(
        within(section).getByRole("link", {
          name: new RegExp(participant.nickname),
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(participant.id));
    }
  });

  it("관련 멤버에서 각각의 Talent Community로 이동할 수 있습니다.", () => {
    render(
      <ProjectDetail
        project={project}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    for (const talent of talents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("완료 시점이 존재하면 완료 날짜를 표시합니다.", () => {
    const completedAt = "2026-08-22T00:00:00.000Z";

    render(
      <ProjectDetail
        project={{
          ...project,
          status: "COMPLETED",
          completedAt,
        }}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    const completedLabel = screen.getByText("완료", {
      selector: "dt",
    });

    const completedItem = completedLabel.closest("div");

    if (!completedItem) {
      throw new Error("Project 완료 시점 영역을 찾을 수 없습니다.");
    }

    expect(within(completedItem).getByRole("time")).toHaveAttribute("datetime", completedAt);
  });
});
