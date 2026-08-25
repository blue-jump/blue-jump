import { useState } from "react";

import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_POSTS } from "@/mocks/posts.mock";

import PostCategoryFilter from "./post-category-filter";
import type { PostCategoryFilterValue } from "../../lib";

const memePost = MOCK_POSTS.find((post) => post.category === "MEME");

if (!memePost) {
  throw new Error("PostCategoryFilter Story에 사용할 MEME Mock Post를 찾을 수 없습니다.");
}

function PostCategoryFilterStory({ initialValue }: { initialValue: PostCategoryFilterValue }) {
  const [value, setValue] = useState<PostCategoryFilterValue>(initialValue);

  return <PostCategoryFilter value={value} onValueChange={setValue} />;
}

const meta: Meta<typeof PostCategoryFilter> = {
  title: "Features/Community/PostCategoryFilter",
  component: PostCategoryFilter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PostCategoryFilterStory initialValue="ALL" />,
};

export const SelectedCategory: Story = {
  render: () => <PostCategoryFilterStory initialValue={memePost.category} />,
};
