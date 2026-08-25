import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_POSTS } from "@/mocks/posts.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";

import PostCard from "./post-card";
import { POST_CATEGORY_LABELS } from "../../constants";

const POST = MOCK_POSTS.find((post) => post.id === "post-2");

if (!POST) {
  throw new Error("PostCard 테스트에 사용할 Mock Post를 찾을 수 없습니다.");
}

const AUTHOR = findUserById(POST.authorId);

if (!AUTHOR) {
  throw new Error("PostCard 테스트에 사용할 Mock User를 찾을 수 없습니다.");
}

const TALENTS = getTalentsByIds(POST.talentIds);

describe("PostCard", () => {
  it("게시글 정보를 표시한다", () => {
    render(<PostCard post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(screen.getByText(POST.title)).toBeInTheDocument();
    expect(screen.getByText(POST.body)).toBeInTheDocument();
    expect(screen.getByText(AUTHOR.nickname)).toBeInTheDocument();
    expect(screen.getByText(POST_CATEGORY_LABELS[POST.category])).toBeInTheDocument();

    expect(screen.getByText(TALENTS.map((talent) => talent.name).join(" · "))).toBeInTheDocument();
  });

  it("게시글 제목에서 상세 화면으로 이동할 수 있다", () => {
    render(<PostCard post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(
      screen.getByRole("link", {
        name: POST.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.POST(POST.id));
  });

  it("작성자 Identity에서 User Profile로 이동할 수 있다", () => {
    render(<PostCard post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(
      screen.getByRole("link", {
        name: `${AUTHOR.nickname} 프로필 보기`,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(AUTHOR.id));
  });

  it("작성자 Profile 이미지에 대체 텍스트를 제공한다", () => {
    render(<PostCard post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(screen.getByAltText(`${AUTHOR.nickname} 프로필`)).toBeInTheDocument();
  });
});
