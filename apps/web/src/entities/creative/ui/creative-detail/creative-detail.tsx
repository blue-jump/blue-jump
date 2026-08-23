import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Creative, Talent, User } from "@/types";

import { CREATIVE_TYPE_LABELS } from "../../constants";

export interface CreativeDetailProps {
  creative: Creative;
  creator: Pick<User, "id" | "nickname">;
  talents: Pick<Talent, "id" | "name" | "slug">[];
}

const CREATIVE_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function CreativeDetail({ creative, creator, talents }: CreativeDetailProps) {
  return (
    <article className="mx-auto w-full max-w-5xl">
      <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-xl sm:aspect-16/10">
        {creative.thumbnailUrl ? (
          <Image
            src={creative.thumbnailUrl}
            alt={creative.title}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`${creative.title} 대표 이미지`}
            className="text-muted-foreground flex size-full items-center justify-center px-8 text-center text-base font-medium"
          >
            <span aria-hidden="true">{creative.title}</span>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-3xl pt-7 sm:pt-9">
        <header>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-medium">{CREATIVE_TYPE_LABELS[creative.type]}</span>

            <span aria-hidden="true">·</span>

            <Link
              href={URLS.CLIENT.PROFILE_DETAIL(creator.id)}
              className="text-foreground rounded-sm font-medium underline-offset-4 hover:underline"
            >
              {creator.nickname}
            </Link>

            <span aria-hidden="true">·</span>

            <time dateTime={creative.createdAt}>
              {CREATIVE_DATE_FORMATTER.format(new Date(creative.createdAt))}
            </time>
          </div>

          <h1 className="text-foreground mt-3 text-2xl leading-tight font-semibold sm:text-3xl">
            {creative.title}
          </h1>
        </header>

        {creative.description ? (
          <p className="text-foreground mt-6 text-base leading-8 whitespace-pre-wrap">
            {creative.description}
          </p>
        ) : null}

        {talents.length > 0 ? (
          <section
            aria-labelledby={`creative-${creative.id}-talents-heading`}
            className="border-border mt-8 border-t pt-5"
          >
            <h2
              id={`creative-${creative.id}-talents-heading`}
              className="text-muted-foreground text-xs font-medium"
            >
              관련 멤버
            </h2>

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
          </section>
        ) : null}

        {creative.contentUrl ? (
          <div className="border-border mt-6 border-t pt-5">
            <a
              href={creative.contentUrl}
              target="_blank"
              rel="noreferrer"
              className="text-interactive hover:text-interactive-hover inline-flex rounded-sm text-sm font-semibold underline underline-offset-4"
            >
              원본 콘텐츠 보기
              <span className="sr-only"> 새 창에서 열림</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
