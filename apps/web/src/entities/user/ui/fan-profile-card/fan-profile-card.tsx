import Link from "next/link";

import { Avatar, Card } from "@blue-jump/design-system/web";

import { URLS } from "@/constants";
import type { ActivityType, Talent, User } from "@/types";

export interface FanProfileActivitySummary {
  creativeCount: number;
  projectCount: number;
  gatheringCount: number;
}

export interface FanProfileCardProps {
  user: User;
  favoriteTalents: Pick<Talent, "id" | "slug" | "name" | "profileImageUrl">[];
  activityTypes: Pick<ActivityType, "id" | "name">[];
  activitySummary: FanProfileActivitySummary;
}

const joinedAtFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  timeZone: "Asia/Seoul",
});

function formatJoinedAt(joinedAt: string) {
  return `${joinedAtFormatter.format(new Date(joinedAt))}부터 함께함`;
}

function resolveAvatarFallback(nickname: string) {
  return nickname.trim().charAt(0) || "?";
}

export default function FanProfileCard({
  user,
  favoriteTalents,
  activityTypes,
  activitySummary,
}: FanProfileCardProps) {
  return (
    <Card
      padding="none"
      className="relative overflow-hidden"
      aria-labelledby={`fan-profile-${user.id}`}
    >
      <div className="bg-brand h-1" aria-hidden="true" />

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-brand text-xs font-semibold tracking-[0.12em] uppercase">
            Blue Jump Fan Profile
          </p>

          <p className="text-muted-foreground text-xs">{formatJoinedAt(user.joinedAt)}</p>
        </div>

        <div className="mt-5 flex min-w-0 items-start gap-4 sm:gap-5">
          <Avatar
            src={user.profileImageUrl}
            alt={`${user.nickname} 프로필 이미지`}
            fallback={resolveAvatarFallback(user.nickname)}
            size="xl"
            className="ring-border ring-1"
          />

          <div className="min-w-0 flex-1">
            <h2
              id={`fan-profile-${user.id}`}
              className="text-foreground text-xl font-bold tracking-tight sm:text-2xl"
            >
              {user.nickname}
            </h2>

            {user.bio ? (
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">{user.bio}</p>
            ) : null}
          </div>
        </div>

        <div className="border-border mt-6 border-t pt-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs font-medium">좋아하는 멤버</p>

              {favoriteTalents.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {favoriteTalents.map((talent) => (
                    <li key={talent.id}>
                      <Link
                        href={URLS.CLIENT.TALENT(talent.slug)}
                        className={[
                          "border-border bg-background inline-flex min-h-9 items-center gap-2 rounded-full border",
                          "py-1 pr-3 pl-1",
                          "text-foreground text-sm font-medium",
                          "hover:bg-muted transition-colors",
                        ].join(" ")}
                        aria-label={`${talent.name} 멤버 커뮤니티로 이동`}
                      >
                        <Avatar
                          src={talent.profileImageUrl}
                          alt=""
                          fallback={talent.name.charAt(0)}
                          size="sm"
                          className="border-0"
                        />

                        <span>{talent.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground mt-2 text-sm">
                  아직 표시된 관심 멤버가 없습니다.
                </p>
              )}
            </div>

            <dl className="grid grid-cols-3 gap-x-5 gap-y-2 sm:gap-x-7">
              <div>
                <dt className="text-muted-foreground text-xs">창작</dt>
                <dd className="text-foreground mt-0.5 text-sm font-semibold tabular-nums">
                  {activitySummary.creativeCount}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground text-xs">프로젝트</dt>
                <dd className="text-foreground mt-0.5 text-sm font-semibold tabular-nums">
                  {activitySummary.projectCount}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground text-xs">모임</dt>
                <dd className="text-foreground mt-0.5 text-sm font-semibold tabular-nums">
                  {activitySummary.gatheringCount}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {activityTypes.length > 0 ? (
          <div className="border-border mt-5 border-t pt-4">
            <p className="text-muted-foreground text-xs font-medium">주로 하는 것</p>

            <ul className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              {activityTypes.map((activityType, index) => (
                <li
                  key={activityType.id}
                  className="text-foreground flex items-center gap-2 text-sm font-medium"
                >
                  {index > 0 ? (
                    <span className="text-border" aria-hidden="true">
                      /
                    </span>
                  ) : null}

                  <span>{activityType.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
