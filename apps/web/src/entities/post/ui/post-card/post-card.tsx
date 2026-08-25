import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Post, Talent, User } from "@/types";

import { POST_CATEGORY_LABELS } from "../../constants";

export interface PostCardProps {
  post: Post;
  author: Pick<User, "id" | "nickname" | "profileImageUrl">;
  talents: Pick<Talent, "id" | "name">[];
}

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
        <Link
          href={URLS.CLIENT.PROFILE_DETAIL(author.id)}
          aria-label={`${author.nickname} 프로필 보기`}
          className="group flex min-w-0 items-center gap-3 rounded-sm"
        >
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
              <span
                role="img"
                aria-label={`${author.nickname} 프로필`}
                className="text-muted-foreground flex size-full items-center justify-center text-sm font-medium"
              >
                <span aria-hidden="true">{author.nickname.slice(0, 1)}</span>
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium underline-offset-4 group-hover:underline">
              {author.nickname}
            </p>

            <time dateTime={post.createdAt} className="text-muted-foreground mt-0.5 block text-xs">
              {POST_DATE_FORMATTER.format(new Date(post.createdAt))}
            </time>
          </div>
        </Link>

        <span className="text-muted-foreground shrink-0 text-xs">
          {POST_CATEGORY_LABELS[post.category]}
        </span>
      </header>

      <div className="mt-4">
        <h3 className="text-foreground text-lg leading-snug font-semibold">
          <Link
            href={URLS.CLIENT.POST(post.id)}
            className="rounded-sm underline-offset-4 hover:underline"
          >
            {post.title}
          </Link>
        </h3>

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
