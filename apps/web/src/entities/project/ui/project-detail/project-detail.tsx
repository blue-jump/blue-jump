import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Project, Talent, User } from "@/types";

import { PROJECT_STATUS_LABELS } from "../../constants";

export interface ProjectDetailProps {
  project: Project;
  organizer: Pick<User, "id" | "nickname" | "profileImageUrl">;
  participants: Pick<User, "id" | "nickname" | "profileImageUrl">[];
  talents: Pick<Talent, "id" | "name" | "slug">[];
}

const PROJECT_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatProjectDate(value: string) {
  return PROJECT_DATE_FORMATTER.format(new Date(value));
}

export default function ProjectDetail({
  project,
  organizer,
  participants,
  talents,
}: ProjectDetailProps) {
  return (
    <article className="mx-auto w-full max-w-4xl">
      <header className="border-border border-b pb-8">
        <p className="text-muted-foreground text-sm font-medium">
          {PROJECT_STATUS_LABELS[project.status]}
        </p>

        <h1 className="text-foreground mt-3 text-2xl leading-tight font-semibold sm:text-3xl">
          {project.title}
        </h1>

        <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
          {project.summary}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {project.startedAt ? (
            <div>
              <dt className="text-muted-foreground">시작</dt>
              <dd className="text-foreground mt-1 font-medium">
                <time dateTime={project.startedAt}>{formatProjectDate(project.startedAt)}</time>
              </dd>
            </div>
          ) : null}

          {project.completedAt ? (
            <div>
              <dt className="text-muted-foreground">완료</dt>
              <dd className="text-foreground mt-1 font-medium">
                <time dateTime={project.completedAt}>{formatProjectDate(project.completedAt)}</time>
              </dd>
            </div>
          ) : null}

          <div>
            <dt className="text-muted-foreground">참여</dt>
            <dd className="text-foreground mt-1 font-medium tabular-nums">
              {participants.length}명
            </dd>
          </div>
        </dl>
      </header>

      <div className="grid gap-x-10 gap-y-10 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
        <div className="min-w-0">
          <section aria-labelledby={`project-${project.id}-roles-heading`}>
            <h2
              id={`project-${project.id}-roles-heading`}
              className="text-foreground text-lg font-semibold"
            >
              함께할 사람
            </h2>

            {project.roles.length > 0 ? (
              <ul className="border-border mt-4 divide-y border-y">
                {project.roles.map((role) => (
                  <li
                    key={role.id}
                    className="flex items-center justify-between gap-5 py-4 text-sm"
                  >
                    <span className="text-foreground font-medium">{role.name}</span>

                    <span className="text-muted-foreground shrink-0 tabular-nums">
                      {role.filled} / {role.capacity}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground mt-4 text-sm">
                현재 표시할 모집 역할이 없습니다.
              </p>
            )}
          </section>

          <section
            aria-labelledby={`project-${project.id}-participants-heading`}
            className="border-border mt-10 border-t pt-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id={`project-${project.id}-participants-heading`}
                className="text-foreground text-lg font-semibold"
              >
                참여자
              </h2>

              <span className="text-muted-foreground text-sm tabular-nums">
                {participants.length}명
              </span>
            </div>

            {participants.length > 0 ? (
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {participants.map((participant) => (
                  <li key={participant.id}>
                    <Link
                      href={URLS.CLIENT.PROFILE_DETAIL(participant.id)}
                      className="group flex min-w-0 items-center gap-3 rounded-sm py-1"
                    >
                      <div className="bg-muted relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                        {participant.profileImageUrl ? (
                          <Image
                            src={participant.profileImageUrl}
                            alt={`${participant.nickname} 프로필`}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        ) : (
                          <span
                            role="img"
                            aria-label={`${participant.nickname} 프로필`}
                            className="text-muted-foreground flex size-full items-center justify-center text-sm font-medium"
                          >
                            <span aria-hidden="true">{participant.nickname.slice(0, 1)}</span>
                          </span>
                        )}
                      </div>

                      <span className="text-foreground truncate text-sm font-medium underline-offset-4 group-hover:underline">
                        {participant.nickname}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground mt-4 text-sm">아직 표시할 참여자가 없습니다.</p>
            )}
          </section>
        </div>

        <aside className="border-border lg:border-l lg:pl-8">
          <section aria-labelledby={`project-${project.id}-organizer-heading`}>
            <h2
              id={`project-${project.id}-organizer-heading`}
              className="text-muted-foreground text-xs font-medium"
            >
              주최자
            </h2>

            <Link
              href={URLS.CLIENT.PROFILE_DETAIL(organizer.id)}
              className="group mt-3 flex min-w-0 items-center gap-3 rounded-sm"
            >
              <div className="bg-muted relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
                {organizer.profileImageUrl ? (
                  <Image
                    src={organizer.profileImageUrl}
                    alt={`${organizer.nickname} 프로필`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <span
                    role="img"
                    aria-label={`${organizer.nickname} 프로필`}
                    className="text-muted-foreground flex size-full items-center justify-center text-sm font-medium"
                  >
                    <span aria-hidden="true">{organizer.nickname.slice(0, 1)}</span>
                  </span>
                )}
              </div>

              <span className="text-foreground truncate text-sm font-semibold underline-offset-4 group-hover:underline">
                {organizer.nickname}
              </span>
            </Link>
          </section>

          {talents.length > 0 ? (
            <section
              aria-labelledby={`project-${project.id}-talents-heading`}
              className="border-border mt-8 border-t pt-6"
            >
              <h2
                id={`project-${project.id}-talents-heading`}
                className="text-muted-foreground text-xs font-medium"
              >
                관련 멤버
              </h2>

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
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
