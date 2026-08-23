import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";

import ProjectCard from "./project-card";

const project = MOCK_PROJECTS.find((project) => project.id === "project-haroha-fan-mv");

if (!project) {
  throw new Error("ProjectCard 테스트에 사용할 Mock Project를 찾을 수 없습니다.");
}

const talents = getTalentsByIds(project.talentIds);

describe("ProjectCard", () => {
  it("프로젝트의 주요 정보를 표시합니다.", () => {
    render(<ProjectCard project={project} talents={talents} />);

    expect(
      screen.getByRole("heading", {
        name: project.title,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(project.summary)).toBeInTheDocument();
    expect(screen.getByText("모집 중")).toBeInTheDocument();
    expect(screen.getByText(`참여 ${project.participantIds.length}명`)).toBeInTheDocument();

    const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");

    expect(screen.getByText(relatedTalentNames)).toBeInTheDocument();
  });

  it("모집 역할별 현재 인원과 정원을 표시합니다.", () => {
    render(<ProjectCard project={project} talents={talents} />);

    expect(screen.getByText("함께할 사람")).toBeInTheDocument();

    for (const role of project.roles) {
      expect(screen.getByText(role.name)).toBeInTheDocument();
      expect(screen.getByText(`${role.filled} / ${role.capacity}`)).toBeInTheDocument();
    }
  });
});
