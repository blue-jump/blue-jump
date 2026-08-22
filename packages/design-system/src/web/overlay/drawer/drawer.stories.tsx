import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import Drawer from "./drawer";
import Button from "../../buttons/button/button";

function DrawerNavigation() {
  return (
    <nav aria-label="주요 메뉴" className="flex flex-col gap-1 p-4">
      {["Main", "Community", "Creative", "Projects", "Gatherings", "Archive", "Talents"].map(
        (item) => (
          <a
            key={item}
            href="#"
            className="text-foreground duration-fast ease-standard hover:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            {item}
          </a>
        ),
      )}
    </nav>
  );
}

const meta = {
  title: "Web/Overlay/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  args: {
    trigger: <Button>메뉴 열기</Button>,
    title: "메뉴",
    description: "블루점프의 주요 공간으로 이동합니다.",
    children: <DrawerNavigation />,
  },
  argTypes: {
    trigger: {
      control: false,
    },
    title: {
      control: false,
    },
    description: {
      control: false,
    },
    children: {
      control: false,
    },
    side: {
      control: "select",
      options: ["left", "right"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Left: Story = {
  args: {
    side: "left",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};
