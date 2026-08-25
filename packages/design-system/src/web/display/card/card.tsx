import { cva, type VariantProps } from "class-variance-authority";

import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";

const cardVariants = cva(["overflow-hidden rounded-xl", "text-surface-foreground"], {
  variants: {
    variant: {
      default: "border-border bg-surface border shadow-xs",
      elevated: "bg-surface border border-transparent shadow-md",
      soft: "bg-muted border border-transparent shadow-none",
    },
    padding: {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export type CardVariant = NonNullable<VariantProps<typeof cardVariants>["variant"]>;

export type CardPadding = NonNullable<VariantProps<typeof cardVariants>["padding"]>;

export interface CardProps extends ComponentPropsWithRef<"div"> {
  variant?: CardVariant;
  padding?: CardPadding;
}

export default function Card({ variant, padding, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, padding }), className)} {...props} />;
}
