import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_ARCHIVES } from "@/mocks/archives.mock";
import {
  findCreativeById,
  findPostById,
  findProjectById,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import type { Creative, Post, Project } from "@/types";

import ArchiveDetail from "./archive-detail";
import { ARCHIVE_CATEGORY_LABELS } from "../../constants";

const archive = MOCK_ARCHIVES.find(
  (archive) => archive.id === "archive-blue-jump-fourth-generation",
);

if (!archive) {
  throw new Error("ArchiveDetail 테스트에 사용할 Mock Archive를 찾을 수 없습니다.");
}

const talents = getTalentsByIds(archive.talentIds);

const posts: Post[] = (archive.relatedPostIds ?? []).flatMap((postId) => {
  const post = findPostById(postId);

  return post ? [post] : [];
});

const creatives: Creative[] = (archive.relatedCreativeIds ?? []).flatMap((creativeId) => {
  const creative = findCreativeById(creativeId);

  return creative ? [creative] : [];
});

const projects: Project[] = (archive.relatedProjectIds ?? []).flatMap((projectId) => {
  const project = findProjectById(projectId);

  return project ? [project] : [];
});

describe("ArchiveDetail", () => {
  it("Archive의 제목, Category, 설명과 발생 시점을 표시합니다.", () => {
    render(
      <ArchiveDetail
        archive={archive}
        talents={talents}
        posts={posts}
        creatives={creatives}
        projects={projects}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: archive.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(archive.summary)).toBeInTheDocument();

    expect(screen.getByText(ARCHIVE_CATEGORY_LABELS[archive.category])).toBeInTheDocument();

    expect(screen.getByRole("time")).toHaveAttribute("datetime", archive.occurredAt);
  });

  it("관련 멤버에서 Talent Community로 이동할 수 있습니다.", () => {
    render(
      <ArchiveDetail
        archive={archive}
        talents={talents}
        posts={posts}
        creatives={creatives}
        projects={projects}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "관련 멤버",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Archive 관련 멤버 영역을 찾을 수 없습니다.");
    }

    for (const talent of talents) {
      expect(
        within(section).getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("관련 Post에서 기존 Post Detail로 이동할 수 있습니다.", () => {
    render(
      <ArchiveDetail
        archive={archive}
        talents={talents}
        posts={posts}
        creatives={creatives}
        projects={projects}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "게시글",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Archive 관련 Post 영역을 찾을 수 없습니다.");
    }

    for (const post of posts) {
      expect(
        within(section).getByRole("link", {
          name: post.title,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.POST(post.id));
    }
  });

  it("관련 Creative에서 기존 Creative Detail로 이동할 수 있습니다.", () => {
    render(
      <ArchiveDetail
        archive={archive}
        talents={talents}
        posts={posts}
        creatives={creatives}
        projects={projects}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "팬 창작",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Archive 관련 Creative 영역을 찾을 수 없습니다.");
    }

    for (const creative of creatives) {
      expect(
        within(section).getByRole("link", {
          name: creative.title,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.CREATIVE_DETAIL(creative.id));
    }
  });

  it("관련 Project에서 Project Detail로 이동할 수 있습니다.", () => {
    render(
      <ArchiveDetail
        archive={archive}
        talents={talents}
        posts={posts}
        creatives={creatives}
        projects={projects}
      />,
    );

    const heading = screen.getByRole("heading", {
      name: "프로젝트",
    });

    const section = heading.closest("section");

    if (!section) {
      throw new Error("Archive 관련 Project 영역을 찾을 수 없습니다.");
    }

    for (const project of projects) {
      expect(
        within(section).getByRole("link", {
          name: project.title,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROJECT_DETAIL(project.id));
    }
  });

  it("Related Content가 없으면 자연스러운 Empty 상태를 표시합니다.", () => {
    render(
      <ArchiveDetail archive={archive} talents={talents} posts={[]} creatives={[]} projects={[]} />,
    );

    expect(screen.getByText("이 기록과 직접 연결된 콘텐츠는 아직 없습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "게시글",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "팬 창작",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "프로젝트",
      }),
    ).not.toBeInTheDocument();
  });

  it("관련 Talent가 없으면 임의의 멤버를 표시하지 않습니다.", () => {
    render(
      <ArchiveDetail
        archive={archive}
        talents={[]}
        posts={posts}
        creatives={creatives}
        projects={projects}
      />,
    );

    expect(screen.getByText("연결된 멤버 정보가 없습니다.")).toBeInTheDocument();
  });
});
