import { TalentCard } from "@/entities/talent";
import { MOCK_TALENTS } from "@/mocks";
import { Container, Section } from "@/shared/layouts";

export default function TalentListView() {
  return (
    <Container>
      <Section spacing="lg" aria-labelledby="talent-list-heading">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

            <h1
              id="talent-list-heading"
              className="text-heading-1 text-foreground mt-3 font-semibold"
            >
              버튜버
            </h1>
          </div>

          <p className="text-muted-foreground shrink-0 text-sm">
            <strong className="text-foreground font-semibold">{MOCK_TALENTS.length}</strong>명
          </p>
        </div>

        <section aria-labelledby="talent-grid-heading" className="mt-8 md:mt-10">
          <h2 id="talent-grid-heading" className="sr-only">
            블루점프 소속 버튜버
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {MOCK_TALENTS.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </section>
      </Section>
    </Container>
  );
}
