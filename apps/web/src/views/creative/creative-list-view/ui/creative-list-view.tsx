import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";
import { MOCK_TALENTS } from "@/mocks/talents.mock";
import { Container, Section } from "@/shared/layouts";
import type { Creative, Talent, User } from "@/types";

import CreativeFeed, { type CreativeFeedItem } from "./creative-feed";

export interface CreativeListViewProps {
  creatives?: readonly Creative[];
}

function resolveCreativeFeedItems(creatives: readonly Creative[]): CreativeFeedItem[] {
  return [...creatives]
    .sort(
      (leftCreative, rightCreative) =>
        new Date(rightCreative.createdAt).getTime() - new Date(leftCreative.createdAt).getTime(),
    )
    .flatMap((creative) => {
      const creator = findUserById(creative.creatorId);

      if (!creator) {
        return [];
      }

      return [
        {
          creative,
          creator: {
            id: creator.id,
            nickname: creator.nickname,
          } satisfies Pick<User, "id" | "nickname">,
          talents: getTalentsByIds(creative.talentIds).map(
            (talent) =>
              ({
                id: talent.id,
                name: talent.name,
              }) satisfies Pick<Talent, "id" | "name">,
          ),
        },
      ];
    });
}

export default function CreativeListView({ creatives = MOCK_CREATIVES }: CreativeListViewProps) {
  const items = resolveCreativeFeedItems(creatives);

  const talents = MOCK_TALENTS.map(
    (talent) =>
      ({
        id: talent.id,
        name: talent.name,
      }) satisfies Pick<Talent, "id" | "name">,
  );

  return (
    <Container>
      <Section spacing="lg" aria-labelledby="creative-list-heading">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

            <h1
              id="creative-list-heading"
              className="text-heading-1 text-foreground mt-3 font-semibold"
            >
              창작
            </h1>
          </div>

          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground font-semibold">{items.length}</strong> 개의 창작물
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <CreativeFeed items={items} talents={talents} />
        </div>
      </Section>
    </Container>
  );
}
