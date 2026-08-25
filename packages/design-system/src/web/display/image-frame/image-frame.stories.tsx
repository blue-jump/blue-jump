import type { Meta, StoryObj } from "@blue-jump/storybook-config/react";

import ImageFrame from "./image-frame";

function Placeholder({ label = "Image" }: { label?: string }) {
  return (
    <div className="bg-secondary text-secondary-foreground flex size-full items-center justify-center text-sm font-medium">
      {label}
    </div>
  );
}

const meta = {
  title: "Web/Display/ImageFrame",
  component: ImageFrame,
  parameters: {
    layout: "centered",
  },
  args: {
    aspect: "landscape",
    radius: "lg",
    children: <Placeholder />,
  },
  argTypes: {
    aspect: {
      control: "select",
      options: ["auto", "square", "portrait", "landscape", "wide"],
    },
    radius: {
      control: "select",
      options: ["none", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof ImageFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Square: Story = {
  args: {
    aspect: "square",
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Portrait: Story = {
  args: {
    aspect: "portrait",
  },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
};

export const Wide: Story = {
  args: {
    aspect: "wide",
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const AspectRatios: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      <div className="w-40 space-y-2">
        <ImageFrame aspect="square">
          <Placeholder label="Square" />
        </ImageFrame>

        <p className="text-caption text-muted-foreground text-center">1 : 1</p>
      </div>

      <div className="w-40 space-y-2">
        <ImageFrame aspect="portrait">
          <Placeholder label="Portrait" />
        </ImageFrame>

        <p className="text-caption text-muted-foreground text-center">4 : 5</p>
      </div>

      <div className="w-48 space-y-2">
        <ImageFrame aspect="landscape">
          <Placeholder label="Landscape" />
        </ImageFrame>

        <p className="text-caption text-muted-foreground text-center">4 : 3</p>
      </div>

      <div className="w-56 space-y-2">
        <ImageFrame aspect="wide">
          <Placeholder label="Wide" />
        </ImageFrame>

        <p className="text-caption text-muted-foreground text-center">16 : 9</p>
      </div>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {(["none", "md", "lg", "xl"] as const).map((radius) => (
        <div key={radius} className="w-40 space-y-2">
          <ImageFrame aspect="square" radius={radius}>
            <Placeholder label={radius} />
          </ImageFrame>

          <p className="text-caption text-muted-foreground text-center">{radius}</p>
        </div>
      ))}
    </div>
  ),
};
