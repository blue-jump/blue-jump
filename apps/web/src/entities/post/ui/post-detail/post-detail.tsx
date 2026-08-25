import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Post, Talent, User } from "@/types";

import { POST_CATEGORY_LABELS } from "../../constants";

export interface PostDetailProps {
  post: Post;
  author: Pick<User, "id" | "nickname" | "profileImageUrl">;
  talents: Pick<Talent, "id" | "name" | "slug">[];
}

const POST_DETAIL_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function PostDetail({ post, author, talents }: PostDetailProps) {
  return (
    <article className="mx-auto w-full max-w-3xl">
      <header className="border-border border-b pb-6">
        <p className="text-muted-foreground text-sm font-medium">
          {POST_CATEGORY_LABELS[post.category]}
        </p>

        <h1 className="text-foreground mt-3 text-2xl leading-tight font-semibold sm:text-3xl">
          {post.title}
        </h1>

        <Link
          href={URLS.CLIENT.PROFILE_DETAIL(author.id)}
          aria-label={`${author.nickname} 프로필 보기`}
          className="group mt-5 flex w-fit min-w-0 items-center gap-3 rounded-sm"
        >
          <div className="bg-muted relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {author.profileImageUrl ? (
              <Image
                src={author.profileImageUrl}
                alt={`${author.nickname} 프로필`}
                fill
                sizes="40px"
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
              {POST_DETAIL_DATE_FORMATTER.format(new Date(post.createdAt))}
            </time>
          </div>
        </Link>
      </header>

      <div className="border-border border-b py-8">
        <p className="text-foreground text-base leading-8 whitespace-pre-wrap">{post.body}</p>
      </div>

      {talents.length > 0 ? (
        <footer className="pt-5">
          <p className="text-muted-foreground text-xs font-medium">관련 멤버</p>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {talents.map((talent) => (
              <li key={talent.id}>
                <Link
                  href={URLS.CLIENT.TALENT(talent.slug)}
                  className="text-interactive hover:text-interactive-hover rounded-sm text-sm font-medium underline-offset-4 hover:underline"
                >
                  {talent.name}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </article>
  );
}
