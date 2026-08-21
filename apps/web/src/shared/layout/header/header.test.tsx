import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Header from "./header";

describe("Header", () => {
  it("헤더를 렌더링한다", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "BLUE JUMP" })).toBeInTheDocument();
  });
});
