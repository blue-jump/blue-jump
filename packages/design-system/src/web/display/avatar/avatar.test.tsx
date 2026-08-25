import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Avatar from "./avatar";

describe("Avatar", () => {
  it("src가 존재하면 이미지를 렌더링한다", () => {
    render(<Avatar src="/profile.webp" alt="대월향" fallback="대" />);

    expect(screen.getByRole("img", { name: "대월향" })).toHaveAttribute("src", "/profile.webp");
  });

  it("src가 없으면 fallback을 렌더링한다", () => {
    render(<Avatar alt="대월향" fallback="대" />);

    expect(screen.getByText("대")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "대월향" })).toBeInTheDocument();
  });

  it("이미지 로딩에 실패하면 fallback으로 전환한다", () => {
    render(<Avatar src="/broken.webp" alt="대월향" fallback="대" />);

    fireEvent.error(screen.getByRole("img", { name: "대월향" }));

    expect(screen.queryByRole("img", { name: "대월향" })).toBeInTheDocument();
    expect(screen.getByText("대")).toBeInTheDocument();
  });

  it("alt가 비어 있으면 fallback을 장식 요소로 렌더링한다", () => {
    render(<Avatar fallback="BJ" />);

    expect(screen.getByText("BJ")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
