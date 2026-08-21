import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";

export type ImageFrameAspect = "auto" | "square" | "portrait" | "landscape" | "wide";

export type ImageFrameRadius = "none" | "md" | "lg" | "xl";

export interface ImageFrameProps extends ComponentPropsWithRef<"div"> {
  aspect?: ImageFrameAspect;
  radius?: ImageFrameRadius;
}

const aspectClassNames: Record<ImageFrameAspect, string> = {
  auto: "",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-video",
};

const radiusClassNames: Record<ImageFrameRadius, string> = {
  none: "rounded-none",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export default function ImageFrame({
  aspect = "auto",
  radius = "lg",
  className,
  ...props
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "bg-muted relative isolate overflow-hidden",
        aspectClassNames[aspect],
        radiusClassNames[radius],
        className,
      )}
      {...props}
    />
  );
}
