import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SAMPLE_DEMO_USER_ID, URLS } from "@/constants";
import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";
import type { Gathering } from "@/types";

import GatheringDetailView from "./gathering-detail-view";

const gathering = MOCK_GATHERINGS.find(
  (gathering) =>
    gathering.status === "OPEN" &&
    gathering.participantIds.length < gathering.capacity &&
    !gathering.participantIds.includes(SAMPLE_DEMO_USER_ID) &&
    Boolean(findUserById(gathering.organizerId)),
);

if (!gathering) {
  throw new Error(
    "GatheringDetailView 테스트에 사용할 참가 가능한 Mock Gathering을 찾을 수 없습니다.",
  );
}

const organizer = findUserById(gathering.organizerId);

if (!organizer) {
  throw new Error(
    `GatheringDetailView 테스트에 사용할 Organizer를 찾을 수 없습니다: ${gathering.organizerId}`,
  );
}

const participants = getUsersByIds(gathering.participantIds);
const talents = getTalentsByIds(gathering.talentIds);

describe("GatheringDetailView", () => {
  it("선택된 Gathering과 기존 Relation을 조합해 표시합니다.", () => {
    render(<GatheringDetailView gathering={gathering} />);

    expect(
      screen.getByRole("heading", {
        name: gathering.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(gathering.description)).toBeInTheDocument();

    expect(screen.getByText(gathering.location)).toBeInTheDocument();

    const organizerHeading = screen.getByRole("heading", {
      name: "주최자",
    });

    const organizerSection = organizerHeading.closest("section");

    if (!organizerSection) {
      throw new Error("Gathering Organizer 영역을 찾을 수 없습니다.");
    }

    expect(
      within(organizerSection).getByRole("link", {
        name: new RegExp(organizer.nickname),
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(organizer.id));

    const participantHeading = screen.getByRole("heading", {
      name: "참가자",
    });

    const participantSection = participantHeading.closest("section");

    if (!participantSection) {
      throw new Error("Gathering Participant 영역을 찾을 수 없습니다.");
    }

    for (const participant of participants) {
      expect(
        within(participantSection).getByRole("link", {
          name: new RegExp(participant.nickname),
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(participant.id));
    }

    for (const talent of talents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("Gathering Detail과 참가 Demo를 함께 조립합니다.", () => {
    render(<GatheringDetailView gathering={gathering} />);

    expect(
      screen.getByRole("heading", {
        name: gathering.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "모임 참가",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "참가하기",
      }),
    ).toBeInTheDocument();
  });

  it("참가하기를 선택하면 Detail View 안에서 참가 중 상태로 전환합니다.", async () => {
    const user = userEvent.setup();

    render(<GatheringDetailView gathering={gathering} />);

    await user.click(
      screen.getByRole("button", {
        name: "참가하기",
      }),
    );

    expect(screen.getByText("이 모임에 참가 중입니다.")).toBeInTheDocument();

    expect(screen.getByText("참가 중")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "참가하기",
      }),
    ).not.toBeInTheDocument();
  });

  it("존재하지 않는 Participant와 Talent Relation은 임의 데이터로 대체하지 않습니다.", () => {
    const gatheringWithMissingRelations: Gathering = {
      ...gathering,
      participantIds: [...gathering.participantIds, "user-does-not-exist"],
      talentIds: [...gathering.talentIds, "talent-does-not-exist"],
    };

    const resolvedParticipants = getUsersByIds(gatheringWithMissingRelations.participantIds);

    const resolvedTalents = getTalentsByIds(gatheringWithMissingRelations.talentIds);

    render(<GatheringDetailView gathering={gatheringWithMissingRelations} />);

    const participantHeading = screen.getByRole("heading", {
      name: "참가자",
    });

    const participantSection = participantHeading.closest("section");

    if (!participantSection) {
      throw new Error("Gathering Participant 영역을 찾을 수 없습니다.");
    }

    expect(
      within(participantSection).getByText(`${resolvedParticipants.length}명`),
    ).toBeInTheDocument();

    for (const participant of resolvedParticipants) {
      expect(
        within(participantSection).getByRole("link", {
          name: new RegExp(participant.nickname),
        }),
      ).toBeInTheDocument();
    }

    for (const talent of resolvedTalents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toBeInTheDocument();
    }

    expect(screen.queryByText("user-does-not-exist")).not.toBeInTheDocument();

    expect(screen.queryByText("talent-does-not-exist")).not.toBeInTheDocument();
  });

  it("Organizer Relation을 해결할 수 없으면 임의의 주최자를 표시하지 않습니다.", () => {
    const gatheringWithoutOrganizer: Gathering = {
      ...gathering,
      organizerId: "user-does-not-exist",
    };

    render(<GatheringDetailView gathering={gatheringWithoutOrganizer} />);

    expect(screen.getByText("모임 주최자 정보를 확인할 수 없습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: gatheringWithoutOrganizer.title,
        level: 1,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "모임 참가",
      }),
    ).not.toBeInTheDocument();
  });
});
