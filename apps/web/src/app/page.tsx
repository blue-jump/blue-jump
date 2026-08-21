import { Container, Section } from "@/shared/layouts";

export default function HomePage() {
  return (
    <Container>
      <Section spacing="lg" aria-labelledby="sample-foundation-heading">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

          <h1
            id="sample-foundation-heading"
            className="text-heading-1 text-foreground mt-4 font-semibold"
          >
            팬과 버튜버가 함께 만드는 공간
          </h1>

          <p className="text-body text-muted-foreground mx-auto mt-5 max-w-xl">
            좋아하는 사람을 중심으로 이야기하고, 만들고, 함께하고, 기억하는 팬 커뮤니티.
          </p>
        </div>
      </Section>
    </Container>
  );
}
