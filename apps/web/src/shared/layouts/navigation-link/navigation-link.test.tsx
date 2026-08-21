import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { NavigationItem } from "@/constants";

import NavigationLink from "./navigation-link";

const HOME_ITEM = {
  id: "main",
  label: "메인",
  href: "/",
  available: true,
} satisfies NavigationItem;

const COMMUNITY_ITEM = {
  id: "community",
  label: "커뮤니티",
  href: "/community",
  available: true,
} satisfies NavigationItem;

const UNAVAILABLE_ITEM = {
  id: "creative",
  label: "창작",
  href: "/creative",
  available: false,
} satisfies NavigationItem;

describe("NavigationLink", () => {
  it("현재 경로와 일치하는 링크에 aria-current를 적용한다", () => {
    render(<NavigationLink item={HOME_ITEM} pathname="/" />);

    expect(screen.getByRole("link", { name: "메인" })).toHaveAttribute("aria-current", "page");
  });

  it("하위 경로에서도 해당 메뉴를 현재 항목으로 처리한다", () => {
    render(<NavigationLink item={COMMUNITY_ITEM} pathname="/community/posts/1" />);

    expect(screen.getByRole("link", { name: "커뮤니티" })).toHaveAttribute("aria-current", "page");
  });

  it("사용할 수 없는 항목은 링크로 렌더링하지 않는다", () => {
    render(<NavigationLink item={UNAVAILABLE_ITEM} pathname="/" />);

    expect(screen.queryByRole("link", { name: "창작" })).not.toBeInTheDocument();

    expect(screen.getByText("창작")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("창작")).toHaveAttribute("title", "준비 중");
  });

  it("이동 가능한 항목을 선택하면 onNavigate를 실행한다", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<NavigationLink item={COMMUNITY_ITEM} pathname="/" onNavigate={onNavigate} />);

    await user.click(screen.getByRole("link", { name: "커뮤니티" }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});
