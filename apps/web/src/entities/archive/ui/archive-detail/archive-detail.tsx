import Link from "next/link";

import { URLS } from "@/constants";
import type { Archive, Creative, Post, Project, Talent } from "@/types";

import { ARCHIVE_CATEGORY_LABELS } from "../../constants";

export interface ArchiveDetailProps {
  archive: Archive;
  talents: Pick<Talent, "id" | "name" | "slug">[];
  posts: Pick<Post, "id" | "title">[];
  creatives: Pick<Creative, "id" | "title">[];
  projects: Pick<Project, "id" | "title">[];
}

const ARCHIVE_DETAIL_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ArchiveDetail({
  archive,
  talents,
  posts,
  creatives,
  projects,
}: ArchiveDetailProps) {
  const occurredAt = new Date(archive.occurredAt);
  const hasRelatedContent = posts.length > 0 || creatives.length > 0 || projects.length > 0;

  return (
    <article className="mx-auto w-full max-w-4xl">
      <header className="border-border border-b pb-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-muted-foreground text-sm font-medium">
            {ARCHIVE_CATEGORY_LABELS[archive.category]}
          </p>

          <time dateTime={archive.occurredAt} className="text-muted-foreground text-sm">
            {ARCHIVE_DETAIL_DATE_FORMATTER.format(occurredAt)}
          </time>
        </div>

        <h1 className="text-foreground mt-4 text-2xl leading-tight font-semibold sm:text-3xl">
          {archive.title}
        </h1>

        <p className="text-muted-foreground mt-5 max-w-3xl text-base leading-8">
          {archive.summary}
        </p>
      </header>

      <div className="grid gap-x-10 gap-y-10 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
        <div className="min-w-0">
          <section aria-labelledby={`archive-${archive.id}-related-content-heading`}>
            <h2
              id={`archive-${archive.id}-related-content-heading`}
              className="text-foreground text-lg font-semibold"
            >
              이 기록과 이어지는 것들
            </h2>

            {hasRelatedContent ? (
              <div className="mt-5 space-y-8">
                {posts.length > 0 ? (
                  <section aria-labelledby={`archive-${archive.id}-posts-heading`}>
                    <h3
                      id={`archive-${archive.id}-posts-heading`}
                      className="text-muted-foreground text-xs font-medium"
                    >
                      게시글
                    </h3>

                    <ul className="border-border mt-3 divide-y border-y">
                      {posts.map((post) => (
                        <li key={post.id}>
                          <Link
                            href={URLS.CLIENT.POST(post.id)}
                            className="text-foreground block rounded-sm py-3 text-sm font-medium underline-offset-4 hover:underline"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {creatives.length > 0 ? (
                  <section aria-labelledby={`archive-${archive.id}-creatives-heading`}>
                    <h3
                      id={`archive-${archive.id}-creatives-heading`}
                      className="text-muted-foreground text-xs font-medium"
                    >
                      팬 창작
                    </h3>

                    <ul className="border-border mt-3 divide-y border-y">
                      {creatives.map((creative) => (
                        <li key={creative.id}>
                          <Link
                            href={URLS.CLIENT.CREATIVE_DETAIL(creative.id)}
                            className="text-foreground block rounded-sm py-3 text-sm font-medium underline-offset-4 hover:underline"
                          >
                            {creative.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {projects.length > 0 ? (
                  <section aria-labelledby={`archive-${archive.id}-projects-heading`}>
                    <h3
                      id={`archive-${archive.id}-projects-heading`}
                      className="text-muted-foreground text-xs font-medium"
                    >
                      프로젝트
                    </h3>

                    <ul className="border-border mt-3 divide-y border-y">
                      {projects.map((project) => (
                        <li key={project.id}>
                          <Link
                            href={URLS.CLIENT.PROJECT_DETAIL(project.id)}
                            className="text-foreground block rounded-sm py-3 text-sm font-medium underline-offset-4 hover:underline"
                          >
                            {project.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>
            ) : (
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                이 기록과 직접 연결된 콘텐츠는 아직 없습니다.
              </p>
            )}
          </section>
        </div>

        <aside className="border-border lg:border-l lg:pl-8">
          <section aria-labelledby={`archive-${archive.id}-talents-heading`}>
            <h2
              id={`archive-${archive.id}-talents-heading`}
              className="text-muted-foreground text-xs font-medium"
            >
              관련 멤버
            </h2>

            {talents.length > 0 ? (
              <ul className="mt-3 space-y-2">
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
            ) : (
              <p className="text-muted-foreground mt-3 text-sm">연결된 멤버 정보가 없습니다.</p>
            )}
          </section>
        </aside>
      </div>
    </article>
  );
}
