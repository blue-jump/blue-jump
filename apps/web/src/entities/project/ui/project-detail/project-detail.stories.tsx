import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";

import ProjectDetail from "./project-detail";

function getProjectDetailArgs(projectId: string) {
  const project = MOCK_PROJECTS.find((project) => project.id === projectId);

  if (!project) {
    throw new Error(`ProjectDetail Story에 사용할 Mock Project를 찾을 수 없습니다: ${projectId}`);
  }

  const organizer = findUserById(project.organizerId);

  if (!organizer) {
    throw new Error(
      `ProjectDetail Story에 사용할 Organizer를 찾을 수 없습니다: ${project.organizerId}`,
    );
  }

  return {
    project,
    organizer,
    participants: getUsersByIds(project.participantIds),
    talents: getTalentsByIds(project.talentIds),
  };
}

const meta = {
  title: "Entities/Project/ProjectDetail",
  component: ProjectDetail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Recruiting: Story = {
  args: getProjectDetailArgs("project-haroha-fan-mv"),
};

export const InProgress: Story = {
  args: getProjectDetailArgs("project-blue-jump-highlight-archive"),
};

export const MultiTalent: Story = {
  args: getProjectDetailArgs("project-fourth-generation-relay"),
};
