import { URLS } from "./urls.constant";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  available: boolean;
}

export const NAVIGATION_ITEMS = [
  {
    id: "main",
    label: "메인",
    href: URLS.CLIENT.HOME,
    available: true,
  },
  {
    id: "community",
    label: "커뮤니티",
    href: URLS.CLIENT.COMMUNITY,
    available: true,
  },
  {
    id: "creative",
    label: "창작",
    href: URLS.CLIENT.CREATIVE,
    available: true,
  },
  {
    id: "projects",
    label: "프로젝트",
    href: URLS.CLIENT.PROJECTS,
    available: true,
  },
  {
    id: "gatherings",
    label: "모임",
    href: URLS.CLIENT.GATHERINGS,
    available: true,
  },
  {
    id: "archive",
    label: "아카이브",
    href: URLS.CLIENT.ARCHIVE,
    available: true,
  },
  {
    id: "talents",
    label: "멤버",
    href: URLS.CLIENT.TALENTS,
    available: true,
  },
] satisfies NavigationItem[];

export const PROFILE_NAVIGATION_ITEM = {
  id: "profile",
  label: "프로필",
  href: URLS.CLIENT.PROFILE,
  available: true,
} satisfies NavigationItem;
