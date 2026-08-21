import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Drawer from "./drawer";

describe("Drawer", () => {
  it("초기 상태에서는 Drawer 내용을 표시하지 않는다", () => {
    render(
      <Drawer
        trigger={<button type="button">메뉴 열기</button>}
        title="메뉴"
        description="주요 메뉴를 확인합니다."
      >
        <nav>메뉴 내용</nav>
      </Drawer>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Trigger를 선택하면 Drawer를 연다", async () => {
    const user = userEvent.setup();

    render(
      <Drawer
        trigger={<button type="button">메뉴 열기</button>}
        title="메뉴"
        description="주요 메뉴를 확인합니다."
      >
        <nav>메뉴 내용</nav>
      </Drawer>,
    );

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "메뉴" })).toBeInTheDocument();
    expect(screen.getByText("주요 메뉴를 확인합니다.")).toBeInTheDocument();
    expect(screen.getByText("메뉴 내용")).toBeInTheDocument();
  });

  it("닫기 버튼을 선택하면 Drawer를 닫는다", async () => {
    const user = userEvent.setup();

    render(
      <Drawer
        trigger={<button type="button">메뉴 열기</button>}
        title="메뉴"
        description="주요 메뉴를 확인합니다."
      >
        <nav>메뉴 내용</nav>
      </Drawer>,
    );

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));
    await user.click(screen.getByRole("button", { name: "닫기" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("Escape 키로 Drawer를 닫는다", async () => {
    const user = userEvent.setup();

    render(
      <Drawer
        trigger={<button type="button">메뉴 열기</button>}
        title="메뉴"
        description="주요 메뉴를 확인합니다."
      >
        <nav>메뉴 내용</nav>
      </Drawer>,
    );

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
