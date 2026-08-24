import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SAMPLE_DEMO_USER_ID, URLS } from "@/constants";
import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";
import type { Project } from "@/types";

import ProjectDetailView from "./project-detail-view";

const project = MOCK_PROJECTS.find(
  (project) =>
    project.status === "RECRUITING" &&
    !project.participantIds.includes(SAMPLE_DEMO_USER_ID) &&
    Boolean(findUserById(project.organizerId)),
);

if (!project) {
  throw new Error("ProjectDetailView 테스트에 사용할 모집 중인 Mock Project를 찾을 수 없습니다.");
}

const organizer = findUserById(project.organizerId);

if (!organizer) {
  throw new Error(
    `ProjectDetailView 테스트에 사용할 Organizer를 찾을 수 없습니다: ${project.organizerId}`,
  );
}

const participants = getUsersByIds(project.participantIds);
const talents = getTalentsByIds(project.talentIds);

describe("ProjectDetailView", () => {
  it("선택된 Project와 기존 Relation을 조합해 표시합니다.", () => {
    render(<ProjectDetailView project={project} />);

    expect(
      screen.getByRole("heading", {
        name: project.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(project.summary)).toBeInTheDocument();

    const organizerHeading = screen.getByRole("heading", {
      name: "주최자",
    });

    const organizerSection = organizerHeading.closest("section");

    if (!organizerSection) {
      throw new Error("Project Organizer 영역을 찾을 수 없습니다.");
    }

    expect(
      within(organizerSection).getByRole("link", {
        name: new RegExp(organizer.nickname),
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(organizer.id));

    const participantHeading = screen.getByRole("heading", {
      name: "참여자",
    });

    const participantSection = participantHeading.closest("section");

    if (!participantSection) {
      throw new Error("Project Participant 영역을 찾을 수 없습니다.");
    }

    for (const participant of participants) {
      expect(
        within(participantSection).getByRole("link", {
          name: new RegExp(participant.nickname),
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(participant.id));
    }

    for (const talent of talents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("기존 Project Detail과 참여 Demo를 함께 조립합니다.", () => {
    render(<ProjectDetailView project={project} />);

    expect(
      screen.getByRole("heading", {
        name: project.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "프로젝트 참여",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "참여하기",
      }),
    ).toBeInTheDocument();
  });

  it("참여하기를 선택하면 Detail View 안에서 참여 중 상태로 전환합니다.", async () => {
    const user = userEvent.setup();

    render(<ProjectDetailView project={project} />);

    await user.click(
      screen.getByRole("button", {
        name: "참여하기",
      }),
    );

    expect(screen.getByText("이 프로젝트에 참여 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참여 중")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참여하기",
      }),
    ).not.toBeInTheDocument();
  });

  it("존재하지 않는 Participant와 Talent Relation은 임의 데이터로 대체하지 않습니다.", () => {
    const projectWithMissingRelations: Project = {
      ...project,
      participantIds: [...project.participantIds, "user-does-not-exist"],
      talentIds: [...project.talentIds, "talent-does-not-exist"],
    };

    const resolvedParticipants = getUsersByIds(projectWithMissingRelations.participantIds);

    const resolvedTalents = getTalentsByIds(projectWithMissingRelations.talentIds);

    render(<ProjectDetailView project={projectWithMissingRelations} />);

    const participantHeading = screen.getByRole("heading", {
      name: "참여자",
    });

    const participantSection = participantHeading.closest("section");

    if (!participantSection) {
      throw new Error("Project Participant 영역을 찾을 수 없습니다.");
    }

    expect(
      within(participantSection).getByText(`${resolvedParticipants.length}명`),
    ).toBeInTheDocument();

    for (const participant of resolvedParticipants) {
      expect(
        within(participantSection).getByRole("link", {
          name: new RegExp(participant.nickname),
        }),
      ).toBeInTheDocument();
    }

    for (const talent of resolvedTalents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toBeInTheDocument();
    }

    expect(screen.queryByText("user-does-not-exist")).not.toBeInTheDocument();

    expect(screen.queryByText("talent-does-not-exist")).not.toBeInTheDocument();
  });

  it("Organizer Relation을 해결할 수 없으면 임의의 주최자를 표시하지 않습니다.", () => {
    const projectWithoutOrganizer: Project = {
      ...project,
      organizerId: "user-does-not-exist",
    };

    render(<ProjectDetailView project={projectWithoutOrganizer} />);

    expect(screen.getByText("프로젝트 주최자 정보를 확인할 수 없습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: projectWithoutOrganizer.title,
        level: 1,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "프로젝트 참여",
      }),
    ).not.toBeInTheDocument();
  });
});
