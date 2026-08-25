import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_ARCHIVES } from "@/mocks/archives.mock";
import {
  findCreativeById,
  findPostById,
  findProjectById,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import type { Creative, Post, Project } from "@/types";

import ArchiveDetail from "./archive-detail";

function getArchiveDetailArgs(archiveId: string) {
  const archive = MOCK_ARCHIVES.find((archive) => archive.id === archiveId);

  if (!archive) {
    throw new Error(`ArchiveDetail Story에 사용할 Mock Archive를 찾을 수 없습니다: ${archiveId}`);
  }

  const posts: Post[] = (archive.relatedPostIds ?? []).flatMap((postId) => {
    const post = findPostById(postId);

    return post ? [post] : [];
  });

  const creatives: Creative[] = (archive.relatedCreativeIds ?? []).flatMap((creativeId) => {
    const creative = findCreativeById(creativeId);

    return creative ? [creative] : [];
  });

  const projects: Project[] = (archive.relatedProjectIds ?? []).flatMap((projectId) => {
    const project = findProjectById(projectId);

    return project ? [project] : [];
  });

  return {
    archive,
    talents: getTalentsByIds(archive.talentIds),
    posts,
    creatives,
    projects,
  };
}

const meta = {
  title: "Entities/Archive/ArchiveDetail",
  component: ArchiveDetail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArchiveDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const History: Story = {
  args: getArchiveDetailArgs("archive-blue-jump-fourth-generation"),
};

export const Term: Story = {
  args: getArchiveDetailArgs("archive-jegugu"),
};

export const Broadcast: Story = {
  args: getArchiveDetailArgs("archive-haroha-reaper"),
};

export const PostOnly: Story = {
  args: getArchiveDetailArgs("archive-mogugu-listening-test"),
};
