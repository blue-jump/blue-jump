import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ImageFrame from "./image-frame";

describe("ImageFrame", () => {
  it("자식 콘텐츠를 렌더링한다", () => {
    render(
      <ImageFrame>
        <span>이미지 영역</span>
      </ImageFrame>,
    );

    expect(screen.getByText("이미지 영역")).toBeInTheDocument();
  });

  it("HTML 속성을 전달한다", () => {
    render(
      <ImageFrame data-testid="image-frame" aria-label="팬아트 이미지">
        이미지
      </ImageFrame>,
    );

    expect(screen.getByTestId("image-frame")).toHaveAttribute("aria-label", "팬아트 이미지");
  });

  it("추가 className을 전달한다", () => {
    render(
      <ImageFrame data-testid="image-frame" className="custom-class">
        이미지
      </ImageFrame>,
    );

    expect(screen.getByTestId("image-frame")).toHaveClass("custom-class");
  });
});
