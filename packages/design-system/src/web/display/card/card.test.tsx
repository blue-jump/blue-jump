import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Card from "./card";

describe("Card", () => {
  it("자식 콘텐츠를 렌더링한다", () => {
    render(
      <Card>
        <h2>팬 프로젝트</h2>
        <p>참여자를 모집하고 있습니다.</p>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "팬 프로젝트" })).toBeInTheDocument();
    expect(screen.getByText("참여자를 모집하고 있습니다.")).toBeInTheDocument();
  });

  it("HTML 속성을 전달한다", () => {
    render(
      <Card data-testid="card" aria-label="프로젝트 카드">
        내용
      </Card>,
    );

    expect(screen.getByTestId("card")).toHaveAttribute("aria-label", "프로젝트 카드");
  });

  it("추가 className을 전달한다", () => {
    render(
      <Card data-testid="card" className="custom-class">
        내용
      </Card>,
    );

    expect(screen.getByTestId("card")).toHaveClass("custom-class");
  });
});
