import { ArchiveCard } from "@/entities/archive";
import { MOCK_ARCHIVES } from "@/mocks/archives.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Archive } from "@/types";

export interface ArchiveListViewProps {
  archives?: readonly Archive[];
}

function sortArchives(archives: readonly Archive[]) {
  return [...archives].sort((leftArchive, rightArchive) => {
    const occurredAtDifference =
      new Date(rightArchive.occurredAt).getTime() - new Date(leftArchive.occurredAt).getTime();

    if (occurredAtDifference !== 0) {
      return occurredAtDifference;
    }

    return leftArchive.id.localeCompare(rightArchive.id);
  });
}

export default function ArchiveListView({ archives = MOCK_ARCHIVES }: ArchiveListViewProps) {
  const sortedArchives = sortArchives(archives);

  return (
    <Container>
      <Section spacing="lg" aria-labelledby="archive-list-heading">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

            <h1
              id="archive-list-heading"
              className="text-heading-1 text-foreground mt-3 font-semibold"
            >
              아카이브
            </h1>

            <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base">
              팬덤 안에서 생겨난 말과 장면, 사건과 프로젝트의 기록을 모아봅니다.
            </p>
          </div>

          <p className="text-muted-foreground shrink-0 text-sm">
            <strong className="text-foreground font-semibold">{sortedArchives.length}</strong> 개의
            기록
          </p>
        </div>

        {sortedArchives.length > 0 ? (
          <div className="border-border mt-8 space-y-7 border-t pt-7">
            {sortedArchives.map((archive) => (
              <ArchiveCard
                key={archive.id}
                archive={archive}
                talents={getTalentsByIds(archive.talentIds)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground border-border mt-8 border-t py-8 text-sm">
            아직 쌓인 기록이 없습니다.
          </p>
        )}
      </Section>
    </Container>
  );
}
