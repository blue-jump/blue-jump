import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";
import { buttonVariants, type ButtonVariant } from "../button/button.variants";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends Omit<ComponentPropsWithRef<"button">, "aria-label"> {
  "aria-label": string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
}

const sizeClassNames: Record<IconButtonSize, string> = {
  sm: "size-8 rounded-sm px-0",
  md: "size-10 rounded-md px-0",
  lg: "size-12 rounded-lg px-0",
};

export default function IconButton({
  className,
  variant = "ghost",
  size = "md",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size: "md",
        }),
        "shrink-0",
        sizeClassNames[size],
        className,
      )}
      {...props}
    />
  );
}
