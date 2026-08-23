import Image from "next/image";

import type { Talent } from "@/types";

export interface TalentHeroProps {
  talent: Talent;
}

function resolveTalentAffiliation(talent: Talent) {
  if (talent.role === "REPRESENTATIVE") {
    return "대표";
  }

  if (talent.generation) {
    return `${talent.generation}기`;
  }

  return "멤버";
}

export default function TalentHero({ talent }: TalentHeroProps) {
  const affiliation = resolveTalentAffiliation(talent);
  const headingId = `talent-hero-${talent.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className="border-border bg-surface overflow-hidden border sm:rounded-2xl"
    >
      <div className="bg-muted relative h-44 w-full sm:h-56 lg:h-72">
        {talent.coverImageUrl ? (
          <Image
            src={talent.coverImageUrl}
            alt={`${talent.name} 커버 이미지`}
            fill
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`${talent.name} 커버 이미지`}
            className="flex size-full items-center justify-center"
          >
            <span className="text-muted-foreground text-sm font-medium">{talent.englishName}</span>
          </div>
        )}
      </div>

      <div className="px-4 pb-6 sm:px-6 sm:pb-7 lg:px-8">
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:gap-5">
          <div className="border-surface bg-muted relative size-24 shrink-0 overflow-hidden rounded-xl border-4 shadow-sm sm:size-28 lg:size-32">
            {talent.profileImageUrl ? (
              <Image
                src={talent.profileImageUrl}
                alt={`${talent.name} 프로필 이미지`}
                fill
                sizes="(min-width: 1024px) 8rem, (min-width: 640px) 7rem, 6rem"
                className="object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={`${talent.name} 프로필 이미지`}
                className="text-muted-foreground flex size-full items-center justify-center text-2xl font-semibold"
              >
                {talent.name.slice(0, 1)}
              </div>
            )}
          </div>

          <div className="min-w-0 sm:pb-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1
                id={headingId}
                className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl"
              >
                {talent.name}
              </h1>

              <span className="text-muted-foreground text-sm sm:text-base">
                {talent.englishName}
              </span>
            </div>

            <p className="text-muted-foreground mt-1 text-sm font-medium">
              {affiliation} · 팬덤 {talent.fandomName}
            </p>
          </div>
        </div>

        <p className="text-foreground mt-5 max-w-3xl text-base leading-7">{talent.description}</p>

        {talent.isLive ? (
          <div className="border-border mt-5 flex items-start gap-3 border-t pt-4">
            <span aria-hidden="true" className="bg-destructive mt-2 size-2 shrink-0 rounded-full" />

            <div className="min-w-0">
              <p className="text-destructive text-xs font-semibold tracking-[0.12em]">LIVE</p>

              {talent.liveTitle ? (
                <p className="text-foreground mt-1 text-sm font-medium sm:text-base">
                  {talent.liveTitle}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
