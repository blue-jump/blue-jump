import { URLS } from "@/constants";
import { ActivityTypePatch } from "@/entities/activity-type";
import { CreativeCard } from "@/entities/creative";
import { ProjectCard } from "@/entities/project";
import { TalentCard } from "@/entities/talent";
import { FanProfileCard, UserActivityList, type UserActivityItem } from "@/entities/user";
import {
  getActivityTypesByIds,
  getCreativesByCreatorId,
  getGatheringsByParticipantId,
  getPostsByAuthorId,
  getProjectsByParticipantId,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Project, User } from "@/types";

export interface UserProfileViewProps {
  user: User;
}

const CREATIVE_LIMIT = 4;
const PROJECT_LIMIT = 3;
const ACTIVITY_LIMIT = 8;

function getRecentCreatives(userId: User["id"]) {
  return [...getCreativesByCreatorId(userId)]
    .sort(
      (leftCreative, rightCreative) =>
        new Date(rightCreative.createdAt).getTime() - new Date(leftCreative.createdAt).getTime(),
    )
    .slice(0, CREATIVE_LIMIT);
}

function getRecentProjects(userId: User["id"]) {
  return [...getProjectsByParticipantId(userId)]
    .sort((leftProject, rightProject) => {
      const leftStartedAt = leftProject.startedAt ? new Date(leftProject.startedAt).getTime() : 0;
      const rightStartedAt = rightProject.startedAt
        ? new Date(rightProject.startedAt).getTime()
        : 0;

      return rightStartedAt - leftStartedAt;
    })
    .slice(0, PROJECT_LIMIT);
}

function buildUserActivities(user: User): UserActivityItem[] {
  const posts = getPostsByAuthorId(user.id);
  const creatives = getCreativesByCreatorId(user.id);
  const projects = getProjectsByParticipantId(user.id);
  const gatherings = getGatheringsByParticipantId(user.id);

  const activities: UserActivityItem[] = [
    ...posts.map((post) => ({
      id: post.id,
      kind: "POST" as const,
      title: post.title,
      referenceAt: post.createdAt,
      referenceLabel: "작성 시각",
      timestampPrecision: "datetime" as const,
      href: URLS.CLIENT.POST(post.id),
    })),

    ...creatives.map((creative) => ({
      id: creative.id,
      kind: "CREATIVE" as const,
      title: creative.title,
      referenceAt: creative.createdAt,
      referenceLabel: "제작 시각",
      timestampPrecision: "datetime" as const,
      href: URLS.CLIENT.CREATIVE_DETAIL(creative.id),
    })),

    ...projects.flatMap((project) => {
      if (!project.startedAt) {
        return [];
      }

      return [
        {
          id: project.id,
          kind: "PROJECT" as const,
          title: project.title,
          referenceAt: project.startedAt,
          referenceLabel: "프로젝트 시작",
          timestampPrecision: "date" as const,
        },
      ];
    }),

    ...gatherings.map((gathering) => ({
      id: gathering.id,
      kind: "GATHERING" as const,
      title: gathering.title,
      referenceAt: gathering.startsAt,
      referenceLabel: "모임 일정",
      timestampPrecision: "datetime" as const,
    })),
  ];

  return activities
    .sort(
      (leftActivity, rightActivity) =>
        new Date(rightActivity.referenceAt).getTime() -
        new Date(leftActivity.referenceAt).getTime(),
    )
    .slice(0, ACTIVITY_LIMIT);
}

function getProjectTalents(project: Project) {
  return getTalentsByIds(project.talentIds);
}

export default function UserProfileView({ user }: UserProfileViewProps) {
  const favoriteTalents = getTalentsByIds(user.favoriteTalentIds);
  const activityTypes = getActivityTypesByIds(user.activityTypeIds);

  const allCreatives = getCreativesByCreatorId(user.id);
  const allProjects = getProjectsByParticipantId(user.id);
  const allGatherings = getGatheringsByParticipantId(user.id);

  const creatives = getRecentCreatives(user.id);
  const projects = getRecentProjects(user.id);
  const activities = buildUserActivities(user);

  return (
    <Container>
      <Section spacing="lg" aria-labelledby="user-profile-heading">
        <div className="max-w-2xl">
          <p className="text-brand text-xs font-semibold tracking-[0.14em]">FAN PROFILE</p>

          <h1
            id="user-profile-heading"
            className="text-heading-1 text-foreground mt-3 font-semibold"
          >
            팬 프로필
          </h1>

          <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base">
            좋아하는 멤버와 지금까지 남겨 온 팬 활동을 한곳에서 봅니다.
          </p>
        </div>

        <div className="mt-8">
          <FanProfileCard
            user={user}
            favoriteTalents={favoriteTalents}
            activityTypes={activityTypes}
            activitySummary={{
              creativeCount: allCreatives.length,
              projectCount: allProjects.length,
              gatheringCount: allGatherings.length,
            }}
          />
        </div>
      </Section>

      <Section spacing="lg" aria-labelledby="user-profile-details-heading">
        <h2 id="user-profile-details-heading" className="sr-only">
          팬 활동 상세
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
          <section aria-labelledby="user-profile-activity-types-heading" className="lg:col-span-7">
            <div>
              <p className="text-muted-foreground text-xs font-medium">팬덤에서 하는 것</p>

              <h3
                id="user-profile-activity-types-heading"
                className="text-foreground mt-1 text-xl font-semibold"
              >
                활동 유형
              </h3>
            </div>

            {activityTypes.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activityTypes.map((activityType) => (
                  <ActivityTypePatch key={activityType.id} activityType={activityType} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">
                아직 표시된 활동 유형이 없습니다.
              </p>
            )}
          </section>

          <section
            aria-labelledby="user-profile-favorite-talents-heading"
            className="lg:col-span-5"
          >
            <div>
              <p className="text-muted-foreground text-xs font-medium">자주 머무는 곳</p>

              <h3
                id="user-profile-favorite-talents-heading"
                className="text-foreground mt-1 text-xl font-semibold"
              >
                관심 멤버
              </h3>
            </div>

            {favoriteTalents.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-4">
                {favoriteTalents.map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">
                아직 표시된 관심 멤버가 없습니다.
              </p>
            )}
          </section>

          <section
            aria-labelledby="user-profile-creatives-heading"
            className="border-border border-t pt-8 lg:col-span-7"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-xs font-medium">직접 만든 것</p>

                <h3
                  id="user-profile-creatives-heading"
                  className="text-foreground mt-1 text-xl font-semibold"
                >
                  팬 창작
                </h3>
              </div>

              {allCreatives.length > 0 ? (
                <span className="text-muted-foreground shrink-0 text-sm">
                  {allCreatives.length}
                </span>
              ) : null}
            </div>

            {creatives.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {creatives.map((creative) => (
                  <CreativeCard
                    key={creative.id}
                    creative={creative}
                    creator={user}
                    talents={getTalentsByIds(creative.talentIds)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">
                아직 등록된 팬 창작물이 없습니다.
              </p>
            )}
          </section>

          <section
            aria-labelledby="user-profile-projects-heading"
            className="border-border border-t pt-8 lg:col-span-5"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-xs font-medium">함께한 일</p>

                <h3
                  id="user-profile-projects-heading"
                  className="text-foreground mt-1 text-xl font-semibold"
                >
                  참여 프로젝트
                </h3>
              </div>

              {allProjects.length > 0 ? (
                <span className="text-muted-foreground shrink-0 text-sm">{allProjects.length}</span>
              ) : null}
            </div>

            {projects.length > 0 ? (
              <div className="mt-5 space-y-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    talents={getProjectTalents(project)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">아직 참여한 프로젝트가 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="user-profile-activity-heading"
            className="border-border border-t pt-8 lg:col-span-12"
          >
            <div>
              <p className="text-muted-foreground text-xs font-medium">남겨 온 기록</p>

              <h3
                id="user-profile-activity-heading"
                className="text-foreground mt-1 text-xl font-semibold"
              >
                팬 활동 기록
              </h3>
            </div>

            <div className="mt-5">
              <UserActivityList activities={activities} />
            </div>
          </section>
        </div>
      </Section>
    </Container>
  );
}
