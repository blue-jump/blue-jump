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

    expect(
      screen.getByRole("button", {
        name: "전체",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "일반",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "밈",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "질문",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "정보",
      }),
    ).toBeInTheDocument();
  });

  it("현재 선택된 Category를 aria-pressed로 표시합니다.", () => {
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

  it("현재 선택된 Category에 색상 이외의 선택 표시를 제공합니다.", () => {
    render(<PostCategoryFilter value={memePost.category} onValueChange={() => undefined} />);

    const button = screen.getByRole("button", {
      name: "밈",
    });

    expect(button).toHaveTextContent("✓");
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
