import { SAMPLE_DEMO_USER_ID } from "@/constants";
import { ProjectDetail } from "@/entities/project";
import { ProjectParticipationDemo } from "@/features/project";
import { findUserById, getTalentsByIds, getUsersByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Project } from "@/types";

export interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const organizer = findUserById(project.organizerId);
  const participants = getUsersByIds(project.participantIds);
  const talents = getTalentsByIds(project.talentIds);

  if (!organizer) {
    return (
      <Container>
        <Section spacing="lg">
          <p className="text-muted-foreground text-sm">
            프로젝트 주최자 정보를 확인할 수 없습니다.
          </p>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section spacing="lg">
        <ProjectDetail
          project={project}
          organizer={organizer}
          participants={participants}
          talents={talents}
        />

        <div className="mx-auto w-full max-w-4xl">
          <ProjectParticipationDemo project={project} currentUserId={SAMPLE_DEMO_USER_ID} />
        </div>
      </Section>
    </Container>
  );
}
