import Link from "next/link";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@blue-jump/design-system/utils";

export type UserActivityKind = "POST" | "CREATIVE" | "PROJECT" | "GATHERING";

export type UserActivityTimestampPrecision = "date" | "datetime";

export interface UserActivityItem {
  id: string;
  kind: UserActivityKind;
  title: string;
  referenceAt: string;
  referenceLabel: string;
  timestampPrecision?: UserActivityTimestampPrecision;
  href?: string;
}

export interface UserActivityListProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  activities: UserActivityItem[];
  emptyMessage?: string;
}

const activityKindLabels: Record<UserActivityKind, string> = {
  POST: "게시글 작성",
  CREATIVE: "창작 제작",
  PROJECT: "프로젝트 참여",
  GATHERING: "모임 참여",
};

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Seoul",
});

const dateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

function formatActivityTimestamp({
  referenceAt,
  timestampPrecision = "datetime",
}: UserActivityItem) {
  const date = new Date(referenceAt);

  return timestampPrecision === "date"
    ? dateFormatter.format(date)
    : dateTimeFormatter.format(date);
}

export default function UserActivityList({
  activities,
  emptyMessage = "아직 남겨진 팬 활동이 없습니다.",
  className,
  ...props
}: UserActivityListProps) {
  if (activities.length === 0) {
    return (
      <div
        className={cn("border-border text-muted-foreground border-y py-8 text-sm", className)}
        {...props}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className} {...props}>
      <ol className="border-border divide-border divide-y border-y">
        {activities.map((activity) => {
          const title = activity.href ? (
            <Link
              href={activity.href}
              className={cn(
                "text-foreground font-medium",
                "decoration-border underline-offset-4",
                "hover:underline",
              )}
            >
              {activity.title}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{activity.title}</span>
          );

          return (
            <li
              key={`${activity.kind}-${activity.id}`}
              className="grid min-w-0 gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6"
            >
              <div className="min-w-0">
                <p className="text-muted-foreground text-xs font-medium">
                  {activityKindLabels[activity.kind]}
                </p>

                <p className="mt-1 min-w-0 text-sm leading-6">{title}</p>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className="text-muted-foreground text-[0.6875rem]">{activity.referenceLabel}</p>

                <time
                  dateTime={activity.referenceAt}
                  className="text-foreground mt-0.5 block text-xs tabular-nums"
                >
                  {formatActivityTimestamp(activity)}
                </time>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
