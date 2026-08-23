import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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

describe("CommentItem", () => {
  it("댓글 작성자와 본문을 표시한다", () => {
    render(<CommentItem comment={COMMENT} author={AUTHOR} />);

    expect(screen.getByText(AUTHOR.nickname)).toBeInTheDocument();
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument();
  });

  it("댓글 작성 시각을 time 요소로 제공한다", () => {
    render(<CommentItem comment={COMMENT} author={AUTHOR} />);

    const time = screen.getByText((_, element) => element?.tagName === "TIME");

    expect(time).toHaveAttribute("datetime", COMMENT.createdAt);
  });

  it("작성자 Profile 이미지를 표현한다", () => {
    render(<CommentItem comment={COMMENT} author={AUTHOR} />);

    if (AUTHOR.profileImageUrl) {
      expect(screen.getByAltText(`${AUTHOR.nickname} 프로필`)).toBeInTheDocument();
      return;
    }

    expect(
      screen.getByRole("img", {
        name: `${AUTHOR.nickname} 프로필`,
      }),
    ).toBeInTheDocument();
  });

  it("Profile 이미지가 없으면 작성자 이름을 이용한 대체 표현을 제공한다", () => {
    render(
      <CommentItem
        comment={COMMENT}
        author={{
          ...AUTHOR,
          profileImageUrl: undefined,
        }}
      />,
    );

    expect(
      screen.getByRole("img", {
        name: `${AUTHOR.nickname} 프로필`,
      }),
    ).toBeInTheDocument();
  });
});
