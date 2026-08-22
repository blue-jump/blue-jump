import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_POSTS } from "@/mocks/posts.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";

import PostCard from "./post-card";

function getPostCardArgs(postId: string) {
  const post = MOCK_POSTS.find((post) => post.id === postId);

  if (!post) {
    throw new Error(`PostCard Story에 사용할 Mock Post를 찾을 수 없습니다: ${postId}`);
  }

  const author = findUserById(post.authorId);

  if (!author) {
    throw new Error(`PostCard Story에 사용할 Mock User를 찾을 수 없습니다: ${post.authorId}`);
  }

  return {
    post,
    author,
    talents: getTalentsByIds(post.talentIds),
  };
}

const meta: Meta<typeof PostCard> = {
  title: "Entities/Post/PostCard",
  component: PostCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-136 max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: getPostCardArgs("post-2"),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyRelatedTalents: Story = {
  args: getPostCardArgs("post-1"),
};
