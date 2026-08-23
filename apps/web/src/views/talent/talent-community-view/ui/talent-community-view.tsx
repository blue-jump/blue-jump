import { ArchiveCard } from "@/entities/archive";
import { CreativeCard } from "@/entities/creative";
import { PostCard } from "@/entities/post";
import { ProjectCard } from "@/entities/project";
import { ScheduleItem } from "@/entities/schedule";
import { buildTalentThemeProps, TalentHero } from "@/entities/talent";
import { TalentSelector } from "@/features/talent";
import { MOCK_TALENTS } from "@/mocks";
import {
  findUserById,
  getArchivesByTalentId,
  getCreativesByTalentId,
  getPostsByTalentId,
  getProjectsByTalentId,
  getSchedulesByTalentId,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Archive, Creative, Post, Project, Schedule, Talent, User } from "@/types";

export interface TalentCommunityViewProps {
  talent: Talent;
}

interface RelatedPost {
  post: Post;
  author: User;
  talents: Talent[];
}

interface RelatedCreative {
  creative: Creative;
  creator: User;
  talents: Talent[];
}

const PROJECT_STATUS_PRIORITY = {
  RECRUITING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
} satisfies Record<Project["status"], number>;

const POST_LIMIT = 2;
const CREATIVE_LIMIT = 2;
const PROJECT_LIMIT = 2;
const SCHEDULE_LIMIT = 3;
const ARCHIVE_LIMIT = 2;

function getRelatedPosts(talentId: Talent["id"]): RelatedPost[] {
  const posts: Post[] = [...getPostsByTalentId(talentId)].sort(
    (leftPost, rightPost) =>
      new Date(rightPost.createdAt).getTime() - new Date(leftPost.createdAt).getTime(),
  );

  const relatedPosts: RelatedPost[] = [];

  for (const post of posts) {
    const author = findUserById(post.authorId);

    if (!author) {
      continue;
    }

    relatedPosts.push({
      post,
      author,
      talents: getTalentsByIds(post.talentIds),
    });

    if (relatedPosts.length === POST_LIMIT) {
      break;
    }
  }

  return relatedPosts;
}

function getRelatedCreatives(talentId: Talent["id"]): RelatedCreative[] {
  const creatives: Creative[] = [...getCreativesByTalentId(talentId)].sort(
    (leftCreative, rightCreative) =>
      new Date(rightCreative.createdAt).getTime() - new Date(leftCreative.createdAt).getTime(),
  );

  const relatedCreatives: RelatedCreative[] = [];

  for (const creative of creatives) {
    const creator = findUserById(creative.creatorId);

    if (!creator) {
      continue;
    }

    relatedCreatives.push({
      creative,
      creator,
      talents: getTalentsByIds(creative.talentIds),
    });

    if (relatedCreatives.length === CREATIVE_LIMIT) {
      break;
    }
  }

  return relatedCreatives;
}

function getRelatedProjects(talentId: Talent["id"]): Project[] {
  const projects: Project[] = [...getProjectsByTalentId(talentId)];

  return projects
    .sort((leftProject, rightProject) => {
      const statusPriority =
        PROJECT_STATUS_PRIORITY[leftProject.status] - PROJECT_STATUS_PRIORITY[rightProject.status];

      if (statusPriority !== 0) {
        return statusPriority;
      }

      const leftStartedAt = leftProject.startedAt ? new Date(leftProject.startedAt).getTime() : 0;

      const rightStartedAt = rightProject.startedAt
        ? new Date(rightProject.startedAt).getTime()
        : 0;

      return rightStartedAt - leftStartedAt;
    })
    .slice(0, PROJECT_LIMIT);
}

function getRelatedSchedules(talentId: Talent["id"]): Schedule[] {
  const schedules: Schedule[] = [...getSchedulesByTalentId(talentId)];

  return schedules
    .sort(
      (leftSchedule, rightSchedule) =>
        new Date(leftSchedule.startsAt).getTime() - new Date(rightSchedule.startsAt).getTime(),
    )
    .slice(0, SCHEDULE_LIMIT);
}

function getRelatedArchives(talentId: Talent["id"]): Archive[] {
  const archives: Archive[] = [...getArchivesByTalentId(talentId)];

  return archives
    .sort(
      (leftArchive, rightArchive) =>
        new Date(rightArchive.occurredAt).getTime() - new Date(leftArchive.occurredAt).getTime(),
    )
    .slice(0, ARCHIVE_LIMIT);
}

export default function TalentCommunityView({ talent }: TalentCommunityViewProps) {
  const themeProps = buildTalentThemeProps(talent);

  const relatedPosts = getRelatedPosts(talent.id);
  const relatedCreatives = getRelatedCreatives(talent.id);
  const relatedProjects = getRelatedProjects(talent.id);
  const relatedSchedules = getRelatedSchedules(talent.id);
  const relatedArchives = getRelatedArchives(talent.id);

  return (
    <div {...themeProps}>
      <Container>
        <Section spacing="lg" aria-label={`${talent.name} 커뮤니티`}>
          <TalentHero talent={talent} />

          <div className="border-border mt-6 border-b pb-6 md:mt-8 md:pb-8">
            <TalentSelector talents={MOCK_TALENTS} currentTalentId={talent.id} />
          </div>
        </Section>

        <Section
          spacing="none"
          aria-labelledby="talent-community-content-heading"
          className="pb-14 md:pb-20"
        >
          <h2 id="talent-community-content-heading" className="sr-only">
            {talent.name} 커뮤니티 활동
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
            <section aria-labelledby="talent-community-posts-heading" className="lg:col-span-5">
              <h2
                id="talent-community-posts-heading"
                className="text-foreground text-xl font-semibold"
              >
                최근 글
              </h2>

              {relatedPosts.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {relatedPosts.map(({ post, author, talents }) => (
                    <PostCard key={post.id} post={post} author={author} talents={talents} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mt-5 text-sm">
                  {talent.name}와 관련된 게시글이 없습니다.
                </p>
              )}
            </section>

            <section aria-labelledby="talent-community-creatives-heading" className="lg:col-span-7">
              <h2
                id="talent-community-creatives-heading"
                className="text-foreground text-xl font-semibold"
              >
                팬 창작
              </h2>

              {relatedCreatives.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {relatedCreatives.map(({ creative, creator, talents }) => (
                    <CreativeCard
                      key={creative.id}
                      creative={creative}
                      creator={creator}
                      talents={talents}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mt-5 text-sm">
                  {talent.name}와 관련된 창작물이 없습니다.
                </p>
              )}
            </section>

            <section
              aria-labelledby="talent-community-projects-heading"
              className="border-border border-t pt-8 lg:col-span-7"
            >
              <h2
                id="talent-community-projects-heading"
                className="text-foreground text-xl font-semibold"
              >
                프로젝트
              </h2>

              {relatedProjects.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {relatedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      talents={getTalentsByIds(project.talentIds)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mt-5 text-sm">
                  {talent.name}와 관련된 프로젝트가 없습니다.
                </p>
              )}
            </section>

            <section
              aria-labelledby="talent-community-schedules-heading"
              className="border-border border-t pt-8 lg:col-span-5"
            >
              <h2
                id="talent-community-schedules-heading"
                className="text-foreground text-xl font-semibold"
              >
                방송과 일정
              </h2>

              {relatedSchedules.length > 0 ? (
                <div className="mt-3">
                  {relatedSchedules.map((schedule) => (
                    <ScheduleItem
                      key={schedule.id}
                      schedule={schedule}
                      talents={getTalentsByIds(schedule.talentIds)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mt-5 text-sm">
                  {talent.name}와 관련된 일정이 없습니다.
                </p>
              )}
            </section>

            <section
              aria-labelledby="talent-community-archives-heading"
              className="border-border border-t pt-8 lg:col-span-12"
            >
              <h2
                id="talent-community-archives-heading"
                className="text-foreground text-xl font-semibold"
              >
                아카이브
              </h2>

              {relatedArchives.length > 0 ? (
                <div className="divide-border mt-5 divide-y">
                  {relatedArchives.map((archive) => (
                    <div key={archive.id} className="py-5 first:pt-0 last:pb-0">
                      <ArchiveCard archive={archive} talents={getTalentsByIds(archive.talentIds)} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mt-5 text-sm">
                  {talent.name}와 관련된 기록이 없습니다.
                </p>
              )}
            </section>
          </div>
        </Section>
      </Container>
    </div>
  );
}
