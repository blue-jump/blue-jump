import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import type { Talent } from "@/types";

import LiveTalentCard from "./live-talent-card";

const talent: Talent = {
  id: "talent-great-moon-aroma",
  slug: "great-moon-aroma",
  name: "대월향",
  englishName: "GreatMoonAroma",
  description: "블루점프 대표",
  fandomName: "직원단",
  signatureColor: "#0123B4",
  role: "REPRESENTATIVE",
  profileImageUrl: "/images/mock/talents/great-moon-aroma-profile.webp",
  coverImageUrl: "/images/mock/talents/great-moon-aroma-cover.webp",
  themeKey: "great-moon-aroma",
  isLive: true,
  liveTitle: "직원들 불러다가 오늘도 뭐 하나 합니다",
};

const meta: Meta<typeof LiveTalentCard> = {
  title: "Entities/Talent/LiveTalentCard",
  component: LiveTalentCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    talent,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
