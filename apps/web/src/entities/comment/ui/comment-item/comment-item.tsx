import Image from "next/image";

import type { Comment, User } from "@/types";

export interface CommentItemProps {
  comment: Comment;
  author: Pick<User, "nickname" | "profileImageUrl">;
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
    <article className="border-border flex gap-3 border-b py-5 last:border-b-0">
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

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-foreground text-sm font-semibold">{author.nickname}</p>

          <time dateTime={comment.createdAt} className="text-muted-foreground text-xs">
            {COMMENT_DATE_FORMATTER.format(new Date(comment.createdAt))}
          </time>
        </header>

        <p className="text-foreground mt-2 text-sm leading-6 whitespace-pre-wrap">{comment.body}</p>
      </div>
    </article>
  );
}
