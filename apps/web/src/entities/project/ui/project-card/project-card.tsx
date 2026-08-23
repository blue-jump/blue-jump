import type { Project, ProjectStatus, Talent } from "@/types";

interface ProjectCardProps {
  project: Project;
  talents: Pick<Talent, "id" | "name">[];
}

const PROJECT_STATUS_LABELS = {
  RECRUITING: "모집 중",
  IN_PROGRESS: "진행 중",
  COMPLETED: "완료",
} satisfies Record<ProjectStatus, string>;

export default function ProjectCard({ project, talents }: ProjectCardProps) {
  const relatedTalentNames = talents.map((talent) => talent.name).join(" · ");
  const participantCount = project.participantIds.length;

  return (
    <article className="border-border bg-surface rounded-xl border p-5">
      <header className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium">
            {PROJECT_STATUS_LABELS[project.status]}
          </p>

          <h3 className="text-foreground mt-2 text-lg leading-snug font-semibold">
            {project.title}
          </h3>
        </div>

        <span className="text-muted-foreground shrink-0 text-sm">참여 {participantCount}명</span>
      </header>

      <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-6">{project.summary}</p>

      {relatedTalentNames ? (
        <p className="text-foreground mt-4 text-sm font-medium">{relatedTalentNames}</p>
      ) : null}

      {project.roles.length > 0 ? (
        <div className="border-border mt-5 border-t pt-4">
          <p className="text-muted-foreground text-xs">함께할 사람</p>

          <ul className="mt-3 space-y-2">
            {project.roles.map((role) => (
              <li key={role.id} className="flex items-center justify-between gap-4 text-sm">
                <span className="text-foreground">{role.name}</span>

                <span className="text-muted-foreground tabular-nums">
                  {role.filled} / {role.capacity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
