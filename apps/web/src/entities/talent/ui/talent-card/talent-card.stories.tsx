import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import type { Talent } from "@/types";

import TalentCard from "./talent-card";

const offlineTalent: Talent = {
  id: "talent-mogugu",
  slug: "mogugu",
  name: "모구구",
  englishName: "9mogu9",
  description: "꼬마 견습 사신",
  fandomName: "사골",
  signatureColor: "#FDDFC0",
  role: "MEMBER",
  generation: 2,
  profileImageUrl: "/images/mock/talents/mogugu-profile.webp",
  coverImageUrl: "/images/mock/talents/mogugu-cover.webp",
  themeKey: "mogugu",
  isLive: false,
};

const liveTalent: Talent = {
  id: "talent-jegal",
  slug: "jegal",
  name: "제갈금자",
  englishName: "Jegal",
  description: "블루점프의 악마",
  fandomName: "금수",
  signatureColor: "#F7394F",
  role: "MEMBER",
  generation: 2,
  profileImageUrl: "/images/mock/talents/jegal-profile.webp",
  coverImageUrl: "/images/mock/talents/jegal-cover.webp",
  themeKey: "jegal",
  isLive: true,
  liveTitle: "금수들 오늘도 출석해라",
};

const meta: Meta<typeof TalentCard> = {
  title: "Entities/Talent/TalentCard",
  component: TalentCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    talent: offlineTalent,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Live: Story = {
  args: {
    talent: liveTalent,
  },
};
