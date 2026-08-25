import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_POSTS } from "@/mocks/posts.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";

import PostDetail from "./post-detail";

function buildStoryArgs(postId: string) {
  const post = MOCK_POSTS.find((item) => item.id === postId);

  if (!post) {
    throw new Error(`PostDetail Story에 사용할 Mock Post를 찾을 수 없습니다: ${postId}`);
  }

  const author = findUserById(post.authorId);

  if (!author) {
    throw new Error(`PostDetail Story에 사용할 Mock User를 찾을 수 없습니다: ${post.authorId}`);
  }

  return {
    post,
    author,
    talents: getTalentsByIds(post.talentIds),
  };
}

const meta: Meta<typeof PostDetail> = {
  title: "Entities/Post/PostDetail",
  component: PostDetail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: buildStoryArgs("post-3"),
};

export const MultiTalent: Story = {
  args: buildStoryArgs("post-2"),
};
