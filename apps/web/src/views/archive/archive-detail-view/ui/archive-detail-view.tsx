import { ArchiveDetail } from "@/entities/archive";
import {
  findCreativeById,
  findPostById,
  findProjectById,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Archive } from "@/types";

export interface ArchiveDetailViewProps {
  archive: Archive;
}

function resolveRelatedItems<T>(
  ids: readonly string[] | undefined,
  findById: (id: string) => T | undefined,
): T[] {
  return (ids ?? []).flatMap((id) => {
    const item = findById(id);

    return item ? [item] : [];
  });
}

export default function ArchiveDetailView({ archive }: ArchiveDetailViewProps) {
  const talents = getTalentsByIds(archive.talentIds);

  const posts = resolveRelatedItems(archive.relatedPostIds, findPostById);

  const creatives = resolveRelatedItems(archive.relatedCreativeIds, findCreativeById);

  const projects = resolveRelatedItems(archive.relatedProjectIds, findProjectById);

  return (
    <Container>
      <Section spacing="lg">
        <ArchiveDetail
          archive={archive}
          talents={talents}
          posts={posts}
          creatives={creatives}
          projects={projects}
        />
      </Section>
    </Container>
  );
}
