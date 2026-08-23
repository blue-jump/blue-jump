import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import type { Talent } from "@/types";

import TalentHero, { type TalentHeroProps } from "./talent-hero";
import { buildTalentThemeProps } from "../../lib";

const HAROHA = {
  id: "talent-haroha",
  slug: "haroha",
  name: "하로하",
  englishName: "Haroha",
  description: "저승차사",
  fandomName: "망령",
  signatureColor: "#FFCB0F",
  role: "MEMBER",
  generation: 3,
  profileImageUrl: "/images/mock/talents/haroha-profile.webp",
  coverImageUrl: "/images/mock/talents/haroha-cover.webp",
  themeKey: "haroha",
  isLive: false,
} satisfies Talent;

const JEGAL = {
  id: "talent-jegal",
  slug: "jegal",
  name: "제갈금자",
  englishName: "Jegal",
  description: "육수 우리기 전문가",
  fandomName: "금수",
  signatureColor: "#F7394F",
  role: "MEMBER",
  generation: 2,
  profileImageUrl: "/images/mock/talents/jegal-profile.webp",
  coverImageUrl: "/images/mock/talents/jegal-cover.webp",
  themeKey: "jegal",
  isLive: true,
  liveTitle: "금수들 오늘도 출석해라",
} satisfies Talent;

const GREAT_MOON_AROMA = {
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
} satisfies Talent;

function renderTalentHero({ talent }: TalentHeroProps) {
  return (
    <div {...buildTalentThemeProps(talent)}>
      <TalentHero talent={talent} />
    </div>
  );
}

const meta: Meta<typeof TalentHero> = {
  title: "Entities/Talent/TalentHero",
  component: TalentHero,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: renderTalentHero,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    talent: HAROHA,
  },
};

export const Live: Story = {
  args: {
    talent: JEGAL,
  },
};

export const Representative: Story = {
  args: {
    talent: GREAT_MOON_AROMA,
  },
};
