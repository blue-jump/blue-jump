import type { Post, PostCategory } from "@/types";

export type PostCategoryFilterValue = "ALL" | PostCategory;

export function filterPostsByCategory(
  posts: readonly Post[],
  category: PostCategoryFilterValue,
): Post[] {
  if (category === "ALL") {
    return [...posts];
  }

  return posts.filter((post) => post.category === category);
}
