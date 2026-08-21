import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";

import HeaderView from "./header-view";

describe("HeaderView", () => {
  it("헤더 랜드마크를 렌더링한다", () => {
    render(<HeaderView />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("브랜드 링크를 홈으로 연결한다", () => {
    render(<HeaderView />);

    expect(screen.getByRole("link", { name: "BLUE JUMP" })).toHaveAttribute(
      "href",
      URLS.CLIENT.HOME,
    );
  });
});
