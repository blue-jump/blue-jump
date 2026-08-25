import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_POSTS } from "@/mocks/posts.mock";
import { findUserById } from "@/mocks/sample-data.selectors";
import type { Post, PostCategory } from "@/types";

import CommunityListView from "./community-list-view";

const POST_CATEGORY_LABELS = {
  GENERAL: "일반",
  MEME: "밈",
  QUESTION: "질문",
  INFORMATION: "정보",
} satisfies Record<PostCategory, string>;

const resolvedPosts: Post[] = [...MOCK_POSTS]
  .filter((post) => findUserById(post.authorId))
  .sort(
    (leftPost, rightPost) =>
      new Date(rightPost.createdAt).getTime() - new Date(leftPost.createdAt).getTime(),
  );

const filterTargetPost = resolvedPosts[0];

if (!filterTargetPost) {
  throw new Error("CommunityListView 테스트에 사용할 Mock Post를 찾을 수 없습니다.");
}

describe("CommunityListView", () => {
  it("블루점프 전체 게시글을 표시합니다.", () => {
    render(<CommunityListView />);

    expect(
      screen.getByRole("heading", {
        name: "커뮤니티",
        level: 1,
      }),
    ).toBeInTheDocument();

    for (const post of resolvedPosts) {
      expect(
        screen.getByRole("link", {
          name: post.title,
        }),
      ).toBeInTheDocument();
    }
  });

  it("각 게시글 작성자에서 해당 User Profile로 이동할 수 있습니다.", () => {
    render(<CommunityListView />);

    for (const post of resolvedPosts) {
      const author = findUserById(post.authorId);

      if (!author) {
        throw new Error(`Mock Post 작성자를 찾을 수 없습니다: ${post.authorId}`);
      }

      const postLink = screen.getByRole("link", {
        name: post.title,
      });

      const article = postLink.closest("article");

      if (!article) {
        throw new Error(`PostCard article을 찾을 수 없습니다: ${post.id}`);
      }

      expect(
        within(article).getByRole("link", {
          name: `${author.nickname} 프로필 보기`,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROFILE_DETAIL(author.id));
    }
  });

  it("게시글을 최신 작성 시각 순서로 표시합니다.", () => {
    render(<CommunityListView />);

    for (let index = 0; index < resolvedPosts.length - 1; index += 1) {
      const currentPost = resolvedPosts[index];
      const nextPost = resolvedPosts[index + 1];

      if (!currentPost || !nextPost) {
        continue;
      }

      const currentLink = screen.getByRole("link", {
        name: currentPost.title,
      });

      const nextLink = screen.getByRole("link", {
        name: nextPost.title,
      });

      expect(
        currentLink.compareDocumentPosition(nextLink) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("Category를 선택하면 해당 Category의 게시글만 표시합니다.", async () => {
    const user = userEvent.setup();

    render(<CommunityListView />);

    const category = filterTargetPost.category;

    await user.click(
      screen.getByRole("button", {
        name: POST_CATEGORY_LABELS[category],
      }),
    );

    const expectedPosts = resolvedPosts.filter((post) => post.category === category);
    const hiddenPosts = resolvedPosts.filter((post) => post.category !== category);

    for (const post of expectedPosts) {
      expect(
        screen.getByRole("link", {
          name: post.title,
        }),
      ).toBeInTheDocument();
    }

    for (const post of hiddenPosts) {
      expect(
        screen.queryByRole("link", {
          name: post.title,
        }),
      ).not.toBeInTheDocument();
    }
  });

  it("Filter 결과가 없으면 Empty 상태를 표시합니다.", async () => {
    const user = userEvent.setup();

    const posts = resolvedPosts.filter((post) => post.category === filterTargetPost.category);

    render(<CommunityListView posts={posts} />);

    const emptyCategory = (Object.keys(POST_CATEGORY_LABELS) as PostCategory[]).find(
      (category) => category !== filterTargetPost.category,
    );

    if (!emptyCategory) {
      throw new Error("CommunityListView Empty 상태 테스트에 사용할 Category를 찾을 수 없습니다.");
    }

    await user.click(
      screen.getByRole("button", {
        name: POST_CATEGORY_LABELS[emptyCategory],
      }),
    );

    expect(screen.getByText("선택한 카테고리에 게시글이 없습니다.")).toBeInTheDocument();
  });

  it("게시글이 없으면 Empty 상태를 표시합니다.", () => {
    render(<CommunityListView posts={[]} />);

    expect(screen.getByText("아직 등록된 게시글이 없습니다.")).toBeInTheDocument();

    expect(
      screen.queryByRole("group", {
        name: "게시글 카테고리",
      }),
    ).not.toBeInTheDocument();
  });
});
