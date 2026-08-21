import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { NavigationItem } from "@/constants";

import MobileNavigation from "./mobile-navigation";

const ITEMS = [
  {
    id: "main",
    label: "메인",
    href: "/",
    available: true,
  },
  {
    id: "community",
    label: "커뮤니티",
    href: "/community",
    available: false,
  },
  {
    id: "creative",
    label: "창작",
    href: "/creative",
    available: false,
  },
] satisfies NavigationItem[];

const PROFILE_ITEM = {
  id: "profile",
  label: "프로필",
  href: "/profile",
  available: false,
} satisfies NavigationItem;

describe("MobileNavigation", () => {
  it("메뉴 버튼을 선택하면 모바일 내비게이션을 연다", async () => {
    const user = userEvent.setup();

    render(<MobileNavigation items={ITEMS} profileItem={PROFILE_ITEM} pathname="/" />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "주요 메뉴" })).toBeInTheDocument();
  });

  it("메뉴와 프로필 영역을 렌더링한다", async () => {
    const user = userEvent.setup();

    render(<MobileNavigation items={ITEMS} profileItem={PROFILE_ITEM} pathname="/" />);

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));

    expect(screen.getByRole("link", { name: "메인" })).toBeInTheDocument();
    expect(screen.getByText("커뮤니티")).toBeInTheDocument();
    expect(screen.getByText("창작")).toBeInTheDocument();

    expect(screen.getByText("내 공간")).toBeInTheDocument();
    expect(screen.getByText("프로필")).toBeInTheDocument();
  });
});
