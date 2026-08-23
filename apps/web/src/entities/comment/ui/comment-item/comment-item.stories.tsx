import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_COMMENTS } from "@/mocks";
import { findUserById } from "@/mocks/sample-data.selectors";

import CommentItem from "./comment-item";

const COMMENT = MOCK_COMMENTS[0];

if (!COMMENT) {
  throw new Error("Comment Mock Data가 필요합니다.");
}

const AUTHOR = findUserById(COMMENT.authorId);

if (!AUTHOR) {
  throw new Error(`Comment 작성자를 찾을 수 없습니다: ${COMMENT.authorId}`);
}

const meta = {
  title: "Entities/Comment/CommentItem",
  component: CommentItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommentItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    comment: COMMENT,
    author: AUTHOR,
  },
};

export const WithoutProfileImage: Story = {
  args: {
    comment: COMMENT,
    author: {
      ...AUTHOR,
      profileImageUrl: undefined,
    },
  },
};
