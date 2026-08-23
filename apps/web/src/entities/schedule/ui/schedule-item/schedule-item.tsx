import type { Schedule, Talent } from "@/types";

interface ScheduleItemProps {
  schedule: Schedule;
  talents: Pick<Talent, "id" | "name">[];
}

const SCHEDULE_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "numeric",
  day: "numeric",
  weekday: "short",
});

const SCHEDULE_TIME_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function ScheduleItem({ schedule, talents }: ScheduleItemProps) {
  const startsAt = new Date(schedule.startsAt);
  const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");

  return (
    <article className="border-border grid grid-cols-[5rem_minmax(0,1fr)] border-b py-4 last:border-b-0">
      <div className="pr-4">
        <time dateTime={schedule.startsAt}>
          <span className="text-foreground block text-sm font-semibold">
            {SCHEDULE_DATE_FORMATTER.format(startsAt)}
          </span>

          <span className="text-muted-foreground mt-1 block text-xs tabular-nums">
            {SCHEDULE_TIME_FORMATTER.format(startsAt)}
          </span>
        </time>
      </div>

      <div className="border-border min-w-0 border-l pl-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-foreground min-w-0 text-sm leading-6 font-semibold">
            {schedule.title}
          </h3>

          <span className="text-muted-foreground shrink-0 text-xs font-medium">
            {schedule.type}
          </span>
        </div>

        {relatedTalentNames ? (
          <p className="text-muted-foreground mt-1.5 text-xs">{relatedTalentNames}</p>
        ) : null}
      </div>
    </article>
  );
}
