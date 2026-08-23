import type { Archive, ArchiveCategory, Talent } from "@/types";

interface ArchiveCardProps {
  archive: Archive;
  talents: Pick<Talent, "id" | "name">[];
}

const ARCHIVE_CATEGORY_LABELS = {
  MEME: "밈",
  TERM: "용어",
  BROADCAST: "방송",
  EVENT: "이벤트",
  PROJECT: "프로젝트",
  HISTORY: "연혁",
} satisfies Record<ArchiveCategory, string>;

const ARCHIVE_YEAR_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
});

const ARCHIVE_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
});

export default function ArchiveCard({ archive, talents }: ArchiveCardProps) {
  const occurredAt = new Date(archive.occurredAt);
  const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");

  return (
    <article className="grid gap-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
      <time dateTime={archive.occurredAt} className="block">
        <span className="text-muted-foreground block text-xs">
          {ARCHIVE_YEAR_FORMATTER.format(occurredAt)}
        </span>

        <span className="text-foreground mt-1 block text-base font-semibold">
          {ARCHIVE_DATE_FORMATTER.format(occurredAt)}
        </span>
      </time>

      <div className="border-border min-w-0 border-l pl-4 sm:pl-6">
        <p className="text-muted-foreground text-xs font-medium">
          {ARCHIVE_CATEGORY_LABELS[archive.category]}
        </p>

        <h3 className="text-foreground mt-1.5 text-lg leading-snug font-semibold">
          {archive.title}
        </h3>

        <p className="text-muted-foreground mt-2 text-sm leading-6">{archive.summary}</p>

        {relatedTalentNames ? (
          <p className="text-foreground mt-4 text-xs">{relatedTalentNames}</p>
        ) : null}
      </div>
    </article>
  );
}
