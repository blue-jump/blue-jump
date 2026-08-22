import {
  MOCK_ARCHIVES,
  MOCK_CREATIVES,
  MOCK_GATHERINGS,
  MOCK_POSTS,
  MOCK_PROJECTS,
  MOCK_SCHEDULES,
  MOCK_TALENTS,
} from "@/mocks";
import { Container, Section } from "@/shared/layouts";

const liveTalents = MOCK_TALENTS.filter((talent) => talent.isLive);

const featuredPost = MOCK_POSTS.at(0);
const featuredCreative = MOCK_CREATIVES.at(0);
const featuredProject = MOCK_PROJECTS.at(0);
const featuredGathering = MOCK_GATHERINGS.at(0);
const featuredSchedule = MOCK_SCHEDULES.at(0);
const featuredArchive = MOCK_ARCHIVES.at(0);

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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          <section
            aria-labelledby="main-live-heading"
            className="border-border from-brand/12 via-surface to-accent/10 relative overflow-hidden rounded-2xl border bg-linear-to-br p-6 md:col-span-7 md:min-h-64 md:p-8"
          >
            <div
              aria-hidden="true"
              className="bg-accent/10 absolute -top-20 -right-20 size-64 rounded-full blur-3xl"
            />

            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-destructive size-2 rounded-full" />

                    <p className="text-destructive text-xs font-semibold tracking-[0.14em]">LIVE</p>
                  </div>

                  <h3
                    id="main-live-heading"
                    className="text-foreground mt-2 text-2xl font-semibold"
                  >
                    지금 방송 중
                  </h3>
                </div>

                <strong className="text-brand text-4xl font-semibold tabular-nums">
                  {liveTalents.length}
                </strong>
              </div>

              <div className="flex flex-wrap gap-2">
                {liveTalents.map((talent) => (
                  <span
                    key={talent.id}
                    className="border-border/70 bg-surface/70 text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ backgroundColor: talent.signatureColor }}
                    />

                    {talent.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section
            aria-labelledby="main-talents-heading"
            className="border-border bg-surface rounded-2xl border p-6 md:col-span-5 md:min-h-64 md:p-8"
          >
            <div className="flex h-full flex-col">
              <div>
                <p className="text-brand text-xs font-semibold tracking-[0.14em]">BLUE JUMP</p>

                <h3
                  id="main-talents-heading"
                  className="text-foreground mt-2 text-xl font-semibold"
                >
                  멤버
                </h3>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3">
                {MOCK_TALENTS.map((talent) => (
                  <div key={talent.id} className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: talent.signatureColor }}
                    />

                    <span className="text-foreground truncate text-sm font-medium">
                      {talent.name}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground mt-auto pt-6 text-xs">대표 · 2기 · 3기 · 4기</p>
            </div>
          </section>

          <section
            aria-labelledby="main-community-heading"
            className="border-border border-y py-6 md:col-span-5 md:px-2 md:py-8"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="main-community-heading" className="text-foreground text-xl font-semibold">
                최근 글
              </h3>

              <span className="text-muted-foreground text-sm">{MOCK_POSTS.length}</span>
            </div>

            {featuredPost && (
              <div className="mt-6">
                <p className="text-foreground text-base font-semibold">{featuredPost.title}</p>

                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                  {featuredPost.body}
                </p>
              </div>
            )}
          </section>

          <section
            aria-labelledby="main-creative-heading"
            className="bg-muted relative overflow-hidden rounded-2xl p-6 md:col-span-7 md:min-h-56 md:p-8"
          >
            <div
              aria-hidden="true"
              className="bg-accent/10 absolute -right-16 -bottom-20 size-60 rounded-full blur-3xl"
            />

            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="flex items-center justify-between gap-4">
                <h3 id="main-creative-heading" className="text-foreground text-2xl font-semibold">
                  팬 창작
                </h3>

                <span className="text-muted-foreground text-sm">{MOCK_CREATIVES.length}</span>
              </div>

              {featuredCreative && (
                <div className="max-w-lg">
                  <p className="text-accent text-xs font-semibold tracking-[0.12em]">
                    {featuredCreative.type}
                  </p>

                  <p className="text-foreground mt-2 text-lg font-semibold">
                    {featuredCreative.title}
                  </p>
                </div>
              )}
            </div>
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
