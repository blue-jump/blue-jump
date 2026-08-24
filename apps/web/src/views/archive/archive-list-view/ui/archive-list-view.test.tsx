import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_ARCHIVES } from "@/mocks/archives.mock";

import ArchiveListView from "./archive-list-view";

const sortedArchives = [...MOCK_ARCHIVES].sort((leftArchive, rightArchive) => {
  const occurredAtDifference =
    new Date(rightArchive.occurredAt).getTime() - new Date(leftArchive.occurredAt).getTime();

  if (occurredAtDifference !== 0) {
    return occurredAtDifference;
  }

  return leftArchive.id.localeCompare(rightArchive.id);
});

describe("ArchiveListView", () => {
  it("기존 Mock Archive 전체를 표시합니다.", () => {
    render(<ArchiveListView />);

    expect(
      screen.getByRole("heading", {
        name: "아카이브",
        level: 1,
      }),
    ).toBeInTheDocument();

    for (const archive of MOCK_ARCHIVES) {
      expect(
        screen.getByRole("link", {
          name: archive.title,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.ARCHIVE_DETAIL(archive.id));
    }

    expect(
      screen.getByText(`${MOCK_ARCHIVES.length}`, {
        selector: "strong",
      }),
    ).toBeInTheDocument();
  });

  it("Archive를 occurredAt 기준 최근 기록부터 표시합니다.", () => {
    render(<ArchiveListView />);

    for (let index = 0; index < sortedArchives.length - 1; index += 1) {
      const currentArchive = sortedArchives[index];
      const nextArchive = sortedArchives[index + 1];

      if (!currentArchive || !nextArchive) {
        continue;
      }

      const currentLink = screen.getByRole("link", {
        name: currentArchive.title,
      });

      const nextLink = screen.getByRole("link", {
        name: nextArchive.title,
      });

      expect(
        currentLink.compareDocumentPosition(nextLink) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("Archive가 없으면 Empty 상태를 표시합니다.", () => {
    render(<ArchiveListView archives={[]} />);

    expect(screen.getByText("아직 쌓인 기록이 없습니다.")).toBeInTheDocument();

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
