import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SAMPLE_DEMO_USER_ID } from "@/constants";
import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import { MOCK_USERS } from "@/mocks/users.mock";

import ProjectParticipationDemo from "./project-participation-demo";

const recruitingProject = MOCK_PROJECTS.find(
  (project) =>
    project.status === "RECRUITING" && !project.participantIds.includes(SAMPLE_DEMO_USER_ID),
);

if (!recruitingProject) {
  throw new Error(
    "ProjectParticipationDemo 테스트에 사용할 참여 가능한 Mock Project를 찾을 수 없습니다.",
  );
}

const participatingProject = MOCK_PROJECTS.find((project) =>
  project.participantIds.includes(SAMPLE_DEMO_USER_ID),
);

if (!participatingProject) {
  throw new Error(
    "ProjectParticipationDemo 테스트에 사용할 Demo User 참여 Project를 찾을 수 없습니다.",
  );
}

const unavailableProject = MOCK_PROJECTS.find((project) => project.status !== "RECRUITING");

if (!unavailableProject) {
  throw new Error(
    "ProjectParticipationDemo 테스트에 사용할 모집 종료 Mock Project를 찾을 수 없습니다.",
  );
}

const unavailableUser = MOCK_USERS.find(
  (user) => !unavailableProject.participantIds.includes(user.id),
);

if (!unavailableUser) {
  throw new Error(
    `ProjectParticipationDemo 테스트에 사용할 미참여 Mock User를 찾을 수 없습니다: ${unavailableProject.id}`,
  );
}

describe("ProjectParticipationDemo", () => {
  it("모집 중이고 현재 User가 참여하지 않았다면 참여하기를 제공합니다.", () => {
    render(
      <ProjectParticipationDemo project={recruitingProject} currentUserId={SAMPLE_DEMO_USER_ID} />,
    );

    expect(
      screen.getByRole("heading", {
        name: "프로젝트 참여",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("샘플에서는 역할을 선택하지 않고 참여 상태만 확인합니다."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "참여하기",
      }),
    ).toBeInTheDocument();

    expect(screen.queryByText("참여 중")).not.toBeInTheDocument();
  });

  it("참여하기를 선택하면 Client State에서 참여 중으로 전환합니다.", async () => {
    const user = userEvent.setup();

    render(
      <ProjectParticipationDemo project={recruitingProject} currentUserId={SAMPLE_DEMO_USER_ID} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "참여하기",
      }),
    );

    expect(screen.getByText("이 프로젝트에 참여 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참여 중")).toBeInTheDocument();

    expect(
      screen.getByText("참여 상태는 현재 화면에서만 유지되며 새로고침하면 초기 상태로 돌아갑니다."),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참여하기",
      }),
    ).not.toBeInTheDocument();
  });

  it("참여 Demo는 기존 participantIds를 변경하지 않습니다.", async () => {
    const user = userEvent.setup();
    const participantIdsBefore = [...recruitingProject.participantIds];

    render(
      <ProjectParticipationDemo project={recruitingProject} currentUserId={SAMPLE_DEMO_USER_ID} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "참여하기",
      }),
    );

    expect(recruitingProject.participantIds).toEqual(participantIdsBefore);

    expect(recruitingProject.participantIds).not.toContain(SAMPLE_DEMO_USER_ID);
  });

  it("현재 Demo User가 기존 participantIds에 존재하면 처음부터 참여 중으로 표시합니다.", () => {
    render(
      <ProjectParticipationDemo
        project={participatingProject}
        currentUserId={SAMPLE_DEMO_USER_ID}
      />,
    );

    expect(screen.getByText("이 프로젝트에 참여 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참여 중")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참여하기",
      }),
    ).not.toBeInTheDocument();
  });

  it("모집 중이 아닌 Project의 미참여 User는 새로 참여할 수 없습니다.", () => {
    render(
      <ProjectParticipationDemo project={unavailableProject} currentUserId={unavailableUser.id} />,
    );

    expect(screen.getByText("현재는 새 참여를 받고 있지 않습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참여하기",
      }),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("참여 중")).not.toBeInTheDocument();
  });

  it("모집이 종료된 Project에서도 기존 참여자는 참여 중으로 표시합니다.", () => {
    const participantId = unavailableProject.participantIds[0];

    if (!participantId) {
      throw new Error(
        `ProjectParticipationDemo 테스트에 사용할 기존 참여자를 찾을 수 없습니다: ${unavailableProject.id}`,
      );
    }

    render(<ProjectParticipationDemo project={unavailableProject} currentUserId={participantId} />);

    expect(screen.getByText("이 프로젝트에 참여 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참여 중")).toBeInTheDocument();

    expect(screen.queryByText("현재는 새 참여를 받고 있지 않습니다.")).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참여하기",
      }),
    ).not.toBeInTheDocument();
  });
});
