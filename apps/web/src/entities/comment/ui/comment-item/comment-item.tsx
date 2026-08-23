import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Comment, User } from "@/types";

export interface CommentItemProps {
  comment: Comment;
  author: Pick<User, "id" | "nickname" | "profileImageUrl">;
}

const COMMENT_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function CommentItem({ comment, author }: CommentItemProps) {
  return (
    <article className="border-border border-b py-5 last:border-b-0">
      <header className="flex flex-wrap items-center gap-x-2 gap-y-1">
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

          <span className="text-foreground truncate text-sm font-semibold underline-offset-4 group-hover:underline">
            {author.nickname}
          </span>
        </Link>

        <time dateTime={comment.createdAt} className="text-muted-foreground text-xs">
          {COMMENT_DATE_FORMATTER.format(new Date(comment.createdAt))}
        </time>
      </header>

      <p className="text-foreground mt-2 pl-12 text-sm leading-6 whitespace-pre-wrap">
        {comment.body}
      </p>
    </article>
  );
}
