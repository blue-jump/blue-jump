import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "./button";

describe("Button", () => {
  it("기본적으로 button 타입으로 렌더링한다", () => {
    render(<Button>확인</Button>);

    expect(screen.getByRole("button", { name: "확인" })).toHaveAttribute("type", "button");
  });

  it("클릭 이벤트를 전달한다", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>확인</Button>);

    await user.click(screen.getByRole("button", { name: "확인" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서는 클릭 이벤트를 실행하지 않는다", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        확인
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "확인" }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("추가 HTML 속성과 className을 전달한다", () => {
    render(
      <Button className="custom-class" data-testid="button">
        확인
      </Button>,
    );

    expect(screen.getByTestId("button")).toHaveClass("custom-class");
  });
});
