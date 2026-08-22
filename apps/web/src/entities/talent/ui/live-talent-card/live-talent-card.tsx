import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/constants";
import type { Talent } from "@/types";

interface LiveTalentCardProps {
  talent: Talent;
}

export default function LiveTalentCard({ talent }: LiveTalentCardProps) {
  const imageUrl = talent.coverImageUrl ?? talent.profileImageUrl;

  return (
    <Link
      href={URLS.CLIENT.TALENT(talent.slug)}
      aria-label={`${talent.name} 커뮤니티로 이동`}
      className="border-border bg-surface focus-visible:ring-ring focus-visible:ring-offset-background group block min-w-0 overflow-hidden rounded-xl border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="bg-muted relative aspect-video overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${talent.name} 라이브 커버`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm font-medium">
            {talent.name}
          </div>
        )}

        <span className="bg-destructive text-destructive-foreground absolute top-3 left-3 rounded-md px-2 py-1 text-xs font-semibold">
          LIVE
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-foreground line-clamp-2 text-base font-semibold">{talent.liveTitle}</h3>

        <p className="text-muted-foreground mt-2 text-sm font-medium">{talent.name}</p>
      </div>
    </Link>
  );
}
