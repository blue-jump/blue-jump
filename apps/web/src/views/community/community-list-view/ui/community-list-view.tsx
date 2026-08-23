import { MOCK_POSTS } from "@/mocks/posts.mock";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";
import { Container, Section } from "@/shared/layouts";
import type { Post, Talent, User } from "@/types";

import CommunityPostFeed, { type CommunityPostFeedItem } from "./community-post-feed";

export interface CommunityListViewProps {
  posts?: readonly Post[];
}

function resolvePostFeedItems(posts: readonly Post[]): CommunityPostFeedItem[] {
  return [...posts]
    .sort(
      (leftPost, rightPost) =>
        new Date(rightPost.createdAt).getTime() - new Date(leftPost.createdAt).getTime(),
    )
    .flatMap((post) => {
      const author = findUserById(post.authorId);

      if (!author) {
        return [];
      }

      return [
        {
          post,
          author: {
            nickname: author.nickname,
            profileImageUrl: author.profileImageUrl,
          } satisfies Pick<User, "nickname" | "profileImageUrl">,
          talents: getTalentsByIds(post.talentIds).map(
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

export default function CommunityListView({ posts = MOCK_POSTS }: CommunityListViewProps) {
  const items = resolvePostFeedItems(posts);

  return (
    <Container>
      <Section spacing="lg" aria-labelledby="community-list-heading">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand text-sm font-semibold tracking-[0.12em]">BLUE JUMP</p>

            <h1
              id="community-list-heading"
              className="text-heading-1 text-foreground mt-3 font-semibold"
            >
              커뮤니티
            </h1>
          </div>

          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground font-semibold">{items.length}</strong> 개의 글
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <CommunityPostFeed items={items} />
        </div>
      </Section>
    </Container>
  );
}
