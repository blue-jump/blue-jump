import type { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "../../../utils";
import { buttonVariants, type ButtonSize, type ButtonVariant } from "../button/button.variants";

interface LinkButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export type LinkButtonProps<T extends ElementType = "a"> = LinkButtonOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof LinkButtonOwnProps | "as">;

export default function LinkButton<T extends ElementType = "a">({
  as,
  className,
  variant,
  size,
  ...props
}: LinkButtonProps<T>) {
  const Component = as ?? "a";

  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
