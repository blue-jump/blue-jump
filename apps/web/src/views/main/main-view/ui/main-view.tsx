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

const liveTalents = MOCK_TALENTS.filter((talent) => talent.isLive);

const featuredProject = MOCK_PROJECTS.at(0);
const featuredGathering = MOCK_GATHERINGS.at(0);
const featuredSchedule = MOCK_SCHEDULES.at(0);
const featuredArchive = [...MOCK_ARCHIVES]
  .sort(
    (leftArchive, rightArchive) =>
      new Date(rightArchive.occurredAt).getTime() - new Date(leftArchive.occurredAt).getTime(),
  )
  .at(0);

function getFeaturedPost() {
  for (const post of MOCK_POSTS) {
    const author = findUserById(post.authorId);

    if (!author) {
      continue;
    }

    return {
      post,
      author,
      talents: getTalentsByIds(post.talentIds),
    };
  }

  return undefined;
}

function getFeaturedCreative() {
  for (const creative of MOCK_CREATIVES) {
    const creator = findUserById(creative.creatorId);

    if (!creator) {
      continue;
    }

    return {
      creative,
      creator,
      talents: getTalentsByIds(creative.talentIds),
    };
  }

  return undefined;
}

const featuredPost = getFeaturedPost();
const featuredCreative = getFeaturedCreative();

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

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-12">
          <section aria-labelledby="main-live-heading" className="md:col-span-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-destructive text-xs font-semibold tracking-[0.14em]">LIVE</p>

                <h3 id="main-live-heading" className="text-foreground mt-2 text-2xl font-semibold">
                  지금 방송 중
                </h3>
              </div>

              <span className="text-muted-foreground text-sm">{liveTalents.length}명</span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liveTalents.map((talent, index) => (
                <LiveTalentCard key={talent.id} talent={talent} eager={index === 0} />
              ))}
            </div>
          </section>

          <section
            aria-labelledby="main-talents-heading"
            className="border-border border-t pt-8 md:col-span-12"
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

              <span className="text-muted-foreground text-sm">{MOCK_TALENTS.length}명</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {MOCK_TALENTS.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          </section>

          <section
            aria-labelledby="main-community-heading"
            className="border-border border-t pt-8 md:col-span-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-community-heading" className="text-foreground text-xl font-semibold">
                최근 글
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_POSTS.length}</span>
            </div>

            {featuredPost ? (
              <div className="mt-5">
                <PostCard
                  post={featuredPost.post}
                  author={featuredPost.author}
                  talents={featuredPost.talents}
                />
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 게시글이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-creative-heading"
            className="border-border border-t pt-8 md:col-span-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-creative-heading" className="text-foreground text-xl font-semibold">
                팬 창작
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_CREATIVES.length}</span>
            </div>

            {featuredCreative ? (
              <div className="mt-5 max-w-sm">
                <CreativeCard
                  creative={featuredCreative.creative}
                  creator={featuredCreative.creator}
                  talents={featuredCreative.talents}
                />
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 창작물이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-projects-heading"
            className="border-border border-t pt-8 md:col-span-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-projects-heading" className="text-foreground text-xl font-semibold">
                프로젝트
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_PROJECTS.length}</span>
            </div>

            {featuredProject ? (
              <div className="mt-5">
                <ProjectCard
                  project={featuredProject}
                  talents={getTalentsByIds(featuredProject.talentIds)}
                />
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 프로젝트가 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-gatherings-heading"
            className="border-border border-t pt-8 md:col-span-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-gatherings-heading" className="text-foreground text-xl font-semibold">
                모임
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_GATHERINGS.length}</span>
            </div>

            {featuredGathering ? (
              <div className="mt-5">
                <GatheringCard
                  gathering={featuredGathering}
                  talents={getTalentsByIds(featuredGathering.talentIds)}
                />
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 모임이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-schedule-heading"
            className="border-border border-t pt-8 md:col-span-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-schedule-heading" className="text-foreground text-xl font-semibold">
                일정
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_SCHEDULES.length}</span>
            </div>

            {featuredSchedule ? (
              <div className="mt-5">
                <ScheduleItem
                  schedule={featuredSchedule}
                  talents={getTalentsByIds(featuredSchedule.talentIds)}
                />
              </div>
            ) : (
              <p className="text-muted-foreground mt-5 text-sm">표시할 일정이 없습니다.</p>
            )}
          </section>

          <section
            aria-labelledby="main-archive-heading"
            className="border-border border-t pt-8 md:col-span-8"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-archive-heading" className="text-foreground text-xl font-semibold">
                아카이브
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_ARCHIVES.length}</span>
            </div>

            {featuredArchive ? (
              <div className="mt-5">
                <ArchiveCard
                  archive={featuredArchive}
                  talents={getTalentsByIds(featuredArchive.talentIds)}
                />
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
