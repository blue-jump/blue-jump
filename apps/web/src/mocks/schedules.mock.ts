import type { Schedule } from "@/types";

export const MOCK_SCHEDULES = [
  {
    id: "schedule-blue-jump-group",
    talentIds: [
      "talent-great-moon-aroma",
      "talent-jegal",
      "talent-mogugu",
      "talent-haroha",
      "talent-nunungzi",
    ],
    title: "대표님이 또 뭔가 준비한 블루점프 단체합방",
    type: "LIVE",
    startsAt: "2026-08-22T11:00:00.000Z",
  },
  {
    id: "schedule-nunungzi-stock",
    talentIds: ["talent-nunungzi"],
    title: "종토방 개장 - 오늘은 진짜 안 물림",
    type: "LIVE",
    startsAt: "2026-08-23T10:00:00.000Z",
  },
  {
    id: "schedule-haroha-song",
    talentIds: ["talent-haroha"],
    title: "노래 조금 하고 잡담 많이 하는 방송",
    type: "LIVE",
    startsAt: "2026-08-24T11:00:00.000Z",
  },
  {
    id: "schedule-fourth-generation",
    talentIds: ["talent-marronie", "talent-yang-doki"],
    title: "4기 둘이서 친해져 보기",
    type: "EVENT",
    startsAt: "2026-08-25T10:30:00.000Z",
  },
  {
    id: "schedule-jegal-mogugu",
    talentIds: ["talent-jegal", "talent-mogugu"],
    title: "제구구 오늘은 안 싸웁니다",
    type: "LIVE",
    startsAt: "2026-08-27T11:00:00.000Z",
  },
  {
    id: "schedule-marronie-drawing",
    talentIds: ["talent-marronie"],
    title: "그림 그리면서 밀린 얘기",
    type: "LIVE",
    startsAt: "2026-08-28T09:00:00.000Z",
  },
  {
    id: "schedule-yang-doki-game",
    talentIds: ["talent-yang-doki"],
    title: "천천히 종겜합니다",
    type: "LIVE",
    startsAt: "2026-08-29T10:00:00.000Z",
  },
] satisfies Schedule[];
