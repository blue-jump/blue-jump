import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import type { NavigationItem } from "@/constants";

import MobileNavigation from "./mobile-navigation";

const ITEMS = [
  {
    id: "main",
    label: "메인",
    href: "/",
    available: true,
  },
  {
    id: "community",
    label: "커뮤니티",
    href: "/community",
    available: true,
  },
  {
    id: "creative",
    label: "창작",
    href: "/creative",
    available: true,
  },
  {
    id: "projects",
    label: "프로젝트",
    href: "/projects",
    available: true,
  },
  {
    id: "gatherings",
    label: "모임",
    href: "/gatherings",
    available: true,
  },
  {
    id: "archive",
    label: "아카이브",
    href: "/archive",
    available: true,
  },
  {
    id: "talents",
    label: "버튜버",
    href: "/talents",
    available: true,
  },
] satisfies NavigationItem[];

const PROFILE_ITEM = {
  id: "profile",
  label: "프로필",
  href: "/profile",
  available: true,
} satisfies NavigationItem;

const meta = {
  title: "Shared/Layouts/MobileNavigation",
  component: MobileNavigation,
  parameters: {
    layout: "centered",
  },
  args: {
    items: ITEMS,
    profileItem: PROFILE_ITEM,
    pathname: "/",
  },
  argTypes: {
    items: {
      control: false,
    },
    profileItem: {
      control: false,
    },
    pathname: {
      control: "text",
    },
  },
} satisfies Meta<typeof MobileNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CommunityActive: Story = {
  args: {
    pathname: "/community",
  },
};
