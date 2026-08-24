import { SAMPLE_DEMO_USER_ID } from "@/constants";
import { GatheringDetail } from "@/entities/gathering";
import { GatheringParticipationDemo } from "@/features/gathering";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Gathering } from "@/types";

export interface GatheringDetailViewProps {
  gathering: Gathering;
}

export default function GatheringDetailView({ gathering }: GatheringDetailViewProps) {
  const organizer = findUserById(gathering.organizerId);
  const participants = getUsersByIds(gathering.participantIds);
  const talents = getTalentsByIds(gathering.talentIds);

  if (!organizer) {
    return (
      <Container>
        <Section spacing="lg">
          <p className="text-muted-foreground text-sm">모임 주최자 정보를 확인할 수 없습니다.</p>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section spacing="lg">
        <GatheringDetail
          gathering={gathering}
          organizer={organizer}
          participants={participants}
          talents={talents}
        />

        <div className="mx-auto w-full max-w-4xl">
          <GatheringParticipationDemo gathering={gathering} currentUserId={SAMPLE_DEMO_USER_ID} />
        </div>
      </Section>
    </Container>
  );
}
