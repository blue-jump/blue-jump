import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import type { Post, Talent, User } from "@/types";

import PostCard from "./post-card";

const AUTHOR = {
  nickname: "금자보고벌떡",
  profileImageUrl: "/images/mock/users/geumsu.webp",
} satisfies Pick<User, "nickname" | "profileImageUrl">;

const JEGAL = {
  id: "talent-jegal",
  name: "제갈금자",
} satisfies Pick<Talent, "id" | "name">;

const MOGUGU = {
  id: "talent-mogugu",
  name: "모구구",
} satisfies Pick<Talent, "id" | "name">;

const POST = {
  id: "post-2",
  authorId: "user-geumsu",
  talentIds: ["talent-jegal", "talent-mogugu"],
  category: "MEME",
  title: "금자 또 시작했네ㅋㅋㅋㅋ",
  body: "구구 한마디 할 때마다 금자 혈압 오르는 게 화면 밖에서도 보이는 것 같음",
  createdAt: "2026-08-21T12:44:00.000Z",
} satisfies Post;

const meta = {
  title: "Entities/Post/PostCard",
  component: PostCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: POST,
    author: AUTHOR,
    talents: [JEGAL],
  },
};

export const MultiTalent: Story = {
  args: {
    post: POST,
    author: AUTHOR,
    talents: [JEGAL, MOGUGU],
  },
};
