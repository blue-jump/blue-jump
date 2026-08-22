import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PortalLayer from "./portal-layer";

describe("PortalLayer", () => {
  it("전체 화면 Portal Layer와 브랜드를 표시합니다.", () => {
    render(<PortalLayer />);

    const portal = screen.getByRole("region", {
      name: "블루점프 포털",
    });

    expect(portal).toBeInTheDocument();
    expect(portal).toHaveClass("fixed", "inset-0");
    expect(within(portal).getByText("BLUE JUMP")).toBeInTheDocument();
  });

  it("Desktop과 Touch 환경을 위한 진입 안내를 제공합니다.", () => {
    render(<PortalLayer />);

    const portal = screen.getByRole("region", {
      name: "블루점프 포털",
    });

    expect(within(portal).getByText("PRESS SPACE TO JUMP")).toBeInTheDocument();
    expect(within(portal).getByText("TOUCH TO JUMP")).toBeInTheDocument();
  });
});
