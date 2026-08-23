"use client";

import { useState } from "react";

import { PostCard } from "@/entities/post";
import {
  filterPostsByCategory,
  PostCategoryFilter,
  type PostCategoryFilterValue,
} from "@/features/community";
import type { Post, Talent, User } from "@/types";

export interface CommunityPostFeedItem {
  post: Post;
  author: Pick<User, "nickname" | "profileImageUrl">;
  talents: Pick<Talent, "id" | "name">[];
}

export interface CommunityPostFeedProps {
  items: readonly CommunityPostFeedItem[];
}

export default function CommunityPostFeed({ items }: CommunityPostFeedProps) {
  const [category, setCategory] = useState<PostCategoryFilterValue>("ALL");

  if (items.length === 0) {
    return <p className="text-muted-foreground text-sm">아직 등록된 게시글이 없습니다.</p>;
  }

  const filteredPosts = filterPostsByCategory(
    items.map((item) => item.post),
    category,
  );

  const filteredPostIds = new Set(filteredPosts.map((post) => post.id));

  const filteredItems = items.filter((item) => filteredPostIds.has(item.post.id));

  return (
    <>
      <PostCategoryFilter value={category} onValueChange={setCategory} />

      <div className="mt-6 max-w-3xl">
        <div aria-live="polite" className="mb-4">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground font-semibold">{filteredItems.length}</strong> 개의
            글
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map(({ post, author, talents }) => (
              <PostCard key={post.id} post={post} author={author} talents={talents} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-8 text-sm">선택한 카테고리에 게시글이 없습니다.</p>
        )}
      </div>
    </>
  );
}
