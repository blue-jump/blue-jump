import { ArchiveCard } from "@/entities/archive";
import { CreativeCard } from "@/entities/creative";
import { GatheringCard } from "@/entities/gathering";
import { PostCard } from "@/entities/post";
import { ProjectCard } from "@/entities/project";
import { ScheduleItem } from "@/entities/schedule";
import { LiveTalentCard, TalentCard } from "@/entities/talent";
import {
  MOCK_ARCHIVES,
  MOCK_CREATIVES,
  MOCK_GATHERINGS,
  MOCK_POSTS,
  MOCK_PROJECTS,
  MOCK_SCHEDULES,
  MOCK_TALENTS,
} from "@/mocks";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Gathering, Project } from "@/types";

const PROJECT_STATUS_PRIORITY = {
  RECRUITING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
} satisfies Record<Project["status"], number>;

const liveTalents = MOCK_TALENTS.filter((talent) => talent.isLive);

function getRecentPosts(limit: number) {
  return [...MOCK_POSTS]
    .sort(
      (leftPost, rightPost) =>
        new Date(rightPost.createdAt).getTime() - new Date(leftPost.createdAt).getTime(),
    )
    .flatMap((post) => {
      const author = findUserById(post.authorId);

      if (!author) {
        return [];
      }

      return [
        {
          post,
          author,
          talents: getTalentsByIds(post.talentIds),
        },
      ];
    })
    .slice(0, limit);
}

function getRecentCreatives(limit: number) {
  return [...MOCK_CREATIVES]
    .sort(
      (leftCreative, rightCreative) =>
        new Date(rightCreative.createdAt).getTime() - new Date(leftCreative.createdAt).getTime(),
    )
    .flatMap((creative) => {
      const creator = findUserById(creative.creatorId);

      if (!creator) {
        return [];
      }

      return [
        {
          creative,
          creator,
          talents: getTalentsByIds(creative.talentIds),
        },
      ];
    })
    .slice(0, limit);
}

function getActiveProjects(projects: readonly Project[], limit: number) {
  return [...projects]
    .filter((project) => project.status !== "COMPLETED")
    .sort(
      (leftProject, rightProject) =>
        PROJECT_STATUS_PRIORITY[leftProject.status] - PROJECT_STATUS_PRIORITY[rightProject.status],
    )
    .slice(0, limit);
}

function getUpcomingGatherings(gatherings: readonly Gathering[], limit: number) {
  return [...gatherings]
    .filter((gathering) => gathering.status !== "COMPLETED")
    .sort(
      (leftGathering, rightGathering) =>
        new Date(leftGathering.startsAt).getTime() - new Date(rightGathering.startsAt).getTime(),
    )
    .slice(0, limit);
}

const recentPosts = getRecentPosts(2);
const recentCreatives = getRecentCreatives(2);
const activeProjects = getActiveProjects(MOCK_PROJECTS, 2);
const upcomingGatherings = getUpcomingGatherings(MOCK_GATHERINGS, 2);

const upcomingSchedules = [...MOCK_SCHEDULES]
  .sort(
    (leftSchedule, rightSchedule) =>
      new Date(leftSchedule.startsAt).getTime() - new Date(rightSchedule.startsAt).getTime(),
  )
  .slice(0, 3);

const recentArchives = [...MOCK_ARCHIVES]
  .sort(
    (leftArchive, rightArchive) =>
      new Date(rightArchive.occurredAt).getTime() - new Date(leftArchive.occurredAt).getTime(),
  )
  .slice(0, 2);

export default function MainView() {
  return (
    <Container>
      <Section spacing="lg" aria-labelledby="main-heading">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

            <h1 id="main-heading" className="text-heading-1 text-foreground mt-3 font-semibold">
              지금 블루점프
            </h1>
          </div>

          <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <span>
              <strong className="text-foreground font-semibold">{liveTalents.length}</strong> LIVE
            </span>

            <span>
              <strong className="text-foreground font-semibold">{MOCK_POSTS.length}</strong> 글
            </span>

            <span>
              <strong className="text-foreground font-semibold">{MOCK_CREATIVES.length}</strong>{" "}
              창작
            </span>
          </div>
        </div>
      </Section>

      <Section spacing="lg" aria-labelledby="activity-hub-heading">
        <h2 id="activity-hub-heading" className="sr-only">
          블루점프 활동
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
          <section aria-labelledby="main-live-heading" className="lg:col-span-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-destructive text-xs font-semibold tracking-[0.14em]">LIVE</p>

                <h3 id="main-live-heading" className="text-foreground mt-2 text-2xl font-semibold">
                  지금 방송 중
                </h3>
              </div>

              <span className="text-muted-foreground shrink-0 text-sm">{liveTalents.length}명</span>
            </div>

            {liveTalents.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {liveTalents.map((talent, index) => (
                  <LiveTalentCard key={talent.id} talent={talent} eager={index === 0} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">현재 방송 중인 멤버가 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-talents-heading"
            className="border-border border-t pt-8 lg:col-span-12"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-brand text-xs font-semibold tracking-[0.14em]">BLUE JUMP</p>

                <h3
                  id="main-talents-heading"
                  className="text-foreground mt-2 text-2xl font-semibold"
                >
                  멤버
                </h3>
              </div>

              <span className="text-muted-foreground shrink-0 text-sm">
                {MOCK_TALENTS.length}명
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {MOCK_TALENTS.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          </section>

          <section
            aria-labelledby="main-community-heading"
            className="border-border border-t pt-8 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-community-heading" className="text-foreground text-xl font-semibold">
                최근 글
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_POSTS.length}</span>
            </div>

            {recentPosts.length > 0 ? (
              <div className="mt-5 space-y-4">
                {recentPosts.map(({ post, author, talents }) => (
                  <PostCard key={post.id} post={post} author={author} talents={talents} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 게시글이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-creative-heading"
            className="border-border border-t pt-8 lg:col-span-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-creative-heading" className="text-foreground text-xl font-semibold">
                팬 창작
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_CREATIVES.length}</span>
            </div>

            {recentCreatives.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {recentCreatives.map(({ creative, creator, talents }) => (
                  <CreativeCard
                    key={creative.id}
                    creative={creative}
                    creator={creator}
                    talents={talents}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 창작물이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-projects-heading"
            className="border-border border-t pt-8 lg:col-span-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-projects-heading" className="text-foreground text-xl font-semibold">
                프로젝트
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_PROJECTS.length}</span>
            </div>

            {activeProjects.length > 0 ? (
              <div className="mt-5 space-y-4">
                {activeProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    talents={getTalentsByIds(project.talentIds)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">진행 중인 프로젝트가 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-gatherings-heading"
            className="border-border border-t pt-8 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-gatherings-heading" className="text-foreground text-xl font-semibold">
                모임
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_GATHERINGS.length}</span>
            </div>

            {upcomingGatherings.length > 0 ? (
              <div className="mt-5 space-y-4">
                {upcomingGatherings.map((gathering) => (
                  <GatheringCard
                    key={gathering.id}
                    gathering={gathering}
                    talents={getTalentsByIds(gathering.talentIds)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">예정된 모임이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-schedule-heading"
            className="border-border border-t pt-8 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-schedule-heading" className="text-foreground text-xl font-semibold">
                일정
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_SCHEDULES.length}</span>
            </div>

            {upcomingSchedules.length > 0 ? (
              <div className="mt-3">
                {upcomingSchedules.map((schedule) => (
                  <ScheduleItem
                    key={schedule.id}
                    schedule={schedule}
                    talents={getTalentsByIds(schedule.talentIds)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">예정된 일정이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-archive-heading"
            className="border-border border-t pt-8 lg:col-span-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-archive-heading" className="text-foreground text-xl font-semibold">
                아카이브
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_ARCHIVES.length}</span>
            </div>

            {recentArchives.length > 0 ? (
              <div className="divide-border mt-5 divide-y">
                {recentArchives.map((archive) => (
                  <div key={archive.id} className="py-5 first:pt-0 last:pb-0">
                    <ArchiveCard archive={archive} talents={getTalentsByIds(archive.talentIds)} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 기록이 없습니다.</p>
            )}
          </section>
        </div>
      </Section>
    </Container>
  );
}
