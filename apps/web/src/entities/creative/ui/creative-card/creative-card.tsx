import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Creative, Talent, User } from "@/types";

import { CREATIVE_TYPE_LABELS } from "../../constants";

export interface CreativeCardProps {
  creative: Creative;
  creator: Pick<User, "nickname">;
  talents: Pick<Talent, "id" | "name">[];
}

export default function CreativeCard({ creative, creator, talents }: CreativeCardProps) {
  const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");

  return (
    <article className="min-w-0">
      <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-lg">
        {creative.thumbnailUrl ? (
          <Image
            src={creative.thumbnailUrl}
            alt={creative.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center px-6 text-center text-sm">
            {creative.title}
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="text-muted-foreground text-xs">{CREATIVE_TYPE_LABELS[creative.type]}</p>

        <h3 className="text-foreground mt-1 line-clamp-2 text-base leading-snug font-semibold">
          <Link
            href={URLS.CLIENT.CREATIVE_DETAIL(creative.id)}
            className="rounded-sm underline-offset-4 hover:underline"
          >
            {creative.title}
          </Link>
        </h3>

        <div className="text-muted-foreground mt-2 flex flex-wrap gap-x-2 text-sm">
          <span>{creator.nickname}</span>

          {relatedTalentNames ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{relatedTalentNames}</span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
