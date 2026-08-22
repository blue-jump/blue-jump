import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Header from "./header";

const { mockUsePathname } = vi.hoisted(() => ({
  mockUsePathname: vi.fn(() => "/"),
}));

vi.mock("next/navigation", () => ({
  usePathname: mockUsePathname,
}));

describe("Header", () => {
  it("블루점프 브랜드 로고를 메인으로 연결한다", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "블루점프 메인" })).toHaveAttribute("href", "/");

    expect(screen.getByRole("img", { name: "BLUE JUMP" })).toBeInTheDocument();
  });

  it("주요 내비게이션을 렌더링한다", () => {
    render(<Header />);

    const navigation = screen.getByRole("navigation", {
      name: "주요 메뉴",
    });

    expect(navigation).toBeInTheDocument();

    expect(screen.getByText("메인")).toBeInTheDocument();
    expect(screen.getByText("커뮤니티")).toBeInTheDocument();
    expect(screen.getByText("창작")).toBeInTheDocument();
    expect(screen.getByText("프로젝트")).toBeInTheDocument();
    expect(screen.getByText("모임")).toBeInTheDocument();
    expect(screen.getByText("아카이브")).toBeInTheDocument();
    expect(screen.getByText("버튜버")).toBeInTheDocument();
  });

  it("모바일 내비게이션 진입 버튼을 렌더링한다", () => {
    render(<Header />);

    expect(screen.getByRole("button", { name: "메뉴 열기" })).toBeInTheDocument();
  });
});
