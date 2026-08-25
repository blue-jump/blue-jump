import { describe, expect, it } from "vitest";

import { MOCK_POSTS } from "@/mocks/posts.mock";

import { filterPostsByCategory } from "./filter-posts-by-category";

describe("filterPostsByCategory", () => {
  it("전체를 선택하면 모든 Post를 반환합니다.", () => {
    expect(filterPostsByCategory(MOCK_POSTS, "ALL")).toEqual(MOCK_POSTS);
  });

  it("선택한 Category에 해당하는 Post만 반환합니다.", () => {
    const posts = filterPostsByCategory(MOCK_POSTS, "MEME");

    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post.category).toBe("MEME");
    }
  });

  it("해당 Category의 Post가 없으면 빈 배열을 반환합니다.", () => {
    const postsWithoutQuestions = MOCK_POSTS.filter((post) => post.category !== "QUESTION");

    expect(filterPostsByCategory(postsWithoutQuestions, "QUESTION")).toEqual([]);
  });

  it("원본 Post 배열을 변경하지 않습니다.", () => {
    const originalPosts = [...MOCK_POSTS];

    filterPostsByCategory(MOCK_POSTS, "MEME");

    expect(MOCK_POSTS).toEqual(originalPosts);
  });
});
