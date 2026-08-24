import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";
import { MOCK_ACTIVITY_TYPES, MOCK_TALENTS, MOCK_USERS } from "@/mocks";
import {
  getActivityTypesByIds,
  getCreativesByCreatorId,
  getGatheringsByParticipantId,
  getPostsByAuthorId,
  getProjectsByParticipantId,
  getTalentsByIds,
} from "@/mocks/sample-data.selectors";
import type { User } from "@/types";

import UserProfileView from "./user-profile-view";

function requireUser(userId: string) {
  const user = MOCK_USERS.find((item) => item.id === userId);

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  return user;
}

describe("UserProfileView", () => {
  it("선택된 User의 팬 프로필을 표시합니다.", () => {
    const user = requireUser("user-geumsu");

    render(<UserProfileView user={user} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "팬 프로필",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: user.nickname,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(user.bio!)).toBeInTheDocument();
  });

  it("Profile의 주요 팬 활동 영역을 모두 구성합니다.", () => {
    const user = requireUser("user-geumsu");

    render(<UserProfileView user={user} />);

    for (const name of ["활동 유형", "관심 멤버", "팬 창작", "참여 프로젝트", "팬 활동 기록"]) {
      expect(
        screen.getByRole("region", {
          name,
        }),
      ).toBeInTheDocument();
    }
  });

  it("User의 Activity Type Relation을 해결해 표시합니다.", () => {
    const user = requireUser("user-geumsu");
    const activityTypes = getActivityTypesByIds(user.activityTypeIds);

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "활동 유형",
    });

    for (const activityType of activityTypes) {
      expect(within(section).getByText(activityType.name)).toBeInTheDocument();
      expect(within(section).getByText(activityType.description)).toBeInTheDocument();
    }
  });

  it("User의 Favorite Talent Relation을 해결해 표시합니다.", () => {
    const user = requireUser("user-geumsu");
    const favoriteTalents = getTalentsByIds(user.favoriteTalentIds);

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "관심 멤버",
    });

    for (const talent of favoriteTalents) {
      expect(within(section).getByText(talent.name)).toBeInTheDocument();
    }
  });

  it("Favorite Talent는 기존 Talent Community로 이동할 수 있습니다.", () => {
    const user = requireUser("user-geumsu");
    const favoriteTalent = getTalentsByIds(user.favoriteTalentIds)[0];

    expect(favoriteTalent).toBeDefined();

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "관심 멤버",
    });

    expect(
      within(section).getByRole("link", {
        name: new RegExp(favoriteTalent!.name),
      }),
    ).toHaveAttribute("href", URLS.CLIENT.TALENT(favoriteTalent!.slug));
  });

  it("User가 제작한 Creative를 기존 CreativeCard로 표시합니다.", () => {
    const user = requireUser("user-geumsu");
    const creatives = getCreativesByCreatorId(user.id);

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "팬 창작",
    });

    for (const creative of creatives) {
      expect(within(section).getByText(creative.title)).toBeInTheDocument();
    }
  });

  it("Creative에서 현재 Profile User를 Creator로 유지합니다.", () => {
    const user = requireUser("user-geumsu");
    const creative = getCreativesByCreatorId(user.id)[0];

    expect(creative).toBeDefined();

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "팬 창작",
    });

    expect(within(section).getByText(creative!.title)).toBeInTheDocument();
    expect(within(section).getByText(user.nickname)).toBeInTheDocument();
  });

  it("User가 참여한 Project를 기존 ProjectCard로 표시하고 Detail로 연결합니다.", () => {
    const user = requireUser("user-geumsu");
    const projects = getProjectsByParticipantId(user.id);

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "참여 프로젝트",
    });

    for (const project of projects) {
      expect(within(section).getByText(project.title)).toBeInTheDocument();

      expect(
        within(section).getByRole("link", {
          name: project.title,
        }),
      ).toHaveAttribute("href", URLS.CLIENT.PROJECT_DETAIL(project.id));
    }
  });

  it("Post, Creative, Project, Gathering Relation을 팬 활동 기록으로 조합합니다.", () => {
    const user = requireUser("user-geumsu");

    const post = getPostsByAuthorId(user.id)[0];
    const creative = getCreativesByCreatorId(user.id)[0];
    const project = getProjectsByParticipantId(user.id).find((item) => item.startedAt);
    const gathering = getGatheringsByParticipantId(user.id)[0];

    expect(post).toBeDefined();
    expect(creative).toBeDefined();
    expect(project).toBeDefined();
    expect(gathering).toBeDefined();

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "팬 활동 기록",
    });

    expect(within(section).getByText(post!.title)).toBeInTheDocument();
    expect(within(section).getByText(creative!.title)).toBeInTheDocument();
    expect(within(section).getByText(project!.title)).toBeInTheDocument();
    expect(within(section).getByText(gathering!.title)).toBeInTheDocument();
  });

  it("팬 활동 기록에서 기존 콘텐츠와 Project, Gathering Detail로 이동할 수 있습니다.", () => {
    const user = requireUser("user-geumsu");

    const post = getPostsByAuthorId(user.id)[0];
    const creative = getCreativesByCreatorId(user.id)[0];
    const project = getProjectsByParticipantId(user.id).find((item) => item.startedAt);
    const gathering = getGatheringsByParticipantId(user.id)[0];

    expect(post).toBeDefined();
    expect(creative).toBeDefined();
    expect(project).toBeDefined();
    expect(gathering).toBeDefined();

    render(<UserProfileView user={user} />);

    const section = screen.getByRole("region", {
      name: "팬 활동 기록",
    });

    expect(
      within(section).getByRole("link", {
        name: post!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.POST(post!.id));

    expect(
      within(section).getByRole("link", {
        name: creative!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.CREATIVE_DETAIL(creative!.id));

    expect(
      within(section).getByRole("link", {
        name: project!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.PROJECT_DETAIL(project!.id));

    expect(
      within(section).getByRole("link", {
        name: gathering!.title,
      }),
    ).toHaveAttribute("href", URLS.CLIENT.GATHERING_DETAIL(gathering!.id));
  });

  it("Relation이 없는 Profile은 임의 데이터를 만들지 않고 Empty 상태를 표시합니다.", () => {
    const user = {
      id: "user-empty",
      nickname: "조용한팬",
      bio: "아직 둘러보는 중입니다.",
      favoriteTalentIds: [],
      activityTypeIds: [],
      joinedAt: "2026-08-01T00:00:00.000Z",
    } satisfies User;

    render(<UserProfileView user={user} />);

    const activityTypeSection = screen.getByRole("region", {
      name: "활동 유형",
    });

    const favoriteTalentSection = screen.getByRole("region", {
      name: "관심 멤버",
    });

    const creativeSection = screen.getByRole("region", {
      name: "팬 창작",
    });

    const projectSection = screen.getByRole("region", {
      name: "참여 프로젝트",
    });

    const activitySection = screen.getByRole("region", {
      name: "팬 활동 기록",
    });

    expect(
      within(activityTypeSection).getByText("아직 표시된 활동 유형이 없습니다."),
    ).toBeInTheDocument();

    expect(
      within(favoriteTalentSection).getByText("아직 표시된 관심 멤버가 없습니다."),
    ).toBeInTheDocument();

    expect(
      within(creativeSection).getByText("아직 등록된 팬 창작물이 없습니다."),
    ).toBeInTheDocument();

    expect(
      within(projectSection).getByText("아직 참여한 프로젝트가 없습니다."),
    ).toBeInTheDocument();

    expect(
      within(activitySection).getByText("아직 남겨진 팬 활동이 없습니다."),
    ).toBeInTheDocument();
  });

  it("현재 Mock에 존재하는 Activity Type과 Talent 외의 데이터를 추가하지 않습니다.", () => {
    const user = requireUser("user-geumsu");

    render(<UserProfileView user={user} />);

    const activitySection = screen.getByRole("region", {
      name: "활동 유형",
    });

    const favoriteTalentSection = screen.getByRole("region", {
      name: "관심 멤버",
    });

    const expectedActivityTypes = MOCK_ACTIVITY_TYPES.filter((activityType) =>
      user.activityTypeIds.includes(activityType.id),
    );

    const expectedTalents = MOCK_TALENTS.filter((talent) =>
      user.favoriteTalentIds.includes(talent.id),
    );

    for (const activityType of expectedActivityTypes) {
      expect(within(activitySection).getByText(activityType.name)).toBeInTheDocument();
    }

    for (const talent of expectedTalents) {
      expect(within(favoriteTalentSection).getByText(talent.name)).toBeInTheDocument();
    }
  });
});
