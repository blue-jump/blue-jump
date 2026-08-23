import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import { MOCK_ARCHIVES } from "@/mocks/archives.mock";
import { getTalentsByIds } from "@/mocks/sample-data.selectors";

import ArchiveCard from "./archive-card";

function getArchiveCardArgs(archiveId: string) {
  const archive = MOCK_ARCHIVES.find((archive) => archive.id === archiveId);

  if (!archive) {
    throw new Error(`ArchiveCard Story에 사용할 Mock Archive를 찾을 수 없습니다: ${archiveId}`);
  }

  return {
    archive,
    talents: getTalentsByIds(archive.talentIds),
  };
}

const meta: Meta<typeof ArchiveCard> = {
  title: "Entities/Archive/ArchiveCard",
  component: ArchiveCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-xl max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: getArchiveCardArgs("archive-blue-jump-fourth-generation"),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const History: Story = {};

export const Term: Story = {
  args: getArchiveCardArgs("archive-jegugu"),
};

export const Broadcast: Story = {
  args: getArchiveCardArgs("archive-haroha-reaper"),
};
