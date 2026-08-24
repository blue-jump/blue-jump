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
import type { Archive, Creative, Post, Project } from "@/types";

import ArchiveDetailView from "./archive-detail-view";

const archive = MOCK_ARCHIVES.find(
  (archive) =>
    (archive.relatedPostIds?.length ?? 0) > 0 &&
    (archive.relatedCreativeIds?.length ?? 0) > 0 &&
    (archive.relatedProjectIds?.length ?? 0) > 0,
);

if (!archive) {
  throw new Error(
    "ArchiveDetailView 테스트에 사용할 Related Content가 연결된 Mock Archive를 찾을 수 없습니다.",
  );
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

describe("ArchiveDetailView", () => {
  it("선택된 Archive와 관련 Talent Relation을 조합해 표시합니다.", () => {
    render(<ArchiveDetailView archive={archive} />);

    expect(
      screen.getByRole("heading", {
        name: archive.title,
        level: 1,
      }),
    ).toBeInTheDocument();

    const talentHeading = screen.getByRole("heading", {
      name: "관련 멤버",
    });

    const talentSection = talentHeading.closest("section");

    if (!talentSection) {
      throw new Error("Archive 관련 멤버 영역을 찾을 수 없습니다.");
    }

    for (const talent of talents) {
      expect(
        within(talentSection).getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("관련 Post ID를 실제 Post Relation으로 해결합니다.", () => {
    render(<ArchiveDetailView archive={archive} />);

    expect(posts.length).toBeGreaterThan(0);

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

  it("관련 Creative ID를 실제 Creative Relation으로 해결합니다.", () => {
    render(<ArchiveDetailView archive={archive} />);

    expect(creatives.length).toBeGreaterThan(0);

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

  it("관련 Project ID를 실제 Project Relation으로 해결합니다.", () => {
    render(<ArchiveDetailView archive={archive} />);

    expect(projects.length).toBeGreaterThan(0);

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

  it("존재하지 않는 Related Content ID는 임의 데이터로 대체하지 않습니다.", () => {
    const archiveWithMissingRelations: Archive = {
      ...archive,
      relatedPostIds: [...(archive.relatedPostIds ?? []), "post-does-not-exist"],
      relatedCreativeIds: [...(archive.relatedCreativeIds ?? []), "creative-does-not-exist"],
      relatedProjectIds: [...(archive.relatedProjectIds ?? []), "project-does-not-exist"],
    };

    render(<ArchiveDetailView archive={archiveWithMissingRelations} />);

    for (const post of posts) {
      expect(
        screen.getByRole("link", {
          name: post.title,
        }),
      ).toBeInTheDocument();
    }

    for (const creative of creatives) {
      expect(
        screen.getByRole("link", {
          name: creative.title,
        }),
      ).toBeInTheDocument();
    }

    for (const project of projects) {
      expect(
        screen.getByRole("link", {
          name: project.title,
        }),
      ).toBeInTheDocument();
    }

    expect(screen.queryByText("post-does-not-exist")).not.toBeInTheDocument();

    expect(screen.queryByText("creative-does-not-exist")).not.toBeInTheDocument();

    expect(screen.queryByText("project-does-not-exist")).not.toBeInTheDocument();
  });

  it("일부 Related Content가 없으면 존재하는 Relation만 표시합니다.", () => {
    const archiveWithPostsOnly: Archive = {
      ...archive,
      relatedCreativeIds: undefined,
      relatedProjectIds: undefined,
    };

    render(<ArchiveDetailView archive={archiveWithPostsOnly} />);

    expect(
      screen.getByRole("heading", {
        name: "게시글",
      }),
    ).toBeInTheDocument();

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

  it("Related Content가 전혀 없으면 Empty 상태를 표시합니다.", () => {
    const archiveWithoutRelatedContent: Archive = {
      ...archive,
      relatedPostIds: undefined,
      relatedCreativeIds: undefined,
      relatedProjectIds: undefined,
    };

    render(<ArchiveDetailView archive={archiveWithoutRelatedContent} />);

    expect(screen.getByText("이 기록과 직접 연결된 콘텐츠는 아직 없습니다.")).toBeInTheDocument();
  });
});
