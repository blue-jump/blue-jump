import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MOCK_POSTS } from "@/mocks/posts.mock";

import PostCategoryFilter from "./post-category-filter";

const memePost = MOCK_POSTS.find((post) => post.category === "MEME");

if (!memePost) {
  throw new Error("PostCategoryFilter 테스트에 사용할 MEME Mock Post를 찾을 수 없습니다.");
}

describe("PostCategoryFilter", () => {
  it("전체 Post Category를 표시합니다.", () => {
    render(<PostCategoryFilter value="ALL" onValueChange={() => undefined} />);

    for (const name of ["전체", "일반", "밈", "질문", "정보"]) {
      expect(
        screen.getByRole("button", {
          name,
        }),
      ).toBeInTheDocument();
    }
  });

  it("현재 선택된 Category를 표시합니다.", () => {
    render(<PostCategoryFilter value={memePost.category} onValueChange={() => undefined} />);

    expect(
      screen.getByRole("button", {
        name: "밈",
      }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", {
        name: "전체",
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("Category를 선택하면 변경된 값을 전달합니다.", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PostCategoryFilter value="ALL" onValueChange={onValueChange} />);

    await user.click(
      screen.getByRole("button", {
        name: "밈",
      }),
    );

    expect(onValueChange).toHaveBeenCalledWith("MEME");
  });

  it("Keyboard로 Category를 선택할 수 있습니다.", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PostCategoryFilter value="ALL" onValueChange={onValueChange} />);

    const memeButton = screen.getByRole("button", {
      name: "밈",
    });

    memeButton.focus();

    expect(memeButton).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("MEME");
  });
});
