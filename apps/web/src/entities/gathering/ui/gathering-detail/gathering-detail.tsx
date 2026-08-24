import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Gathering, Talent, User } from "@/types";

import { GATHERING_STATUS_LABELS } from "../../constants";

export interface GatheringDetailProps {
  gathering: Gathering;
  organizer: Pick<User, "id" | "nickname" | "profileImageUrl">;
  participants: Pick<User, "id" | "nickname" | "profileImageUrl">[];
  talents: Pick<Talent, "id" | "name" | "slug">[];
}

const GATHERING_DETAIL_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

const GATHERING_DETAIL_TIME_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function GatheringDetail({
  gathering,
  organizer,
  participants,
  talents,
}: GatheringDetailProps) {
  const startsAt = new Date(gathering.startsAt);

  return (
    <article className="mx-auto w-full max-w-4xl">
      <header className="border-border border-b pb-8">
        <p className="text-muted-foreground text-sm font-medium">
          {GATHERING_STATUS_LABELS[gathering.status]}
        </p>

        <h1 className="text-foreground mt-3 text-2xl leading-tight font-semibold sm:text-3xl">
          {gathering.title}
        </h1>

        <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
          {gathering.description}
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground text-sm">일정</dt>

            <dd className="text-foreground mt-1 text-sm font-medium">
              <time dateTime={gathering.startsAt}>
                {GATHERING_DETAIL_DATE_FORMATTER.format(startsAt)}
                <span className="text-muted-foreground ml-2 font-normal">
                  {GATHERING_DETAIL_TIME_FORMATTER.format(startsAt)}
                </span>
              </time>
            </dd>
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">장소</dt>

            <dd className="text-foreground mt-1 text-sm font-medium">{gathering.location}</dd>
          </div>

          <div>
            <dt className="text-muted-foreground text-sm">참가 현황</dt>

            <dd className="text-foreground mt-1 text-sm font-medium tabular-nums">
              {participants.length} / {gathering.capacity}명
            </dd>
          </div>
        </dl>
      </header>

      <div className="grid gap-x-10 gap-y-10 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
        <section
          aria-labelledby={`gathering-${gathering.id}-participants-heading`}
          className="min-w-0"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id={`gathering-${gathering.id}-participants-heading`}
              className="text-foreground text-lg font-semibold"
            >
              참가자
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
            <p className="text-muted-foreground mt-4 text-sm">아직 표시할 참가자가 없습니다.</p>
          )}
        </section>

        <aside className="border-border lg:border-l lg:pl-8">
          <section aria-labelledby={`gathering-${gathering.id}-organizer-heading`}>
            <h2
              id={`gathering-${gathering.id}-organizer-heading`}
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
              aria-labelledby={`gathering-${gathering.id}-talents-heading`}
              className="border-border mt-8 border-t pt-6"
            >
              <h2
                id={`gathering-${gathering.id}-talents-heading`}
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
