import { useState } from "react";

import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { MOCK_TALENTS } from "@/mocks/talents.mock";

import CreativeFilter from "./creative-filter";
import { filterCreatives, type CreativeFilterValue } from "../../lib";

const creative = MOCK_CREATIVES[0];

if (!creative) {
  throw new Error("CreativeFilter Story에 사용할 Mock Creative를 찾을 수 없습니다.");
}

const talent = MOCK_TALENTS.find((talent) => creative.talentIds.includes(talent.id));

if (!talent) {
  throw new Error(`CreativeFilter Story에 사용할 Mock Talent를 찾을 수 없습니다: ${creative.id}`);
}

function CreativeFilterStory({ initialValue }: { initialValue: CreativeFilterValue }) {
  const [value, setValue] = useState<CreativeFilterValue>(initialValue);

  const filteredCreatives = filterCreatives(MOCK_CREATIVES, value);

  return (
    <CreativeFilter
      creatives={MOCK_CREATIVES}
      talents={MOCK_TALENTS}
      value={value}
      resultCount={filteredCreatives.length}
      onValueChange={setValue}
    />
  );
}

const meta: Meta<typeof CreativeFilter> = {
  title: "Features/Creative/CreativeFilter",
  component: CreativeFilter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CreativeFilterStory
      initialValue={{
        type: "ALL",
        talentId: "ALL",
      }}
    />
  ),
};

export const Filtered: Story = {
  render: () => (
    <CreativeFilterStory
      initialValue={{
        type: creative.type,
        talentId: talent.id,
      }}
    />
  ),
};
