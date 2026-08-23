import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";

import ProjectCard from "./project-card";

function getProjectCardArgs(projectId: string) {
  const project = MOCK_PROJECTS.find((project) => project.id === projectId);

  if (!project) {
    throw new Error(`ProjectCard Story에 사용할 Mock Project를 찾을 수 없습니다: ${projectId}`);
  }

  return {
    project,
    talents: getTalentsByIds(project.talentIds),
  };
}

const meta: Meta<typeof ProjectCard> = {
  title: "Entities/Project/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-md max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: getProjectCardArgs("project-haroha-fan-mv"),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Recruiting: Story = {};

export const InProgress: Story = {
  args: getProjectCardArgs("project-blue-jump-highlight-archive"),
};

export const MultiTalent: Story = {
  args: getProjectCardArgs("project-fourth-generation-relay"),
};
