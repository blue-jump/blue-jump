import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { URLS } from "@/constants";

import SocialLoginLink from "./social-login-link";

const meta = {
  title: "Features/Auth/SocialLoginLink",
  component: SocialLoginLink,
} satisfies Meta<typeof SocialLoginLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Google: Story = {
  args: {
    providerId: "google",
    href: URLS.API.AUTH.GOOGLE,
  },
};

export const Naver: Story = {
  args: {
    providerId: "naver",
    href: URLS.API.AUTH.NAVER,
  },
};
