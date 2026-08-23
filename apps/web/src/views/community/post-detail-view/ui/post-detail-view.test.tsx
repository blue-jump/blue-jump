import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_COMMENTS } from "@/mocks/comments.mock";
import { MOCK_POSTS } from "@/mocks/posts.mock";
import {
  findUserById,
  getCommentsByPostId,
  getReactionsByTarget,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import type { Post } from "@/types";

import PostDetailView from "./post-detail-view";

const post = MOCK_POSTS.find((post) => findUserById(post.authorId));

if (!post) {
  throw new Error("PostDetailView 테스트에 사용할 Mock Post를 찾을 수 없습니다.");
}

const author = findUserById(post.authorId);

if (!author) {
  throw new Error(`PostDetailView 테스트에 사용할 Mock User를 찾을 수 없습니다: ${post.authorId}`);
}

const talents = getTalentsByIds(post.talentIds);

const postWithComments = MOCK_POSTS.find(
  (candidate) =>
    Boolean(findUserById(candidate.authorId)) &&
    getCommentsByPostId(candidate.id).some((comment) => Boolean(findUserById(comment.authorId))),
);

if (!postWithComments) {
  throw new Error("PostDetailView 테스트에 사용할 Comment가 연결된 Mock Post를 찾을 수 없습니다.");
}

const postWithReactions = MOCK_POSTS.find(
  (candidate) =>
    Boolean(findUserById(candidate.authorId)) &&
    getReactionsByTarget("POST", candidate.id).length > 0,
);

if (!postWithReactions) {
  throw new Error("PostDetailView 테스트에 사용할 Reaction이 연결된 Mock Post를 찾을 수 없습니다.");
}

describe("PostDetailView", () => {
  it("선택된 Post와 작성자 Relation을 표시합니다.", () => {
    render(<PostDetailView post={post} />);

    const heading = screen.getByRole("heading", {
      name: post.title,
      level: 1,
    });

    const postArticle = heading.closest("article");

    if (!postArticle) {
      throw new Error("Post Detail Article을 찾을 수 없습니다.");
    }

    expect(heading).toBeInTheDocument();
    expect(within(postArticle).getByText(post.body)).toBeInTheDocument();
    expect(within(postArticle).getByText(author.nickname)).toBeInTheDocument();
  });

  it("Post에 연결된 관련 멤버를 Talent Community 링크로 표시합니다.", () => {
    render(<PostDetailView post={post} />);

    for (const talent of talents) {
      expect(
        screen.getByRole("link", {
          name: talent.name,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.TALENT(talent.slug));
    }
  });

  it("현재 Post에 연결된 Comment만 표시합니다.", () => {
    render(<PostDetailView post={postWithComments} />);

    const comments = getCommentsByPostId(postWithComments.id).filter((comment) =>
      Boolean(findUserById(comment.authorId)),
    );

    expect(comments.length).toBeGreaterThan(0);

    for (const comment of comments) {
      const commentBody = screen.getByText(comment.body);
      const commentArticle = commentBody.closest("article");

      if (!commentArticle) {
        throw new Error(`Comment Article을 찾을 수 없습니다: ${comment.id}`);
      }

      const commentAuthor = findUserById(comment.authorId);

      if (!commentAuthor) {
        throw new Error(`Comment 작성자를 찾을 수 없습니다: ${comment.authorId}`);
      }

      expect(commentBody).toBeInTheDocument();
      expect(within(commentArticle).getByText(commentAuthor.nickname)).toBeInTheDocument();
    }

    const unrelatedComment = MOCK_COMMENTS.find(
      (comment) =>
        comment.postId !== postWithComments.id &&
        !comments.some((relatedComment) => relatedComment.body === comment.body),
    );

    if (unrelatedComment) {
      expect(screen.queryByText(unrelatedComment.body)).not.toBeInTheDocument();
    }
  });

  it("현재 Post에 연결된 Reaction만 표시합니다.", () => {
    render(<PostDetailView post={postWithReactions} />);

    const reactions = getReactionsByTarget("POST", postWithReactions.id);

    expect(reactions.length).toBeGreaterThan(0);

    const reactionGroup = screen.getByRole("group", {
      name: "게시글 반응",
    });

    expect(within(reactionGroup).getAllByRole("button")).toHaveLength(reactions.length);

    for (const reaction of reactions) {
      expect(
        within(reactionGroup).getByRole("button", {
          name: new RegExp(`${reaction.emoji} 반응`),
        }),
      ).toBeInTheDocument();
    }
  });

  it("Comment 수를 현재 Post Relation 기준으로 표시합니다.", () => {
    render(<PostDetailView post={postWithComments} />);

    const comments = getCommentsByPostId(postWithComments.id).filter((comment) =>
      Boolean(findUserById(comment.authorId)),
    );

    const commentsHeading = screen.getByRole("heading", {
      name: "댓글",
      level: 2,
    });

    const commentsSection = commentsHeading.closest("section");

    if (!commentsSection) {
      throw new Error("Comment Section을 찾을 수 없습니다.");
    }

    expect(within(commentsSection).getByText(String(comments.length))).toBeInTheDocument();
  });

  it("Comment가 없는 Post에서는 Empty 상태를 표시합니다.", () => {
    const postWithoutComments: Post = {
      ...post,
      id: `${post.id}-without-comments`,
    };

    render(<PostDetailView post={postWithoutComments} />);

    expect(screen.getByText("아직 댓글이 없습니다.")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: postWithoutComments.title,
        level: 1,
      }),
    ).toBeInTheDocument();
  });
});
