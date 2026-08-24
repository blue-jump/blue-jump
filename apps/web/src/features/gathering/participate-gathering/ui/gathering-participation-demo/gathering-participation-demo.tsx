"use client";

import { useState } from "react";

import { Button } from "@blue-jump/design-system/web";

import type { Gathering, User } from "@/types";

export interface GatheringParticipationDemoProps {
  gathering: Pick<Gathering, "id" | "status" | "participantIds" | "capacity">;
  currentUserId: User["id"];
}

interface LocalParticipation {
  gatheringId: Gathering["id"];
  userId: User["id"];
}

export default function GatheringParticipationDemo({
  gathering,
  currentUserId,
}: GatheringParticipationDemoProps) {
  const [localParticipation, setLocalParticipation] = useState<LocalParticipation | null>(null);

  const isInitialParticipant = gathering.participantIds.includes(currentUserId);

  const hasJoinedInCurrentView =
    localParticipation?.gatheringId === gathering.id && localParticipation.userId === currentUserId;

  const isParticipating = isInitialParticipant || hasJoinedInCurrentView;

  const isCompleted = gathering.status === "COMPLETED";

  const isFull =
    gathering.status === "FULL" || gathering.participantIds.length >= gathering.capacity;

  const canParticipate = gathering.status === "OPEN" && !isFull && !isParticipating;

  const headingId = `gathering-${gathering.id}-participation-heading`;

  function handleParticipate() {
    if (!canParticipate) {
      return;
    }

    setLocalParticipation({
      gatheringId: gathering.id,
      userId: currentUserId,
    });
  }

  return (
    <section aria-labelledby={headingId} className="border-border border-t pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 id={headingId} className="text-foreground text-base font-semibold">
            모임 참가
          </h2>

          {isParticipating ? (
            <p className="text-muted-foreground mt-1 text-sm leading-6">이 모임에 참가 중입니다.</p>
          ) : isCompleted ? (
            <p className="text-muted-foreground mt-1 text-sm leading-6">종료된 모임입니다.</p>
          ) : isFull ? (
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              참가 정원이 모두 찼습니다.
            </p>
          ) : canParticipate ? (
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              샘플에서는 별도의 신청이나 승인 없이 참가 상태만 확인합니다.
            </p>
          ) : null}
        </div>

        <div aria-live="polite" className="shrink-0">
          {isParticipating ? (
            <span className="text-foreground text-sm font-semibold">참가 중</span>
          ) : canParticipate ? (
            <Button type="button" onClick={handleParticipate}>
              참가하기
            </Button>
          ) : null}
        </div>
      </div>

      {hasJoinedInCurrentView ? (
        <p className="text-muted-foreground mt-3 text-xs leading-5">
          참가 상태는 현재 화면에서만 유지되며 새로고침하면 초기 상태로 돌아갑니다.
        </p>
      ) : null}
    </section>
  );
}
