"use client";

import { useState, type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: AvatarSize;
}

const sizeClassNames: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

export default function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>();

  const shouldRenderImage = Boolean(src && failedSrc !== src);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
        "border-border bg-secondary rounded-full border",
        "text-secondary-foreground font-medium",
        sizeClassNames[size],
        className,
      )}
      {...(!shouldRenderImage && alt
        ? {
            role: "img",
            "aria-label": alt,
          }
        : {})}
      {...props}
    >
      {shouldRenderImage && src ? (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span aria-hidden={alt ? true : undefined}>{fallback}</span>
      )}
    </span>
  );
}
