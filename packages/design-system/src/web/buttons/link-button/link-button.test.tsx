import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LinkButton from "./link-button";

describe("LinkButton", () => {
  it("기본적으로 anchor 요소로 렌더링한다", () => {
    render(<LinkButton href="/community">커뮤니티</LinkButton>);

    expect(screen.getByRole("link", { name: "커뮤니티" })).toHaveAttribute("href", "/community");
  });

  it("anchor 속성을 그대로 전달한다", () => {
    render(
      <LinkButton href="https://example.com" target="_blank" rel="noreferrer">
        외부 링크
      </LinkButton>,
    );

    const link = screen.getByRole("link", { name: "외부 링크" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("추가 className을 전달한다", () => {
    render(
      <LinkButton href="/" className="custom-class">
        홈
      </LinkButton>,
    );

    expect(screen.getByRole("link", { name: "홈" })).toHaveClass("custom-class");
  });
});
