import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Talent } from "@/types";

export interface TalentSelectorProps {
  talents: Talent[];
  currentTalentId: Talent["id"];
}

export default function TalentSelector({ talents, currentTalentId }: TalentSelectorProps) {
  return (
    <nav aria-label="버튜버 선택">
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max min-w-full gap-2 pb-1">
          {talents.map((talent) => {
            const isCurrent = talent.id === currentTalentId;

            return (
              <li key={talent.id} className="shrink-0">
                <Link
                  href={URLS.CLIENT.TALENT(talent.slug)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={
                    isCurrent
                      ? [
                          "border-(--talent-accent,var(--color-border))",
                          "text-foreground bg-(--talent-surface,var(--color-muted))",
                          "flex min-w-36 items-center gap-2.5 rounded-lg border px-3 py-2",
                          "duration-fast ease-standard transition-colors",
                          "motion-reduce:transition-none",
                        ].join(" ")
                      : [
                          "text-muted-foreground border-transparent",
                          "flex min-w-36 items-center gap-2.5 rounded-lg border px-3 py-2",
                          "duration-fast ease-standard transition-colors",
                          "hover:border-border hover:bg-muted hover:text-foreground",
                          "motion-reduce:transition-none",
                        ].join(" ")
                  }
                >
                  <span className="bg-muted relative size-9 shrink-0 overflow-hidden rounded-full">
                    {talent.profileImageUrl ? (
                      <Image
                        src={talent.profileImageUrl}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex size-full items-center justify-center text-sm font-semibold"
                      >
                        {talent.name.slice(0, 1)}
                      </span>
                    )}
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{talent.name}</span>

                    <span className="block truncate text-xs">
                      {talent.englishName}
                      {isCurrent ? (
                        <span className="text-foreground font-medium"> · 현재</span>
                      ) : null}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
