import type { Comment } from "@/types";

export const MOCK_COMMENTS = [
  {
    id: "comment-1",
    postId: "post-1",
    authorId: "user-geumsu",
    body: "통솔이 아니라 본인이 제일 큰 변수였음",
    createdAt: "2026-08-21T13:24:00.000Z",
  },
  {
    id: "comment-2",
    postId: "post-1",
    authorId: "user-sagol",
    body: "구구가 오늘은 비교적 정상인이었다는 게 제일 무서움",
    createdAt: "2026-08-21T13:31:00.000Z",
  },
  {
    id: "comment-3",
    postId: "post-2",
    authorId: "user-night-shift",
    body: "금자 목소리 한 톤 올라가면 이제 시작임ㅋㅋ",
    createdAt: "2026-08-21T12:51:00.000Z",
  },
  {
    id: "comment-4",
    postId: "post-3",
    authorId: "user-geumsu",
    body: "그래도 눌렀으니까 분량은 나왔잖아",
    createdAt: "2026-08-21T11:12:00.000Z",
  },
  {
    id: "comment-5",
    postId: "post-4",
    authorId: "user-yardbug",
    body: "이 글 보고 한 곡만 들으러 갔다가 같이 잡힘",
    createdAt: "2026-08-20T18:41:00.000Z",
  },
  {
    id: "comment-6",
    postId: "post-5",
    authorId: "user-hambak",
    body: "결국 항상 누눙지가 맞는 세계관",
    createdAt: "2026-08-20T15:19:00.000Z",
  },
  {
    id: "comment-7",
    postId: "post-5",
    authorId: "user-nureongi",
    body: "반박 시 님진뒤",
    createdAt: "2026-08-20T15:23:00.000Z",
  },
  {
    id: "comment-8",
    postId: "post-6",
    authorId: "user-hambak",
    body: "도끼 답변 기다리는 동안 마로니가 다음 얘기 시작함ㅋㅋㅋㅋ",
    createdAt: "2026-08-20T13:01:00.000Z",
  },
  {
    id: "comment-9",
    postId: "post-7",
    authorId: "user-yardbug",
    body: "1배속파 여기 있습니다. 그 공백까지 콘텐츠임.",
    createdAt: "2026-08-19T16:14:00.000Z",
  },
  {
    id: "comment-10",
    postId: "post-8",
    authorId: "user-nureongi",
    body: "항상 기술 설명 들을 때는 왜 저러나 싶은데 방송 시작하면 재밌어서 더 화남",
    createdAt: "2026-08-19T10:47:00.000Z",
  },
] satisfies Comment[];
