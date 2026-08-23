import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import type { Post, Talent, User } from "@/types";

import PostCard from "./post-card";

const POST = {
  id: "post-2",
  authorId: "user-geumsu",
  talentIds: ["talent-jegal", "talent-mogugu"],
  category: "MEME",
  title: "금자 또 시작했네ㅋㅋㅋㅋ",
  body: "구구 한마디 할 때마다 금자 혈압 오르는 게 화면 밖에서도 보이는 것 같음",
  createdAt: "2026-08-21T12:44:00.000Z",
} satisfies Post;

const AUTHOR = {
  nickname: "금자보고벌떡",
  profileImageUrl: "/images/mock/users/geumsu.webp",
} satisfies Pick<User, "nickname" | "profileImageUrl">;

const TALENTS = [
  {
    id: "talent-jegal",
    name: "제갈금자",
  },
  {
    id: "talent-mogugu",
    name: "모구구",
  },
] satisfies Pick<Talent, "id" | "name">[];

describe("PostCard", () => {
  it("게시글 정보를 표시한다", () => {
    render(<PostCard post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(screen.getByText(POST.title)).toBeInTheDocument();
    expect(screen.getByText(POST.body)).toBeInTheDocument();
    expect(screen.getByText(AUTHOR.nickname)).toBeInTheDocument();
    expect(screen.getByText("밈")).toBeInTheDocument();
    expect(screen.getByText("제갈금자 · 모구구")).toBeInTheDocument();
  });

  it("게시글 제목에서 상세 화면으로 이동할 수 있다", () => {
    render(<PostCard post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(
      screen.getByRole("link", {
        name: POST.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.POST(POST.id));
  });

  it("작성자 Profile 이미지에 대체 텍스트를 제공한다", () => {
    render(<PostCard post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(screen.getByAltText(`${AUTHOR.nickname} 프로필`)).toBeInTheDocument();
  });
});
