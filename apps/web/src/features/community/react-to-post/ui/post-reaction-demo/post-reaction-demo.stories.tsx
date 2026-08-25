import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_POSTS } from "@/mocks/posts.mock";
import { getReactionsByTarget } from "@/mocks/sample-data.selectors";
import { MOCK_USERS } from "@/mocks/users.mock";

import PostReactionDemo from "./post-reaction-demo";

const post = MOCK_POSTS.find((post) => getReactionsByTarget("POST", post.id).length > 0);

if (!post) {
  throw new Error(
    "PostReactionDemo Story에 사용할 Reaction이 연결된 Mock Post를 찾을 수 없습니다.",
  );
}

const reactions = getReactionsByTarget("POST", post.id);

const currentUser = MOCK_USERS[0];

if (!currentUser) {
  throw new Error("PostReactionDemo Story에 사용할 Mock User를 찾을 수 없습니다.");
}

const selectedUser = MOCK_USERS.find((user) =>
  reactions.some((reaction) => reaction.userIds.includes(user.id)),
);

const meta: Meta<typeof PostReactionDemo> = {
  title: "Features/Community/PostReactionDemo",
  component: PostReactionDemo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reactions,
    currentUserId: currentUser.id,
  },
};

export const WithSelectedReaction: Story = {
  args: {
    reactions,
    currentUserId: selectedUser?.id ?? currentUser.id,
  },
};
