import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

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
    "ProjectParticipationDemo Story에 사용할 참여 가능한 Mock Project를 찾을 수 없습니다.",
  );
}

const participatingProject = MOCK_PROJECTS.find((project) =>
  project.participantIds.includes(SAMPLE_DEMO_USER_ID),
);

if (!participatingProject) {
  throw new Error(
    "ProjectParticipationDemo Story에 사용할 Demo User 참여 Project를 찾을 수 없습니다.",
  );
}

const unavailableProject = MOCK_PROJECTS.find((project) => project.status !== "RECRUITING");

if (!unavailableProject) {
  throw new Error(
    "ProjectParticipationDemo Story에 사용할 모집 종료 Mock Project를 찾을 수 없습니다.",
  );
}

const unavailableUser = MOCK_USERS.find(
  (user) => !unavailableProject.participantIds.includes(user.id),
);

if (!unavailableUser) {
  throw new Error(
    `ProjectParticipationDemo Story에 사용할 미참여 Mock User를 찾을 수 없습니다: ${unavailableProject.id}`,
  );
}

const meta: Meta<typeof ProjectParticipationDemo> = {
  title: "Features/Project/ProjectParticipationDemo",
  component: ProjectParticipationDemo,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-xl max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    project: recruitingProject,
    currentUserId: SAMPLE_DEMO_USER_ID,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Recruiting: Story = {};

export const Participating: Story = {
  args: {
    project: participatingProject,
    currentUserId: SAMPLE_DEMO_USER_ID,
  },
};

export const Unavailable: Story = {
  args: {
    project: unavailableProject,
    currentUserId: unavailableUser.id,
  },
};
