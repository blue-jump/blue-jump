import { cva, type VariantProps } from "class-variance-authority";

import type { ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";

const badgeVariants = cva(
  ["inline-flex w-fit shrink-0 items-center", "rounded-full font-medium whitespace-nowrap"],
  {
    variants: {
      variant: {
        neutral: "bg-muted text-muted-foreground",
        primary: "bg-primary/10 text-primary",
        brand: "bg-brand/10 text-brand",
        accent: "bg-accent/15 text-accent-foreground",
        outline: "border-border bg-surface text-foreground border",
        success: "bg-success/12 text-success",
        warning: "bg-warning/15 text-warning-foreground",
        destructive: "bg-destructive/10 text-destructive",
      },
      size: {
        sm: "text-caption min-h-5 px-2 py-0.5",
        md: "min-h-6 px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>;

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export default function Badge({ variant, size, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
