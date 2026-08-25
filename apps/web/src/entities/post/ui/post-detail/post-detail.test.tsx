import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_POSTS } from "@/mocks/posts.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";

import PostDetail from "./post-detail";
import { POST_CATEGORY_LABELS } from "../../constants";

const POST = MOCK_POSTS.find((post) => post.id === "post-2");

if (!POST) {
  throw new Error("PostDetail 테스트에 사용할 Mock Post를 찾을 수 없습니다.");
}

const AUTHOR = findUserById(POST.authorId);

if (!AUTHOR) {
  throw new Error("PostDetail 테스트에 사용할 Mock User를 찾을 수 없습니다.");
}

const TALENTS = getTalentsByIds(POST.talentIds);

describe("PostDetail", () => {
  it("게시글 상세 정보를 표시한다", () => {
    render(<PostDetail post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(
      screen.getByRole("heading", {
        name: POST.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(POST_CATEGORY_LABELS[POST.category])).toBeInTheDocument();
    expect(screen.getByText(POST.body)).toBeInTheDocument();
    expect(screen.getByText(AUTHOR.nickname)).toBeInTheDocument();
  });

  it("작성자 Identity에서 User Profile로 이동할 수 있다", () => {
    render(<PostDetail post={POST} author={AUTHOR} talents={TALENTS} />);

    expect(
      screen.getByRole("link", {
        name: `${AUTHOR.nickname} 프로필 보기`,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(AUTHOR.id));
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
