"use client";

import { useState } from "react";

import { Button } from "@blue-jump/design-system/web";

import type { Project, User } from "@/types";

export interface ProjectParticipationDemoProps {
  project: Pick<Project, "id" | "status" | "participantIds">;
  currentUserId: User["id"];
}

interface LocalParticipation {
  projectId: Project["id"];
  userId: User["id"];
}

export default function ProjectParticipationDemo({
  project,
  currentUserId,
}: ProjectParticipationDemoProps) {
  const [localParticipation, setLocalParticipation] = useState<LocalParticipation | null>(null);

  const isInitialParticipant = project.participantIds.includes(currentUserId);

  const hasJoinedInCurrentView =
    localParticipation?.projectId === project.id && localParticipation.userId === currentUserId;

  const isParticipating = isInitialParticipant || hasJoinedInCurrentView;
  const canParticipate = project.status === "RECRUITING" && !isParticipating;

  const headingId = `project-${project.id}-participation-heading`;

  function handleParticipate() {
    if (!canParticipate) {
      return;
    }

    setLocalParticipation({
      projectId: project.id,
      userId: currentUserId,
    });
  }

  return (
    <section aria-labelledby={headingId} className="border-border border-t pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 id={headingId} className="text-foreground text-base font-semibold">
            프로젝트 참여
          </h2>

          {isParticipating ? (
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              이 프로젝트에 참여 중입니다.
            </p>
          ) : canParticipate ? (
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              샘플에서는 역할을 선택하지 않고 참여 상태만 확인합니다.
            </p>
          ) : (
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              현재는 새 참여를 받고 있지 않습니다.
            </p>
          )}
        </div>

        <div aria-live="polite" className="shrink-0">
          {isParticipating ? (
            <span className="text-foreground text-sm font-semibold">참여 중</span>
          ) : canParticipate ? (
            <Button type="button" onClick={handleParticipate}>
              참여하기
            </Button>
          ) : null}
        </div>
      </div>

      {hasJoinedInCurrentView ? (
        <p className="text-muted-foreground mt-3 text-xs leading-5">
          참여 상태는 현재 화면에서만 유지되며 새로고침하면 초기 상태로 돌아갑니다.
        </p>
      ) : null}
    </section>
  );
}
