import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import type { NavigationItem } from "@/constants";

import GlobalNavigation from "./global-navigation";

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

const meta = {
  title: "Shared/Layouts/GlobalNavigation",
  component: GlobalNavigation,
  parameters: {
    layout: "centered",
  },
  args: {
    items: ITEMS,
    pathname: "/",
    variant: "desktop",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["desktop", "mobile"],
    },
    items: {
      control: false,
    },
    pathname: {
      control: "text",
    },
    onNavigate: {
      control: false,
    },
  },
} satisfies Meta<typeof GlobalNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CommunityActive: Story = {
  args: {
    pathname: "/community",
  },
};

export const CreativeActive: Story = {
  args: {
    pathname: "/creative",
  },
};

export const Mobile: Story = {
  args: {
    variant: "mobile",
    pathname: "/community",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};
