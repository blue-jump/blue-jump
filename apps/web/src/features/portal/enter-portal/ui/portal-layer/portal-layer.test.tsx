import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import PortalLayer from "./portal-layer";

function mockReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

describe("PortalLayer", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

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

    expect(screen.getByText("PRESS SPACE TO JUMP")).toBeInTheDocument();
    expect(screen.getByText("TOUCH TO JUMP")).toBeInTheDocument();
  });

  it("Space 입력으로 Portal Transition을 시작합니다.", () => {
    mockReducedMotion(false);

    render(<PortalLayer />);

    const portal = screen.getByRole("region", {
      name: "블루점프 포털",
    });

    fireEvent.keyDown(window, {
      code: "Space",
      key: " ",
    });

    expect(portal).toHaveAttribute("data-state", "opening");
    expect(
      screen.getByRole("button", {
        name: "블루점프 메인으로 진입",
      }),
    ).toBeDisabled();
  });

  it("Pointer 입력으로 Portal Transition을 시작합니다.", () => {
    mockReducedMotion(false);

    render(<PortalLayer />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "블루점프 메인으로 진입",
      }),
    );

    expect(
      screen.getByRole("region", {
        name: "블루점프 포털",
      }),
    ).toHaveAttribute("data-state", "opening");
  });

  it("Transition 중 반복 입력을 허용하지 않습니다.", () => {
    mockReducedMotion(false);

    render(<PortalLayer />);

    const portalButton = screen.getByRole("button", {
      name: "블루점프 메인으로 진입",
    });

    fireEvent.click(portalButton);
    fireEvent.keyDown(window, {
      code: "Space",
      key: " ",
    });
    fireEvent.click(portalButton);

    expect(portalButton).toBeDisabled();
    expect(
      screen.getByRole("region", {
        name: "블루점프 포털",
      }),
    ).toHaveAttribute("data-state", "opening");
  });

  it("Open Transition 완료 후 Portal Layer를 제거합니다.", () => {
    vi.useFakeTimers();
    mockReducedMotion(false);

    render(<PortalLayer />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "블루점프 메인으로 진입",
      }),
    );

    expect(
      screen.getByRole("region", {
        name: "블루점프 포털",
      }),
    ).toHaveAttribute("data-state", "opening");

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(
      screen.queryByRole("region", {
        name: "블루점프 포털",
      }),
    ).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("Reduced Motion 환경에서는 Animation 없이 Main으로 진입합니다.", () => {
    mockReducedMotion(true);

    render(<PortalLayer />);

    fireEvent.keyDown(window, {
      code: "Space",
      key: " ",
    });

    expect(
      screen.queryByRole("region", {
        name: "블루점프 포털",
      }),
    ).not.toBeInTheDocument();
  });
});
