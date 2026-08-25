import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import FilterOption from "./filter-option";

describe("FilterOption", () => {
  it("Filter Option을 Button으로 표시합니다.", () => {
    render(<FilterOption selected={false}>전체</FilterOption>);

    expect(
      screen.getByRole("button", {
        name: "전체",
      }),
    ).toBeInTheDocument();
  });

  it("선택 상태를 aria-pressed로 표시합니다.", () => {
    render(<FilterOption selected>전체</FilterOption>);

    expect(
      screen.getByRole("button", {
        name: "전체",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("선택되지 않은 상태를 aria-pressed=false로 표시합니다.", () => {
    render(<FilterOption selected={false}>전체</FilterOption>);

    expect(
      screen.getByRole("button", {
        name: "전체",
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("선택 상태에 색상 이외의 시각적 Indicator를 표시합니다.", () => {
    const { rerender } = render(<FilterOption selected>전체</FilterOption>);

    const selectedButton = screen.getByRole("button", {
      name: "전체",
    });

    expect(selectedButton.querySelector('[aria-hidden="true"]')).toBeInTheDocument();

    rerender(<FilterOption selected={false}>전체</FilterOption>);

    const unselectedButton = screen.getByRole("button", {
      name: "전체",
    });

    expect(unselectedButton.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it("Pointer 입력을 전달합니다.", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <FilterOption selected={false} onClick={onClick}>
        전체
      </FilterOption>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "전체",
      }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Keyboard로 선택할 수 있습니다.", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <FilterOption selected={false} onClick={onClick}>
        전체
      </FilterOption>,
    );

    const button = screen.getByRole("button", {
      name: "전체",
    });

    button.focus();

    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서는 Interaction을 허용하지 않습니다.", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <FilterOption selected={false} disabled onClick={onClick}>
        전체
      </FilterOption>,
    );

    const button = screen.getByRole("button", {
      name: "전체",
    });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
