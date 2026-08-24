import { ProjectCard } from "@/entities/project";
import { MOCK_PROJECTS } from "@/mocks/projects.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Project } from "@/types";

export interface ProjectListViewProps {
  projects?: readonly Project[];
}

const PROJECT_STATUS_PRIORITY = {
  RECRUITING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
} satisfies Record<Project["status"], number>;

function getStartedAtTimestamp(project: Project) {
  if (!project.startedAt) {
    return Number.NEGATIVE_INFINITY;
  }

  return new Date(project.startedAt).getTime();
}

function sortProjects(projects: readonly Project[]) {
  return [...projects].sort((leftProject, rightProject) => {
    const statusDifference =
      PROJECT_STATUS_PRIORITY[leftProject.status] - PROJECT_STATUS_PRIORITY[rightProject.status];

    if (statusDifference !== 0) {
      return statusDifference;
    }

    const startedAtDifference =
      getStartedAtTimestamp(rightProject) - getStartedAtTimestamp(leftProject);

    if (startedAtDifference !== 0) {
      return startedAtDifference;
    }

    return leftProject.id.localeCompare(rightProject.id);
  });
}

export default function ProjectListView({ projects = MOCK_PROJECTS }: ProjectListViewProps) {
  const sortedProjects = sortProjects(projects);

  return (
    <Container>
      <Section spacing="lg" aria-labelledby="project-list-heading">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

            <h1
              id="project-list-heading"
              className="text-heading-1 text-foreground mt-3 font-semibold"
            >
              프로젝트
            </h1>

            <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base">
              팬들이 함께 만들고 있는 작업과 새로 사람을 찾는 프로젝트를 살펴봅니다.
            </p>
          </div>

          <p className="text-muted-foreground shrink-0 text-sm">
            <strong className="text-foreground font-semibold">{sortedProjects.length}</strong> 개의
            프로젝트
          </p>
        </div>

        {sortedProjects.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                talents={getTalentsByIds(project.talentIds)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground border-border mt-8 border-t py-8 text-sm">
            아직 등록된 프로젝트가 없습니다.
          </p>
        )}
      </Section>
    </Container>
  );
}
