import { CreativeCard } from "@/entities/creative";
import { PostCard } from "@/entities/post";
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
const featuredArchive = MOCK_ARCHIVES.at(0);

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
              {liveTalents.map((talent) => (
                <LiveTalentCard key={talent.id} talent={talent} />
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
            className="border-border bg-surface rounded-2xl border p-6 md:col-span-7 md:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-brand text-xs font-semibold tracking-[0.14em]">PROJECT</p>

                <h3
                  id="main-projects-heading"
                  className="text-foreground mt-2 text-xl font-semibold"
                >
                  프로젝트
                </h3>
              </div>

              <span className="text-muted-foreground text-sm">{MOCK_PROJECTS.length}</span>
            </div>

            {featuredProject && (
              <div className="mt-7 max-w-xl">
                <p className="text-foreground font-semibold">{featuredProject.title}</p>

                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                  {featuredProject.summary}
                </p>
              </div>
            )}
          </section>

          <section
            aria-labelledby="main-gatherings-heading"
            className="border-border bg-surface rounded-2xl border p-6 md:col-span-5 md:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <h3 id="main-gatherings-heading" className="text-foreground text-xl font-semibold">
                모임
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_GATHERINGS.length}</span>
            </div>

            {featuredGathering && (
              <div className="mt-7">
                <p className="text-foreground font-semibold">{featuredGathering.title}</p>

                <p className="text-muted-foreground mt-2 text-sm">{featuredGathering.location}</p>
              </div>
            )}
          </section>

          <section
            aria-labelledby="main-schedule-heading"
            className="bg-foreground text-background rounded-2xl p-6 md:col-span-4 md:min-h-52 md:p-8"
          >
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="text-accent text-xs font-semibold tracking-[0.14em]">SCHEDULE</p>

                <h3 id="main-schedule-heading" className="mt-2 text-xl font-semibold">
                  일정
                </h3>
              </div>

              {featuredSchedule && (
                <p className="line-clamp-3 text-sm text-white/75">{featuredSchedule.title}</p>
              )}
            </div>
          </section>

          <section
            aria-labelledby="main-archive-heading"
            className="border-border relative border-y py-6 md:col-span-8 md:px-4 md:py-8"
          >
            <div
              aria-hidden="true"
              className="bg-decoration absolute inset-y-6 left-0 w-1 rounded-full"
            />

            <div className="pl-5">
              <div className="flex items-center justify-between gap-4">
                <h3 id="main-archive-heading" className="text-foreground text-xl font-semibold">
                  아카이브
                </h3>

                <span className="text-muted-foreground text-sm">{MOCK_ARCHIVES.length}</span>
              </div>

              {featuredArchive && (
                <div className="mt-6">
                  <p className="text-muted-foreground text-xs font-semibold tracking-[0.12em]">
                    {featuredArchive.category}
                  </p>

                  <p className="text-foreground mt-2 font-semibold">{featuredArchive.title}</p>

                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {featuredArchive.summary}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </Section>
    </Container>
  );
}
