import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Badge from "./badge";

describe("Badge", () => {
  it("콘텐츠를 렌더링한다", () => {
    render(<Badge>LIVE</Badge>);

    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("HTML 속성을 전달한다", () => {
    render(
      <Badge title="현재 방송 중" data-testid="badge">
        LIVE
      </Badge>,
    );

    expect(screen.getByTestId("badge")).toHaveAttribute("title", "현재 방송 중");
  });

  it("추가 className을 전달한다", () => {
    render(<Badge className="custom-class">직원단</Badge>);

    expect(screen.getByText("직원단")).toHaveClass("custom-class");
  });
});
