import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SAMPLE_DEMO_USER_ID } from "@/constants";
import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { MOCK_USERS } from "@/mocks/users.mock";

import GatheringParticipationDemo from "./gathering-participation-demo";

const openGathering = MOCK_GATHERINGS.find(
  (gathering) =>
    gathering.status === "OPEN" &&
    gathering.participantIds.length < gathering.capacity &&
    !gathering.participantIds.includes(SAMPLE_DEMO_USER_ID),
);

if (!openGathering) {
  throw new Error(
    "GatheringParticipationDemo 테스트에 사용할 참가 가능한 Mock Gathering을 찾을 수 없습니다.",
  );
}

const participatingGathering = MOCK_GATHERINGS.find((gathering) =>
  gathering.participantIds.includes(SAMPLE_DEMO_USER_ID),
);

if (!participatingGathering) {
  throw new Error(
    "GatheringParticipationDemo 테스트에 사용할 Demo User 참가 Gathering을 찾을 수 없습니다.",
  );
}

const fullGathering = MOCK_GATHERINGS.find((gathering) => gathering.status === "FULL");

if (!fullGathering) {
  throw new Error(
    "GatheringParticipationDemo 테스트에 사용할 FULL Mock Gathering을 찾을 수 없습니다.",
  );
}

const fullGatheringNonParticipant = MOCK_USERS.find(
  (user) => !fullGathering.participantIds.includes(user.id),
);

if (!fullGatheringNonParticipant) {
  throw new Error(
    `GatheringParticipationDemo 테스트에 사용할 FULL Gathering 미참여 User를 찾을 수 없습니다: ${fullGathering.id}`,
  );
}

describe("GatheringParticipationDemo", () => {
  it("OPEN 상태이고 정원이 남아 있으며 현재 User가 미참여라면 참가하기를 제공합니다.", () => {
    render(
      <GatheringParticipationDemo gathering={openGathering} currentUserId={SAMPLE_DEMO_USER_ID} />,
    );

    expect(
      screen.getByRole("heading", {
        name: "모임 참가",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("샘플에서는 별도의 신청이나 승인 없이 참가 상태만 확인합니다."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "참가하기",
      }),
    ).toBeInTheDocument();

    expect(screen.queryByText("참가 중")).not.toBeInTheDocument();
  });

  it("참가하기를 선택하면 Client State에서 참가 중으로 전환합니다.", async () => {
    const user = userEvent.setup();

    render(
      <GatheringParticipationDemo gathering={openGathering} currentUserId={SAMPLE_DEMO_USER_ID} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "참가하기",
      }),
    );

    expect(screen.getByText("이 모임에 참가 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참가 중")).toBeInTheDocument();

    expect(
      screen.getByText("참가 상태는 현재 화면에서만 유지되며 새로고침하면 초기 상태로 돌아갑니다."),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참가하기",
      }),
    ).not.toBeInTheDocument();
  });

  it("참가 Demo는 기존 participantIds를 변경하지 않습니다.", async () => {
    const user = userEvent.setup();
    const participantIdsBefore = [...openGathering.participantIds];

    render(
      <GatheringParticipationDemo gathering={openGathering} currentUserId={SAMPLE_DEMO_USER_ID} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "참가하기",
      }),
    );

    expect(openGathering.participantIds).toEqual(participantIdsBefore);

    expect(openGathering.participantIds).not.toContain(SAMPLE_DEMO_USER_ID);
  });

  it("현재 Demo User가 participantIds에 존재하면 처음부터 참가 중으로 표시합니다.", () => {
    render(
      <GatheringParticipationDemo
        gathering={participatingGathering}
        currentUserId={SAMPLE_DEMO_USER_ID}
      />,
    );

    expect(screen.getByText("이 모임에 참가 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참가 중")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참가하기",
      }),
    ).not.toBeInTheDocument();
  });

  it("FULL 상태이고 현재 User가 미참여라면 추가 참가를 제공하지 않습니다.", () => {
    render(
      <GatheringParticipationDemo
        gathering={fullGathering}
        currentUserId={fullGatheringNonParticipant.id}
      />,
    );

    expect(screen.getByText("참가 정원이 모두 찼습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참가하기",
      }),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("참가 중")).not.toBeInTheDocument();
  });

  it("FULL 상태여도 기존 참가자는 참가 중으로 표시합니다.", () => {
    const participantId = fullGathering.participantIds[0];

    if (!participantId) {
      throw new Error(
        `GatheringParticipationDemo 테스트에 사용할 기존 참가자를 찾을 수 없습니다: ${fullGathering.id}`,
      );
    }

    render(<GatheringParticipationDemo gathering={fullGathering} currentUserId={participantId} />);

    expect(screen.getByText("이 모임에 참가 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참가 중")).toBeInTheDocument();

    expect(screen.queryByText("참가 정원이 모두 찼습니다.")).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참가하기",
      }),
    ).not.toBeInTheDocument();
  });

  it("COMPLETED 상태에서는 참가 CTA를 제공하지 않습니다.", () => {
    render(
      <GatheringParticipationDemo
        gathering={{
          ...openGathering,
          status: "COMPLETED",
        }}
        currentUserId={SAMPLE_DEMO_USER_ID}
      />,
    );

    expect(screen.getByText("종료된 모임입니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참가하기",
      }),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("참가 중")).not.toBeInTheDocument();
  });
});
