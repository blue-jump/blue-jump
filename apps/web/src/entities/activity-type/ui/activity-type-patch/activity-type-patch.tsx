import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@blue-jump/design-system/utils";

import type { ActivityType } from "@/types";

export interface ActivityTypePatchProps extends Omit<
  ComponentPropsWithoutRef<"article">,
  "children"
> {
  activityType: ActivityType;
}

function buildActivityTypeMark(name: string) {
  const [firstWord, secondWord] = name.trim().split(/\s+/);

  if (!firstWord) {
    return "";
  }

  if (!secondWord) {
    return firstWord.slice(0, 2).toUpperCase();
  }

  return `${firstWord.charAt(0)}${secondWord.charAt(0)}`.toUpperCase();
}

export default function ActivityTypePatch({
  activityType,
  className,
  ...props
}: ActivityTypePatchProps) {
  const mark = buildActivityTypeMark(activityType.name);

  return (
    <article
      className={cn(
        "border-border bg-surface text-surface-foreground min-w-0 rounded-lg border px-4 py-3",
        "shadow-xs",
        className,
      )}
      data-activity-type={activityType.id}
      {...props}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "border-border bg-muted text-foreground",
            "flex h-8 min-w-8 shrink-0 items-center justify-center rounded-sm border px-1.5",
            "text-[0.6875rem] font-semibold tracking-[0.08em]",
          )}
        >
          {mark}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm font-semibold">{activityType.name}</p>

          <p className="text-muted-foreground mt-1 text-sm leading-5">{activityType.description}</p>
        </div>
      </div>
    </article>
  );
}
