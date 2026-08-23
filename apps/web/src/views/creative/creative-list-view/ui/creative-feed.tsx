"use client";

import { useState } from "react";

import { CreativeCard } from "@/entities/creative";
import { CreativeFilter, filterCreatives, type CreativeFilterValue } from "@/features/creative";
import type { Creative, Talent, User } from "@/types";

export interface CreativeFeedItem {
  creative: Creative;
  creator: Pick<User, "nickname">;
  talents: Pick<Talent, "id" | "name">[];
}

export interface CreativeFeedProps {
  items: readonly CreativeFeedItem[];
  talents: readonly Pick<Talent, "id" | "name">[];
}

export default function CreativeFeed({ items, talents }: CreativeFeedProps) {
  const [filter, setFilter] = useState<CreativeFilterValue>({
    type: "ALL",
    talentId: "ALL",
  });

  if (items.length === 0) {
    return <p className="text-muted-foreground text-sm">아직 등록된 창작물이 없습니다.</p>;
  }

  const creatives = items.map((item) => item.creative);
  const filteredCreatives = filterCreatives(creatives, filter);
  const filteredCreativeIds = new Set(filteredCreatives.map((creative) => creative.id));

  const filteredItems = items.filter((item) => filteredCreativeIds.has(item.creative.id));

  return (
    <>
      <CreativeFilter
        creatives={creatives}
        talents={talents}
        value={filter}
        resultCount={filteredItems.length}
        onValueChange={setFilter}
      />

      {filteredItems.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(({ creative, creator, talents }) => (
            <CreativeCard
              key={creative.id}
              creative={creative}
              creator={creator}
              talents={talents}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
