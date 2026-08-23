import { CommentItem } from "@/entities/comment";
import { PostDetail } from "@/entities/post";
import { PostReactionDemo } from "@/features/community";
import {
  findUserById,
  getCommentsByPostId,
  getReactionsByTarget,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import { MOCK_USERS } from "@/mocks/users.mock";
import { Container, Section } from "@/shared/layouts";
import type { Comment, Post, User } from "@/types";

export interface PostDetailViewProps {
  post: Post;
}

interface ResolvedComment {
  comment: Comment;
  author: User;
}

function getResolvedComments(postId: Post["id"]): ResolvedComment[] {
  return getCommentsByPostId(postId)
    .flatMap((comment) => {
      const author = findUserById(comment.authorId);

      if (!author) {
        return [];
      }

      return [
        {
          comment,
          author,
        },
      ];
    })
    .sort(
      (leftComment, rightComment) =>
        new Date(leftComment.comment.createdAt).getTime() -
        new Date(rightComment.comment.createdAt).getTime(),
    );
}

export default function PostDetailView({ post }: PostDetailViewProps) {
  const author = findUserById(post.authorId);
  const talents = getTalentsByIds(post.talentIds);
  const comments = getResolvedComments(post.id);
  const reactions = getReactionsByTarget("POST", post.id);
  const demoUser = MOCK_USERS[0];

  if (!author) {
    return (
      <Container>
        <Section spacing="lg">
          <p className="text-muted-foreground text-sm">게시글 작성자 정보를 확인할 수 없습니다.</p>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section spacing="lg">
        <PostDetail post={post} author={author} talents={talents} />

        <div className="mx-auto mt-10 w-full max-w-3xl">
          {reactions.length > 0 && demoUser ? (
            <section
              aria-labelledby="post-reactions-heading"
              className="border-border border-t pt-6"
            >
              <h2 id="post-reactions-heading" className="text-foreground text-base font-semibold">
                반응
              </h2>

              <div className="mt-4">
                <PostReactionDemo reactions={reactions} currentUserId={demoUser.id} />
              </div>
            </section>
          ) : null}

          <section
            aria-labelledby="post-comments-heading"
            className={[
              "border-border border-t pt-6",
              reactions.length > 0 && demoUser ? "mt-8" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="post-comments-heading" className="text-foreground text-lg font-semibold">
                댓글
              </h2>

              <span className="text-muted-foreground text-sm">{comments.length}</span>
            </div>

            {comments.length > 0 ? (
              <div className="mt-3">
                {comments.map(({ comment, author: commentAuthor }) => (
                  <CommentItem key={comment.id} comment={comment} author={commentAuthor} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">아직 댓글이 없습니다.</p>
            )}
          </section>
        </div>
      </Section>
    </Container>
  );
}
