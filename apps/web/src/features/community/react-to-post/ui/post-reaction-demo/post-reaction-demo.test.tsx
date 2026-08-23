import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MOCK_POSTS } from "@/mocks/posts.mock";
import { getReactionsByTarget } from "@/mocks/sample-data.selectors";
import { MOCK_USERS } from "@/mocks/users.mock";

import PostReactionDemo from "./post-reaction-demo";

const post = MOCK_POSTS.find((post) => getReactionsByTarget("POST", post.id).length >= 2);

if (!post) {
  throw new Error(
    "PostReactionDemo 테스트에 사용할 Reaction이 2개 이상 연결된 Mock Post를 찾을 수 없습니다.",
  );
}

const reactions = getReactionsByTarget("POST", post.id);

const reaction = reactions[0];

if (!reaction) {
  throw new Error("PostReactionDemo 테스트에 사용할 Mock Reaction을 찾을 수 없습니다.");
}

const unselectedUser = MOCK_USERS.find((user) => !reaction.userIds.includes(user.id));

if (!unselectedUser) {
  throw new Error("PostReactionDemo 테스트에 사용할 미선택 Mock User를 찾을 수 없습니다.");
}

const selectedUser = MOCK_USERS.find((user) => reaction.userIds.includes(user.id));

describe("PostReactionDemo", () => {
  it("Post에 연결된 Reaction과 참여 수를 표시합니다.", () => {
    render(<PostReactionDemo reactions={reactions} currentUserId={unselectedUser.id} />);

    for (const item of reactions) {
      const selected = item.userIds.includes(unselectedUser.id);

      expect(
        screen.getByRole("button", {
          name: `${item.emoji} 반응 ${item.userIds.length}명${selected ? ", 선택됨" : ""}`,
        }),
      ).toBeInTheDocument();
    }
  });

  it("Reaction을 선택하면 선택 상태와 참여 수가 증가합니다.", async () => {
    const user = userEvent.setup();

    render(<PostReactionDemo reactions={reactions} currentUserId={unselectedUser.id} />);

    const button = screen.getByRole("button", {
      name: `${reaction.emoji} 반응 ${reaction.userIds.length}명`,
    });

    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);

    expect(
      screen.getByRole("button", {
        name: `${reaction.emoji} 반응 ${reaction.userIds.length + 1}명, 선택됨`,
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("선택한 Reaction을 다시 선택하면 참여 수가 원래 상태로 돌아갑니다.", async () => {
    const user = userEvent.setup();

    render(<PostReactionDemo reactions={reactions} currentUserId={unselectedUser.id} />);

    const button = screen.getByRole("button", {
      name: `${reaction.emoji} 반응 ${reaction.userIds.length}명`,
    });

    await user.click(button);

    const selectedButton = screen.getByRole("button", {
      name: `${reaction.emoji} 반응 ${reaction.userIds.length + 1}명, 선택됨`,
    });

    await user.click(selectedButton);

    expect(
      screen.getByRole("button", {
        name: `${reaction.emoji} 반응 ${reaction.userIds.length}명`,
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("이미 참여한 Reaction을 해제하면 참여 수가 감소합니다.", async () => {
    if (!selectedUser) {
      throw new Error("PostReactionDemo 테스트에 사용할 선택 상태의 Mock User를 찾을 수 없습니다.");
    }

    const user = userEvent.setup();

    render(<PostReactionDemo reactions={reactions} currentUserId={selectedUser.id} />);

    const button = screen.getByRole("button", {
      name: `${reaction.emoji} 반응 ${reaction.userIds.length}명, 선택됨`,
    });

    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.click(button);

    expect(
      screen.getByRole("button", {
        name: `${reaction.emoji} 반응 ${reaction.userIds.length - 1}명`,
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("여러 Reaction의 선택 상태를 각각 독립적으로 관리합니다.", async () => {
    const user = userEvent.setup();

    const firstReaction = reactions[0];
    const secondReaction = reactions[1];

    if (!firstReaction || !secondReaction) {
      throw new Error("독립적인 Reaction 상태 테스트를 위해 Reaction이 2개 이상 필요합니다.");
    }

    const currentUser = MOCK_USERS.find(
      (user) =>
        !firstReaction.userIds.includes(user.id) && !secondReaction.userIds.includes(user.id),
    );

    if (!currentUser) {
      throw new Error("독립적인 Reaction 상태 테스트에 사용할 Mock User를 찾을 수 없습니다.");
    }

    render(<PostReactionDemo reactions={reactions} currentUserId={currentUser.id} />);

    const firstButton = screen.getByRole("button", {
      name: `${firstReaction.emoji} 반응 ${firstReaction.userIds.length}명`,
    });

    const secondButton = screen.getByRole("button", {
      name: `${secondReaction.emoji} 반응 ${secondReaction.userIds.length}명`,
    });

    await user.click(firstButton);

    expect(
      screen.getByRole("button", {
        name: `${firstReaction.emoji} 반응 ${firstReaction.userIds.length + 1}명, 선택됨`,
      }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(secondButton).toHaveAttribute("aria-pressed", "false");
  });

  it("Keyboard로 Reaction을 선택할 수 있습니다.", async () => {
    const user = userEvent.setup();

    render(<PostReactionDemo reactions={reactions} currentUserId={unselectedUser.id} />);

    const button = screen.getByRole("button", {
      name: `${reaction.emoji} 반응 ${reaction.userIds.length}명`,
    });

    button.focus();

    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", {
        name: `${reaction.emoji} 반응 ${reaction.userIds.length + 1}명, 선택됨`,
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("Reaction이 없으면 아무것도 표시하지 않습니다.", () => {
    const { container } = render(
      <PostReactionDemo reactions={[]} currentUserId={unselectedUser.id} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
