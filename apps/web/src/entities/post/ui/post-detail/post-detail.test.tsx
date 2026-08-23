import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import type { Post, Talent, User } from "@/types";

import PostDetail from "./post-detail";

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
    slug: "jegal",
  },
  {
    id: "talent-mogugu",
    name: "모구구",
    slug: "mogugu",
  },
] satisfies Pick<Talent, "id" | "name" | "slug">[];

describe("PostDetail", () => {
  it("게시글 상세 정보를 표시한다", () => {
    render(<PostDetail post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(
      screen.getByRole("heading", {
        name: POST.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("밈")).toBeInTheDocument();
    expect(screen.getByText(POST.body)).toBeInTheDocument();
    expect(screen.getByText(AUTHOR.nickname)).toBeInTheDocument();
  });

  it("작성자 Profile 이미지에 대체 텍스트를 제공한다", () => {
    render(<PostDetail post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(screen.getByAltText(`${AUTHOR.nickname} 프로필`)).toBeInTheDocument();
  });

  it("게시글 작성 시각을 time 요소로 제공한다", () => {
    render(<PostDetail post={POST} author={AUTHOR} talents={TALENTS} />);

    const time = screen.getByText((_, element) => {
      return element?.tagName === "TIME";
    });

    expect(time).toHaveAttribute("datetime", POST.createdAt);
  });

  it("관련 멤버를 각각의 Talent Community 링크로 표시한다", () => {
    render(<PostDetail post={POST} author={AUTHOR} talents={TALENTS} />);

    for (const talent of TALENTS) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("관련 멤버가 없으면 관련 멤버 영역을 표시하지 않는다", () => {
    render(<PostDetail post={POST} author={AUTHOR} talents={[]} />);

    expect(screen.queryByText("관련 멤버")).not.toBeInTheDocument();
  });
});
