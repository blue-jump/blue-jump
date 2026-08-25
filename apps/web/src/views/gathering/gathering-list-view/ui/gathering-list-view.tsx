import { GatheringCard } from "@/entities/gathering";
import { MOCK_GATHERINGS } from "@/mocks/gatherings.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Gathering } from "@/types";

export interface GatheringListViewProps {
  gatherings?: readonly Gathering[];
}

function getStartsAtTimestamp(gathering: Gathering) {
  return new Date(gathering.startsAt).getTime();
}

function sortGatherings(gatherings: readonly Gathering[]) {
  return [...gatherings].sort((leftGathering, rightGathering) => {
    const leftCompleted = leftGathering.status === "COMPLETED";
    const rightCompleted = rightGathering.status === "COMPLETED";

    if (leftCompleted !== rightCompleted) {
      return leftCompleted ? 1 : -1;
    }

    const leftStartsAt = getStartsAtTimestamp(leftGathering);
    const rightStartsAt = getStartsAtTimestamp(rightGathering);

    if (!leftCompleted) {
      const startsAtDifference = leftStartsAt - rightStartsAt;

      if (startsAtDifference !== 0) {
        return startsAtDifference;
      }
    } else {
      const startsAtDifference = rightStartsAt - leftStartsAt;

      if (startsAtDifference !== 0) {
        return startsAtDifference;
      }
    }

    return leftGathering.id.localeCompare(rightGathering.id);
  });
}

export default function GatheringListView({
  gatherings = MOCK_GATHERINGS,
}: GatheringListViewProps) {
  const sortedGatherings = sortGatherings(gatherings);

  return (
    <Container>
      <Section spacing="lg">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

            <h1 className="text-heading-1 text-foreground mt-3 font-semibold">모임</h1>

            <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base">
              팬들과 함께 만날 수 있는 예정된 모임과 지난 활동을 살펴봅니다.
            </p>
          </div>

          <p className="text-muted-foreground shrink-0 text-sm">
            <strong className="text-foreground font-semibold">{sortedGatherings.length}</strong>{" "}
            개의 모임
          </p>
        </div>

        {sortedGatherings.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
            {sortedGatherings.map((gathering) => (
              <GatheringCard
                key={gathering.id}
                gathering={gathering}
                talents={getTalentsByIds(gathering.talentIds)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground border-border mt-8 border-t py-8 text-sm">
            아직 예정된 모임이 없습니다.
          </p>
        )}
      </Section>
    </Container>
  );
}
