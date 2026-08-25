import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import {
  MOCK_ARCHIVES,
  MOCK_CREATIVES,
  MOCK_GATHERINGS,
  MOCK_POSTS,
  MOCK_PROJECTS,
  MOCK_SCHEDULES,
  MOCK_TALENTS,
} from "@/mocks";
import { findUserById } from "@/mocks/sample-data.selectors";
import type { Gathering, Project } from "@/types";

import MainView from "./main-view";

const PROJECT_STATUS_PRIORITY = {
  RECRUITING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
} satisfies Record<Project["status"], number>;

function getLatestResolvablePost() {
  return [...MOCK_POSTS]
    .sort(
      (leftPost, rightPost) =>
        new Date(rightPost.createdAt).getTime() - new Date(leftPost.createdAt).getTime(),
    )
    .find((post) => findUserById(post.authorId));
}

function getLatestResolvableCreative() {
  return [...MOCK_CREATIVES]
    .sort(
      (leftCreative, rightCreative) =>
        new Date(rightCreative.createdAt).getTime() - new Date(leftCreative.createdAt).getTime(),
    )
    .find((creative) => findUserById(creative.creatorId));
}

function getFirstActiveProject(projects: readonly Project[]) {
  return [...projects]
    .filter((project) => project.status !== "COMPLETED")
    .sort(
      (leftProject, rightProject) =>
        PROJECT_STATUS_PRIORITY[leftProject.status] - PROJECT_STATUS_PRIORITY[rightProject.status],
    )
    .at(0);
}

function getFirstUpcomingGathering(gatherings: readonly Gathering[]) {
  return [...gatherings]
    .filter((gathering) => gathering.status !== "COMPLETED")
    .sort(
      (leftGathering, rightGathering) =>
        new Date(leftGathering.startsAt).getTime() - new Date(rightGathering.startsAt).getTime(),
    )
    .at(0);
}

describe("MainView", () => {
  it("블루점프 Activity Hub의 주요 영역을 표시합니다.", () => {
    render(<MainView />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "지금 블루점프",
      }),
    ).toBeInTheDocument();

    for (const name of [
      "지금 방송 중",
      "멤버",
      "최근 글",
      "팬 창작",
      "프로젝트",
      "모임",
      "일정",
      "아카이브",
    ]) {
      expect(
        screen.getByRole("region", {
          name,
        }),
      ).toBeInTheDocument();
    }
  });

  it("현재 LIVE 중인 Talent를 모두 표시합니다.", () => {
    render(<MainView />);

    const liveSection = screen.getByRole("region", {
      name: "지금 방송 중",
    });

    const liveTalents = MOCK_TALENTS.filter((talent) => talent.isLive);

    for (const talent of liveTalents) {
      expect(within(liveSection).getByText(talent.name)).toBeInTheDocument();

      if (talent.liveTitle) {
        expect(within(liveSection).getByText(talent.liveTitle)).toBeInTheDocument();
      }
    }
  });

  it("블루점프 소속 Talent와 소속 정보를 표시합니다.", () => {
    render(<MainView />);

    const talentSection = screen.getByRole("region", {
      name: "멤버",
    });

    for (const talent of MOCK_TALENTS) {
      expect(within(talentSection).getByText(talent.name)).toBeInTheDocument();
      expect(within(talentSection).getByText(talent.englishName)).toBeInTheDocument();
    }

    expect(within(talentSection).getByText("대표")).toBeInTheDocument();
    expect(within(talentSection).getAllByText("2기")).toHaveLength(2);
    expect(within(talentSection).getAllByText("3기")).toHaveLength(2);
    expect(within(talentSection).getAllByText("4기")).toHaveLength(2);
  });

  it("Relation이 유효한 최신 게시글과 창작물을 표시합니다.", () => {
    render(<MainView />);

    const latestPost = getLatestResolvablePost();
    const latestCreative = getLatestResolvableCreative();

    expect(latestPost).toBeDefined();
    expect(latestCreative).toBeDefined();

    const communitySection = screen.getByRole("region", {
      name: "최근 글",
    });

    const creativeSection = screen.getByRole("region", {
      name: "팬 창작",
    });

    expect(communitySection).toHaveTextContent(latestPost!.title);
    expect(creativeSection).toHaveTextContent(latestCreative!.title);
  });

  it("Main의 Post와 Creative에서 각각 공통 Detail 화면으로 이동할 수 있습니다.", () => {
    render(<MainView />);

    const latestPost = getLatestResolvablePost();
    const latestCreative = getLatestResolvableCreative();

    expect(latestPost).toBeDefined();
    expect(latestCreative).toBeDefined();

    const communitySection = screen.getByRole("region", {
      name: "최근 글",
    });

    const creativeSection = screen.getByRole("region", {
      name: "팬 창작",
    });

    expect(
      within(communitySection).getByRole("link", {
        name: latestPost!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.POST(latestPost!.id));

    expect(
      within(creativeSection).getByRole("link", {
        name: latestCreative!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.CREATIVE_DETAIL(latestCreative!.id));
  });

  it("Main에서 각 콘텐츠의 전체 목록으로 이동할 수 있습니다.", () => {
    render(<MainView />);

    const communitySection = screen.getByRole("region", {
      name: "최근 글",
    });

    const creativeSection = screen.getByRole("region", {
      name: "팬 창작",
    });

    const projectSection = screen.getByRole("region", {
      name: "프로젝트",
    });

    const gatheringSection = screen.getByRole("region", {
      name: "모임",
    });

    const archiveSection = screen.getByRole("region", {
      name: "아카이브",
    });

    expect(
      within(communitySection).getByRole("link", {
        name: "커뮤니티 전체",
      }),
    ).toHaveAttribute("href", URLS.CLIENT.COMMUNITY);

    expect(
      within(creativeSection).getByRole("link", {
        name: "창작 전체",
      }),
    ).toHaveAttribute("href", URLS.CLIENT.CREATIVE);

    expect(
      within(projectSection).getByRole("link", {
        name: "프로젝트 전체",
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROJECTS);

    expect(
      within(gatheringSection).getByRole("link", {
        name: "모임 전체",
      }),
    ).toHaveAttribute("href", URLS.CLIENT.GATHERINGS);

    expect(
      within(archiveSection).getByRole("link", {
        name: "아카이브 전체",
      }),
    ).toHaveAttribute("href", URLS.CLIENT.ARCHIVE);
  });

  it("진행 가능한 Project와 예정된 Gathering을 우선하여 표시하고 Detail로 이동할 수 있습니다.", () => {
    render(<MainView />);

    const project = getFirstActiveProject(MOCK_PROJECTS);
    const gathering = getFirstUpcomingGathering(MOCK_GATHERINGS);

    expect(project).toBeDefined();
    expect(gathering).toBeDefined();

    const projectSection = screen.getByRole("region", {
      name: "프로젝트",
    });

    const gatheringSection = screen.getByRole("region", {
      name: "모임",
    });

    expect(projectSection).toHaveTextContent(project!.title);
    expect(gatheringSection).toHaveTextContent(gathering!.title);

    expect(
      within(projectSection).getByRole("link", {
        name: project!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROJECT_DETAIL(project!.id));

    expect(
      within(gatheringSection).getByRole("link", {
        name: gathering!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.GATHERING_DETAIL(gathering!.id));
  });

  it("Schedule은 시간순, Archive는 최근 발생일순으로 표시하고 Archive Detail로 이동할 수 있습니다.", () => {
    render(<MainView />);

    const earliestSchedule = [...MOCK_SCHEDULES].sort(
      (leftSchedule, rightSchedule) =>
        new Date(leftSchedule.startsAt).getTime() - new Date(rightSchedule.startsAt).getTime(),
    )[0];

    const latestArchive = [...MOCK_ARCHIVES].sort(
      (leftArchive, rightArchive) =>
        new Date(rightArchive.occurredAt).getTime() - new Date(leftArchive.occurredAt).getTime(),
    )[0];

    expect(earliestSchedule).toBeDefined();
    expect(latestArchive).toBeDefined();

    const scheduleSection = screen.getByRole("region", {
      name: "일정",
    });

    const archiveSection = screen.getByRole("region", {
      name: "아카이브",
    });

    const scheduleItems = within(scheduleSection).getAllByRole("article");
    const archiveItems = within(archiveSection).getAllByRole("article");

    expect(scheduleItems[0]).toHaveTextContent(earliestSchedule!.title);
    expect(archiveItems[0]).toHaveTextContent(latestArchive!.title);

    expect(
      within(archiveSection).getByRole("link", {
        name: latestArchive!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.ARCHIVE_DETAIL(latestArchive!.id));
  });
});
