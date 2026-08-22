import type { ActivityType } from "@/types";

export const MOCK_ACTIVITY_TYPES = [
  {
    id: "artist",
    name: "Artist",
    description: "팬아트, 만화, 낙서 같은 그림을 올립니다.",
  },
  {
    id: "meme-maker",
    name: "Meme Maker",
    description: "방송 한 장면을 며칠짜리 밈으로 만들어 버립니다.",
  },
  {
    id: "clip-maker",
    name: "Clip Maker",
    description: "다시 찾기 힘든 장면을 잘라서 남깁니다.",
  },
  {
    id: "video-creator",
    name: "Video Creator",
    description: "편집 영상이나 팬 영상을 만듭니다.",
  },
  {
    id: "musician",
    name: "Musician",
    description: "커버, 팬송, 연주 등 음악 작업을 합니다.",
  },
  {
    id: "designer",
    name: "Designer",
    description: "포스터나 굿즈 시안 같은 디자인 작업을 합니다.",
  },
  {
    id: "developer",
    name: "Developer",
    description: "방송이나 팬 활동에 쓸 만한 이상한 걸 종종 만듭니다.",
  },
  {
    id: "archivist",
    name: "Archivist",
    description: "옛날 방송, 밈, 사건사고를 기억하고 정리합니다.",
  },
  {
    id: "organizer",
    name: "Organizer",
    description: "사람 모아서 일을 벌이는 쪽입니다.",
  },
] satisfies ActivityType[];
