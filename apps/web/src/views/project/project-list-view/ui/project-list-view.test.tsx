import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import type { Project } from "@/types";

import ProjectListView from "./project-list-view";

const recruitingProjects = [...MOCK_PROJECTS]
  .filter((project) => project.status === "RECRUITING")
  .sort((leftProject, rightProject) => {
    const leftStartedAt = leftProject.startedAt
      ? new Date(leftProject.startedAt).getTime()
      : Number.NEGATIVE_INFINITY;

    const rightStartedAt = rightProject.startedAt
      ? new Date(rightProject.startedAt).getTime()
      : Number.NEGATIVE_INFINITY;

    return rightStartedAt - leftStartedAt;
  });

describe("ProjectListView", () => {
  it("기존 Mock Project 전체를 표시합니다.", () => {
    render(<ProjectListView />);

    expect(
      screen.getByRole("heading", {
        name: "프로젝트",
        level: 1,
      }),
    ).toBeInTheDocument();

    for (const project of MOCK_PROJECTS) {
      expect(
        screen.getByRole("link", {
          name: project.title,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROJECT_DETAIL(project.id));
    }

    expect(
      screen.getByText(`${MOCK_PROJECTS.length}`, {
        selector: "strong",
      }),
    ).toBeInTheDocument();
  });

  it("모집 중인 Project를 진행 중인 Project보다 먼저 표시합니다.", () => {
    render(<ProjectListView />);

    const recruitingProject = MOCK_PROJECTS.find((project) => project.status === "RECRUITING");

    const inProgressProject = MOCK_PROJECTS.find((project) => project.status === "IN_PROGRESS");

    if (!recruitingProject || !inProgressProject) {
      throw new Error("ProjectListView 상태 정렬 테스트에 사용할 Mock Project가 부족합니다.");
    }

    const recruitingLink = screen.getByRole("link", {
      name: recruitingProject.title,
    });

    const inProgressLink = screen.getByRole("link", {
      name: inProgressProject.title,
    });

    expect(
      recruitingLink.compareDocumentPosition(inProgressLink) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("같은 상태에서는 startedAt이 최근인 Project를 먼저 표시합니다.", () => {
    if (recruitingProjects.length < 2) {
      throw new Error(
        "ProjectListView startedAt 정렬 테스트에는 모집 중인 Mock Project가 두 개 이상 필요합니다.",
      );
    }

    render(<ProjectListView />);

    for (let index = 0; index < recruitingProjects.length - 1; index += 1) {
      const currentProject = recruitingProjects[index];
      const nextProject = recruitingProjects[index + 1];

      if (!currentProject || !nextProject) {
        continue;
      }

      const currentLink = screen.getByRole("link", {
        name: currentProject.title,
      });

      const nextLink = screen.getByRole("link", {
        name: nextProject.title,
      });

      expect(
        currentLink.compareDocumentPosition(nextLink) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("완료된 Project는 모집 중이거나 진행 중인 Project보다 뒤에 표시합니다.", () => {
    const sourceProject = MOCK_PROJECTS[0];

    if (!sourceProject) {
      throw new Error("ProjectListView 완료 상태 테스트에 사용할 Mock Project가 필요합니다.");
    }

    const completedProject: Project = {
      ...sourceProject,
      id: `${sourceProject.id}-completed`,
      title: `${sourceProject.title} 완료`,
      status: "COMPLETED",
      completedAt: "2026-08-22T00:00:00.000Z",
    };

    render(<ProjectListView projects={[completedProject, ...MOCK_PROJECTS]} />);

    const completedLink = screen.getByRole("link", {
      name: completedProject.title,
    });

    const completedArticle = completedLink.closest("article");
    const projectArticles = screen.getAllByRole("article");

    if (!completedArticle) {
      throw new Error("완료 Project Card를 찾을 수 없습니다.");
    }

    expect(projectArticles.at(-1)).toBe(completedArticle);
  });

  it("Project가 없으면 Empty 상태를 표시합니다.", () => {
    render(<ProjectListView projects={[]} />);

    expect(screen.getByText("아직 등록된 프로젝트가 없습니다.")).toBeInTheDocument();

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
