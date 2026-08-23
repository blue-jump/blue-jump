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
    <nav aria-label="멤버 선택">
      <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <ul className="flex w-max min-w-full gap-2">
          {talents.map((talent) => {
            const isCurrent = talent.id === currentTalentId;

            return (
              <li key={talent.id} className="shrink-0">
                <Link
                  href={URLS.CLIENT.TALENT(talent.slug)}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-label={`${talent.name} 커뮤니티로 이동${isCurrent ? " (현재)" : ""}`}
                  className={[
                    "flex min-w-36 items-center gap-2.5 rounded-lg border px-3 py-2",
                    "duration-fast ease-standard transition-colors motion-reduce:transition-none",
                    "focus-visible:outline-focus focus-visible:outline-2 focus-visible:outline-offset-2",
                    isCurrent
                      ? [
                          "border-(--talent-accent,var(--color-border))",
                          "text-foreground bg-(--talent-surface,var(--color-muted))",
                        ].join(" ")
                      : [
                          "text-muted-foreground border-transparent",
                          "hover:border-border hover:bg-muted hover:text-foreground",
                        ].join(" "),
                  ].join(" ")}
                >
                  <span className="bg-muted relative size-9 shrink-0 overflow-hidden rounded-full">
                    {talent.profileImageUrl ? (
                      <Image
                        src={talent.profileImageUrl}
                        alt={`${talent.name} 프로필`}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        role="img"
                        aria-label={`${talent.name} 프로필`}
                        className="flex size-full items-center justify-center text-sm font-semibold"
                      >
                        <span aria-hidden="true">{talent.name.slice(0, 1)}</span>
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
