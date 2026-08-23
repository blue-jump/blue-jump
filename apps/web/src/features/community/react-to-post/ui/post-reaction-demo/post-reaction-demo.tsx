"use client";

import { useState } from "react";

import type { Reaction, UserId } from "@/types";

export interface PostReactionDemoProps {
  reactions: readonly Reaction[];
  currentUserId: UserId;
}

export default function PostReactionDemo({ reactions, currentUserId }: PostReactionDemoProps) {
  const [selectedReactionIds, setSelectedReactionIds] = useState<Set<Reaction["id"]>>(
    () =>
      new Set(
        reactions
          .filter((reaction) => reaction.userIds.includes(currentUserId))
          .map((reaction) => reaction.id),
      ),
  );

  function toggleReaction(reactionId: Reaction["id"]) {
    setSelectedReactionIds((current) => {
      const next = new Set(current);

      if (next.has(reactionId)) {
        next.delete(reactionId);
      } else {
        next.add(reactionId);
      }

      return next;
    });
  }

  if (reactions.length === 0) {
    return null;
  }

  return (
    <div role="group" aria-label="게시글 반응" className="flex flex-wrap gap-2">
      {reactions.map((reaction) => {
        const initiallySelected = reaction.userIds.includes(currentUserId);
        const selected = selectedReactionIds.has(reaction.id);

        const count =
          reaction.userIds.length +
          (selected && !initiallySelected ? 1 : 0) -
          (!selected && initiallySelected ? 1 : 0);

        return (
          <button
            key={reaction.id}
            type="button"
            aria-pressed={selected}
            aria-label={`${reaction.emoji} 반응 ${count}명${selected ? ", 선택됨" : ""}`}
            onClick={() => toggleReaction(reaction.id)}
            className={[
              "inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-2",
              "text-sm font-medium tabular-nums",
              "duration-fast ease-standard transition-colors motion-reduce:transition-none",
              selected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
            ].join(" ")}
          >
            {selected ? <span aria-hidden="true">✓</span> : null}

            <span aria-hidden="true" className="text-base">
              {reaction.emoji}
            </span>

            <span>{count}</span>
          </button>
        );
      })}
    </div>
  );
}
