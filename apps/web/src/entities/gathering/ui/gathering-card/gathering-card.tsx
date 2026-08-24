import Link from "next/link";

import { URLS } from "@/constants";
import type { Gathering, Talent } from "@/types";

import { GATHERING_STATUS_LABELS } from "../../constants";

export interface GatheringCardProps {
  gathering: Gathering;
  talents: Pick<Talent, "id" | "name">[];
}

const GATHERING_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  weekday: "short",
});

const GATHERING_TIME_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function GatheringCard({ gathering, talents }: GatheringCardProps) {
  const startsAt = new Date(gathering.startsAt);
  const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");
  const participantCount = gathering.participantIds.length;

  return (
    <article className="border-border bg-surface overflow-hidden rounded-xl border">
      <div className="border-border border-b px-5 py-4">
        <div className="flex items-start justify-between gap-5">
          <div>
            <time
              dateTime={gathering.startsAt}
              className="text-foreground block text-lg font-semibold"
            >
              {GATHERING_DATE_FORMATTER.format(startsAt)}
            </time>

            <p className="text-muted-foreground mt-1 text-sm">
              {GATHERING_TIME_FORMATTER.format(startsAt)}
            </p>
          </div>

          <span className="text-muted-foreground shrink-0 text-sm font-medium">
            {GATHERING_STATUS_LABELS[gathering.status]}
          </span>
        </div>

        <p className="text-foreground mt-4 text-sm font-medium">{gathering.location}</p>
      </div>

      <div className="px-5 py-5">
        <h3 className="text-foreground text-lg leading-snug font-semibold">
          <Link
            href={URLS.CLIENT.GATHERING_DETAIL(gathering.id)}
            className="rounded-sm underline-offset-4 hover:underline"
          >
            {gathering.title}
          </Link>
        </h3>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-6">
          {gathering.description}
        </p>

        <div className="border-border mt-5 flex flex-wrap items-end justify-between gap-4 border-t pt-4">
          <div>
            {relatedTalentNames ? (
              <p className="text-muted-foreground text-xs">{relatedTalentNames}</p>
            ) : null}
          </div>

          <p className="text-foreground text-sm font-medium tabular-nums">
            {participantCount} / {gathering.capacity}명
          </p>
        </div>
      </div>
    </article>
  );
}
