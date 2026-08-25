import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getTalentsByIds } from "@/mocks/sample-data.selectors";
import { MOCK_SCHEDULES } from "@/mocks/schedules.mock";

import ScheduleItem from "./schedule-item";

const liveSchedule = MOCK_SCHEDULES.find((schedule) => schedule.id === "schedule-haroha-song");

if (!liveSchedule) {
  throw new Error("ScheduleItem 테스트에 사용할 LIVE Schedule을 찾을 수 없습니다.");
}

const eventSchedule = MOCK_SCHEDULES.find(
  (schedule) => schedule.id === "schedule-fourth-generation",
);

if (!eventSchedule) {
  throw new Error("ScheduleItem 테스트에 사용할 EVENT Schedule을 찾을 수 없습니다.");
}

const liveScheduleTalents = getTalentsByIds(liveSchedule.talentIds);
const eventScheduleTalents = getTalentsByIds(eventSchedule.talentIds);

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "numeric",
  day: "numeric",
  weekday: "short",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

describe("ScheduleItem", () => {
  it("일정 시각과 주요 정보를 표시합니다.", () => {
    render(<ScheduleItem schedule={liveSchedule} talents={liveScheduleTalents} />);

    const startsAt = new Date(liveSchedule.startsAt);

    expect(
      screen.getByRole("heading", {
        name: liveSchedule.title,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(DATE_FORMATTER.format(startsAt))).toBeInTheDocument();
    expect(screen.getByText(TIME_FORMATTER.format(startsAt))).toBeInTheDocument();

    expect(screen.getByText("LIVE")).toBeInTheDocument();

    const relatedTalentNames = liveScheduleTalents.map((talent) => talent.name).join(" · ");

    expect(screen.getByText(relatedTalentNames)).toBeInTheDocument();

    expect(screen.getByText(DATE_FORMATTER.format(startsAt)).closest("time")).toHaveAttribute(
      "datetime",
      liveSchedule.startsAt,
    );
  });

  it("EVENT 일정을 구분하여 표시합니다.", () => {
    render(<ScheduleItem schedule={eventSchedule} talents={eventScheduleTalents} />);

    expect(screen.getByText("EVENT")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: eventSchedule.title,
      }),
    ).toBeInTheDocument();

    const relatedTalentNames = eventScheduleTalents.map((talent) => talent.name).join(" · ");

    expect(screen.getByText(relatedTalentNames)).toBeInTheDocument();
  });
});
