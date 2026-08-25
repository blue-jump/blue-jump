import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";

import GatheringDetail from "./gathering-detail";
import { GATHERING_STATUS_LABELS } from "../../constants";

const gathering = MOCK_GATHERINGS.find((gathering) => gathering.id === "gathering-haroha-work");

if (!gathering) {
  throw new Error("GatheringDetail 테스트에 사용할 Mock Gathering을 찾을 수 없습니다.");
}

const organizer = findUserById(gathering.organizerId);

if (!organizer) {
  throw new Error(
    `GatheringDetail 테스트에 사용할 Organizer를 찾을 수 없습니다: ${gathering.organizerId}`,
  );
}

const participants = getUsersByIds(gathering.participantIds);
const talents = getTalentsByIds(gathering.talentIds);

describe("GatheringDetail", () => {
  it("Gathering의 상세 정보를 표시합니다.", () => {
    render(
      <GatheringDetail
        gathering={gathering}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: gathering.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(gathering.description)).toBeInTheDocument();

    expect(screen.getByText(GATHERING_STATUS_LABELS[gathering.status])).toBeInTheDocument();

    expect(screen.getByText(gathering.location)).toBeInTheDocument();

    expect(
      screen.getByText(`${participants.length} / ${gathering.capacity}명`),
    ).toBeInTheDocument();
  });

  it("Gathering 일정을 time 요소로 표시합니다.", () => {
    render(
      <GatheringDetail
        gathering={gathering}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    const time = screen.getByRole("time");

    expect(time).toHaveAttribute("datetime", gathering.startsAt);
  });

  it("Organizer에서 해당 User Profile로 이동할 수 있습니다.", () => {
    render(
      <GatheringDetail
        gathering={gathering}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "주최자",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Gathering Organizer 영역을 찾을 수 없습니다.");
    }

    expect(
      within(section).getByRole("link", {
        name: new RegExp(organizer.nickname),
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(organizer.id));
  });

  it("참가자에서 각각의 User Profile로 이동할 수 있습니다.", () => {
    render(
      <GatheringDetail
        gathering={gathering}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "참가자",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Gathering Participant 영역을 찾을 수 없습니다.");
    }

    for (const participant of participants) {
      expect(
        within(section).getByRole("link", {
          name: new RegExp(participant.nickname),
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(participant.id));
    }
  });

  it("관련 멤버에서 각각의 Talent Community로 이동할 수 있습니다.", () => {
    render(
      <GatheringDetail
        gathering={gathering}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    for (const talent of talents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("Participant가 없으면 Empty 상태를 표시합니다.", () => {
    render(
      <GatheringDetail
        gathering={gathering}
        organizer={organizer}
        participants={[]}
        talents={talents}
      />,
    );

    expect(screen.getByText("아직 표시할 참가자가 없습니다.")).toBeInTheDocument();

    expect(screen.getByText(`0 / ${gathering.capacity}명`)).toBeInTheDocument();
  });

  it("COMPLETED 상태는 종료로 표시합니다.", () => {
    render(
      <GatheringDetail
        gathering={{
          ...gathering,
          status: "COMPLETED",
        }}
        organizer={organizer}
        participants={participants}
        talents={talents}
      />,
    );

    expect(screen.getByText(GATHERING_STATUS_LABELS.COMPLETED)).toBeInTheDocument();
  });
});
