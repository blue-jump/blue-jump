import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { buildTalentThemeProps } from "@/entities/talent";
import { MOCK_TALENTS } from "@/mocks/talents.mock";

import TalentSelector, { type TalentSelectorProps } from "./talent-selector";

function renderTalentSelector(args: TalentSelectorProps) {
  const currentTalent = args.talents.find((talent) => talent.id === args.currentTalentId);

  if (!currentTalent) {
    return <TalentSelector {...args} />;
  }

  return (
    <div {...buildTalentThemeProps(currentTalent)}>
      <TalentSelector {...args} />
    </div>
  );
}

const meta: Meta<typeof TalentSelector> = {
  title: "Features/Talent/SelectTalent/TalentSelector",
  component: TalentSelector,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: renderTalentSelector,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    talents: MOCK_TALENTS,
    currentTalentId: "talent-haroha",
  },
};

export const Representative: Story = {
  args: {
    talents: MOCK_TALENTS,
    currentTalentId: "talent-great-moon-aroma",
  },
};
