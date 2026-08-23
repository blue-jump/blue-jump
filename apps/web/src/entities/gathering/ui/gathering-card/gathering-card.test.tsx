import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";

import GatheringCard from "./gathering-card";

const openGathering = MOCK_GATHERINGS.find((gathering) => gathering.id === "gathering-haroha-work");

if (!openGathering) {
  throw new Error("GatheringCard 테스트에 사용할 OPEN Gathering을 찾을 수 없습니다.");
}

const fullGathering = MOCK_GATHERINGS.find(
  (gathering) => gathering.id === "gathering-fourth-generation",
);

if (!fullGathering) {
  throw new Error("GatheringCard 테스트에 사용할 FULL Gathering을 찾을 수 없습니다.");
}

const openGatheringTalents = getTalentsByIds(openGathering.talentIds);
const fullGatheringTalents = getTalentsByIds(fullGathering.talentIds);

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  weekday: "short",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

describe("GatheringCard", () => {
  it("모임의 일정, 장소와 주요 정보를 표시합니다.", () => {
    render(<GatheringCard gathering={openGathering} talents={openGatheringTalents} />);

    expect(
      screen.getByRole("heading", {
        name: openGathering.title,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(openGathering.description)).toBeInTheDocument();
    expect(screen.getByText(openGathering.location)).toBeInTheDocument();

    const startsAt = new Date(openGathering.startsAt);

    expect(screen.getByText(DATE_FORMATTER.format(startsAt))).toHaveAttribute(
      "datetime",
      openGathering.startsAt,
    );

    expect(screen.getByText(TIME_FORMATTER.format(startsAt))).toBeInTheDocument();

    expect(
      screen.getByText(`${openGathering.participantIds.length} / ${openGathering.capacity}명`),
    ).toBeInTheDocument();

    const relatedTalentNames = openGatheringTalents.map((talent) => talent.name).join(" · ");

    expect(screen.getByText(relatedTalentNames)).toBeInTheDocument();
  });

  it("참가 가능한 모임은 OPEN 상태를 표시합니다.", () => {
    render(<GatheringCard gathering={openGathering} talents={openGatheringTalents} />);

    expect(screen.getByText("참가 가능")).toBeInTheDocument();
  });

  it("정원이 찬 모임은 FULL 상태를 표시합니다.", () => {
    render(<GatheringCard gathering={fullGathering} talents={fullGatheringTalents} />);

    expect(screen.getByText("마감")).toBeInTheDocument();

    expect(
      screen.getByText(`${fullGathering.participantIds.length} / ${fullGathering.capacity}명`),
    ).toBeInTheDocument();
  });
});
