import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Talent } from "@/types";

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  const imageUrl = talent.profileImageUrl ?? talent.coverImageUrl;
  const affiliation =
    talent.role === "REPRESENTATIVE"
      ? "대표"
      : talent.generation
        ? `${talent.generation}기`
        : "멤버";

  return (
    <Link
      href={URLS.CLIENT.TALENT(talent.slug)}
      aria-label={`${talent.name} 커뮤니티로 이동`}
      className="border-border bg-surface focus-visible:ring-ring focus-visible:ring-offset-background group block min-w-0 overflow-hidden rounded-xl border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div
        aria-hidden="true"
        className="h-1 w-full"
        style={{ backgroundColor: talent.signatureColor }}
      />

      <div className="bg-muted relative aspect-4/5 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${talent.name} 프로필`}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm font-medium">
            {talent.name}
          </div>
        )}

        {talent.isLive ? (
          <span className="bg-destructive text-destructive-foreground absolute right-3 bottom-3 rounded-md px-2 py-1 text-xs font-semibold">
            LIVE
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="text-foreground truncate text-lg font-semibold">{talent.name}</h3>

        <p className="text-muted-foreground mt-0.5 truncate text-sm">{talent.englishName}</p>

        <p className="text-muted-foreground mt-3 text-sm">{affiliation}</p>
      </div>
    </Link>
  );
}
