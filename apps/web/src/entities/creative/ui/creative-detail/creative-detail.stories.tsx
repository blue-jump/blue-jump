import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_CREATIVES } from "@/mocks";
import { findUserById, getTalentsByIds } from "@/mocks/sample-data.selectors";

import CreativeDetail from "./creative-detail";

const CREATIVE = MOCK_CREATIVES[0];

if (!CREATIVE) {
  throw new Error("Creative Mock Data가 필요합니다.");
}

const CREATOR = findUserById(CREATIVE.creatorId);

if (!CREATOR) {
  throw new Error(`Creative Creator를 찾을 수 없습니다: ${CREATIVE.creatorId}`);
}

const TALENTS = getTalentsByIds(CREATIVE.talentIds);

const meta = {
  title: "Entities/Creative/CreativeDetail",
  component: CreativeDetail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreativeDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    creative: CREATIVE,
    creator: CREATOR,
    talents: TALENTS,
  },
};
