import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_ARCHIVES } from "@/mocks/archives.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";

import ArchiveCard from "./archive-card";
import { ARCHIVE_CATEGORY_LABELS } from "../../constants";

const historyArchive = MOCK_ARCHIVES.find(
  (archive) => archive.id === "archive-blue-jump-fourth-generation",
);

if (!historyArchive) {
  throw new Error("ArchiveCard 테스트에 사용할 HISTORY Archive를 찾을 수 없습니다.");
}

const broadcastArchive = MOCK_ARCHIVES.find((archive) => archive.id === "archive-haroha-reaper");

if (!broadcastArchive) {
  throw new Error("ArchiveCard 테스트에 사용할 BROADCAST Archive를 찾을 수 없습니다.");
}

const historyArchiveTalents = getTalentsByIds(historyArchive.talentIds);

const broadcastArchiveTalents = getTalentsByIds(broadcastArchive.talentIds);

const YEAR_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
});

describe("ArchiveCard", () => {
  it("기록의 날짜, Category, 제목, 요약과 관련 Talent를 표시합니다.", () => {
    render(<ArchiveCard archive={historyArchive} talents={historyArchiveTalents} />);

    const occurredAt = new Date(historyArchive.occurredAt);

    expect(screen.getByText(YEAR_FORMATTER.format(occurredAt))).toBeInTheDocument();

    expect(screen.getByText(DATE_FORMATTER.format(occurredAt))).toBeInTheDocument();

    expect(screen.getByText(DATE_FORMATTER.format(occurredAt)).closest("time")).toHaveAttribute(
      "datetime",
      historyArchive.occurredAt,
    );

    expect(screen.getByText(ARCHIVE_CATEGORY_LABELS[historyArchive.category])).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: historyArchive.title,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(historyArchive.summary)).toBeInTheDocument();

    const relatedTalentNames = historyArchiveTalents.map((talent) => talent.name).join(" · ");

    expect(screen.getByText(relatedTalentNames)).toBeInTheDocument();
  });

  it("Archive 제목에서 상세 화면으로 이동할 수 있습니다.", () => {
    render(<ArchiveCard archive={historyArchive} talents={historyArchiveTalents} />);

    expect(
      screen.getByRole("link", {
        name: historyArchive.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.ARCHIVE_DETAIL(historyArchive.id));
  });

  it("방송 기록의 Category를 구분하여 표시합니다.", () => {
    render(<ArchiveCard archive={broadcastArchive} talents={broadcastArchiveTalents} />);

    expect(
      screen.getByText(ARCHIVE_CATEGORY_LABELS[broadcastArchive.category]),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: broadcastArchive.title,
      }),
    ).toBeInTheDocument();
  });
});
