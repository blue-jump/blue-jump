import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import IconButton from "./icon-button";

describe("IconButton", () => {
  it("aria-label을 접근 가능한 이름으로 사용한다", () => {
    render(<IconButton aria-label="메뉴 열기">☰</IconButton>);

    expect(screen.getByRole("button", { name: "메뉴 열기" })).toBeInTheDocument();
  });

  it("클릭 이벤트를 전달한다", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton aria-label="메뉴 열기" onClick={handleClick}>
        ☰
      </IconButton>,
    );

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서는 클릭 이벤트를 실행하지 않는다", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton aria-label="메뉴 열기" disabled onClick={handleClick}>
        ☰
      </IconButton>,
    );

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
