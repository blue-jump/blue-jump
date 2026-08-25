import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MOCK_POSTS } from "@/mocks/posts.mock";
import { getReactionsByTarget } from "@/mocks/sample-data.selectors";
import { MOCK_USERS } from "@/mocks/users.mock";
import type { Reaction } from "@/types";

import PostReactionDemo from "./post-reaction-demo";

const post = MOCK_POSTS.find((post) => getReactionsByTarget("POST", post.id).length > 0);

if (!post) {
  throw new Error(
    "PostReactionDemo 테스트에 사용할 Reaction이 연결된 Mock Post를 찾을 수 없습니다.",
  );
}

const mockReaction = getReactionsByTarget("POST", post.id)[0];

if (!mockReaction) {
  throw new Error("PostReactionDemo 테스트에 사용할 Mock Reaction을 찾을 수 없습니다.");
}

const currentUser = MOCK_USERS[0];

if (!currentUser) {
  throw new Error("PostReactionDemo 테스트에 사용할 Mock User를 찾을 수 없습니다.");
}

const unselectedReaction: Reaction = {
  ...mockReaction,
  userIds: mockReaction.userIds.filter((userId) => userId !== currentUser.id),
};

const selectedReaction: Reaction = {
  ...mockReaction,
  userIds: Array.from(new Set([...mockReaction.userIds, currentUser.id])),
};

describe("PostReactionDemo", () => {
  it("Post에 연결된 Reaction과 참여 수를 표시합니다.", () => {
    render(<PostReactionDemo reactions={[unselectedReaction]} currentUserId={currentUser.id} />);

    expect(
      screen.getByRole("button", {
        name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length}명`,
      }),
    ).toBeInTheDocument();
  });

  it("Reaction을 선택하면 선택 상태와 참여 수가 증가합니다.", async () => {
    const user = userEvent.setup();

    render(<PostReactionDemo reactions={[unselectedReaction]} currentUserId={currentUser.id} />);

    const button = screen.getByRole("button", {
      name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length}명`,
    });

    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);

    expect(
      screen.getByRole("button", {
        name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length + 1}명, 선택됨`,
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("선택한 Reaction을 다시 선택하면 원래 상태로 돌아갑니다.", async () => {
    const user = userEvent.setup();

    render(<PostReactionDemo reactions={[unselectedReaction]} currentUserId={currentUser.id} />);

    const button = screen.getByRole("button", {
      name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length}명`,
    });

    await user.click(button);

    const selectedButton = screen.getByRole("button", {
      name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length + 1}명, 선택됨`,
    });

    await user.click(selectedButton);

    expect(
      screen.getByRole("button", {
        name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length}명`,
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("이미 참여한 Reaction을 해제하면 참여 수가 감소합니다.", async () => {
    const user = userEvent.setup();

    render(<PostReactionDemo reactions={[selectedReaction]} currentUserId={currentUser.id} />);

    const button = screen.getByRole("button", {
      name: `${selectedReaction.emoji} 반응 ${selectedReaction.userIds.length}명, 선택됨`,
    });

    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.click(button);

    expect(
      screen.getByRole("button", {
        name: `${selectedReaction.emoji} 반응 ${selectedReaction.userIds.length - 1}명`,
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("여러 Reaction의 선택 상태를 각각 독립적으로 관리합니다.", async () => {
    const user = userEvent.setup();

    const secondReaction: Reaction = {
      ...unselectedReaction,
      id: `${unselectedReaction.id}-second`,
      emoji: unselectedReaction.emoji === "🔥" ? "👏" : "🔥",
    };

    render(
      <PostReactionDemo
        reactions={[unselectedReaction, secondReaction]}
        currentUserId={currentUser.id}
      />,
    );

    const firstButton = screen.getByRole("button", {
      name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length}명`,
    });

    const secondButton = screen.getByRole("button", {
      name: `${secondReaction.emoji} 반응 ${secondReaction.userIds.length}명`,
    });

    await user.click(firstButton);

    expect(
      screen.getByRole("button", {
        name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length + 1}명, 선택됨`,
      }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(secondButton).toHaveAttribute("aria-pressed", "false");
  });

  it("Keyboard로 Reaction을 선택할 수 있습니다.", async () => {
    const user = userEvent.setup();

    render(<PostReactionDemo reactions={[unselectedReaction]} currentUserId={currentUser.id} />);

    const button = screen.getByRole("button", {
      name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length}명`,
    });

    button.focus();

    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", {
        name: `${unselectedReaction.emoji} 반응 ${unselectedReaction.userIds.length + 1}명, 선택됨`,
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("Reaction이 없으면 아무것도 표시하지 않습니다.", () => {
    const { container } = render(
      <PostReactionDemo reactions={[]} currentUserId={currentUser.id} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
