import type { ComponentPropsWithRef } from "react";

import { buttonVariants, type ButtonSize, type ButtonVariant } from "./button.variants";
import { cn } from "../../../utils";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
