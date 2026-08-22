import type { Project } from "@/types";

export const MOCK_PROJECTS = [
  {
    id: "project-blue-jump-highlight-archive",
    organizerId: "user-night-shift",
    talentIds: [
      "talent-great-moon-aroma",
      "talent-jegal",
      "talent-mogugu",
      "talent-haroha",
      "talent-nunungzi",
      "talent-marronie",
      "talent-yang-doki",
    ],
    participantIds: ["user-night-shift", "user-geumsu", "user-sagol", "user-nureongi"],
    title: "블루점프 명장면 아카이브 정리",
    summary: "신입들이 옛날 밈 물어볼 때마다 설명하기 힘들어서 그냥 우리가 정리하기로 했습니다.",
    status: "IN_PROGRESS",
    roles: [
      {
        id: "archive",
        name: "옛날 방송 발굴",
        capacity: 4,
        filled: 2,
      },
      {
        id: "clip",
        name: "클립 정리",
        capacity: 4,
        filled: 1,
      },
      {
        id: "caption",
        name: "설명 작성",
        capacity: 3,
        filled: 1,
      },
    ],
    startedAt: "2026-08-03T00:00:00.000Z",
  },
  {
    id: "project-haroha-fan-mv",
    organizerId: "user-ghost",
    talentIds: ["talent-haroha"],
    participantIds: ["user-ghost", "user-yardbug"],
    title: "하로하 커버곡 팬 MV",
    summary: "망령들이 그림이랑 영상 조금씩 모아서 팬 MV 하나 만들어보려고 합니다.",
    status: "RECRUITING",
    roles: [
      {
        id: "illustration",
        name: "일러스트",
        capacity: 5,
        filled: 1,
      },
      {
        id: "motion",
        name: "모션",
        capacity: 2,
        filled: 0,
      },
      {
        id: "editing",
        name: "영상 편집",
        capacity: 2,
        filled: 1,
      },
    ],
    startedAt: "2026-08-17T00:00:00.000Z",
  },
  {
    id: "project-fourth-generation-relay",
    organizerId: "user-yardbug",
    talentIds: ["talent-marronie", "talent-yang-doki"],
    participantIds: ["user-yardbug", "user-hambak", "user-sagol"],
    title: "4기 첫인상 팬아트 릴레이",
    summary: "지금 아니면 못 그리는 어색한 4기 시절을 남겨둡시다.",
    status: "RECRUITING",
    roles: [
      {
        id: "artist",
        name: "그림",
        capacity: 10,
        filled: 3,
      },
      {
        id: "layout",
        name: "최종 편집",
        capacity: 2,
        filled: 0,
      },
    ],
    startedAt: "2026-08-19T00:00:00.000Z",
  },
] satisfies Project[];
