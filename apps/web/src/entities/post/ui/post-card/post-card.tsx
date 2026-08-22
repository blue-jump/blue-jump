import Image from "next/image";

import type { Post, Talent, User } from "@/types";

interface PostCardProps {
  post: Post;
  author: Pick<User, "nickname" | "profileImageUrl">;
  talents: Pick<Talent, "id" | "name">[];
}

const POST_CATEGORY_LABELS = {
  GENERAL: "일반",
  MEME: "밈",
  QUESTION: "질문",
  INFORMATION: "정보",
} satisfies Record<Post["category"], string>;

const POST_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function PostCard({ post, author, talents }: PostCardProps) {
  const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");

  return (
    <article className="border-border bg-surface rounded-lg border px-5 py-4">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-muted relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {author.profileImageUrl ? (
              <Image
                src={author.profileImageUrl}
                alt={`${author.nickname} 프로필`}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-sm font-medium" aria-hidden="true">
                {author.nickname.slice(0, 1)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium">{author.nickname}</p>

            <time dateTime={post.createdAt} className="text-muted-foreground mt-0.5 block text-xs">
              {POST_DATE_FORMATTER.format(new Date(post.createdAt))}
            </time>
          </div>
        </div>

        <span className="text-muted-foreground shrink-0 text-xs">
          {POST_CATEGORY_LABELS[post.category]}
        </span>
      </header>

      <div className="mt-4">
        <h3 className="text-foreground text-lg leading-snug font-semibold">{post.title}</h3>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">{post.body}</p>
      </div>

      {relatedTalentNames ? (
        <p className="border-border text-muted-foreground mt-4 border-t pt-3 text-xs">
          {relatedTalentNames}
        </p>
      ) : null}
    </article>
  );
}
