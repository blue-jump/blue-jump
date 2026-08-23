import { CreativeDetail } from "@/entities/creative";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Creative } from "@/types";

export interface CreativeDetailViewProps {
  creative: Creative;
}

export default function CreativeDetailView({ creative }: CreativeDetailViewProps) {
  const creator = findUserById(creative.creatorId);
  const talents = getTalentsByIds(creative.talentIds);

  if (!creator) {
    return (
      <Container>
        <Section spacing="lg">
          <p className="text-muted-foreground text-sm">창작자 정보를 확인할 수 없습니다.</p>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section spacing="lg">
        <CreativeDetail creative={creative} creator={creator} talents={talents} />
      </Section>
    </Container>
  );
}
