import type { Meta, StoryObj } from "@blue-jump/storybook-config/nextjs";

import PortalLayer from "./portal-layer";

const meta = {
  title: "Features/Portal/EnterPortal/PortalLayer",
  component: PortalLayer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PortalLayer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
