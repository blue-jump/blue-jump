import type { ComponentPropsWithRef } from "react";

export type ContainerSize = "narrow" | "default" | "wide" | "full";

export interface ContainerProps extends ComponentPropsWithRef<"div"> {
  size?: ContainerSize;
}

const sizeClassNames: Record<ContainerSize, string> = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export default function Container({ size = "default", className, ...props }: ContainerProps) {
  return (
    <div
      className={["mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClassNames[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
