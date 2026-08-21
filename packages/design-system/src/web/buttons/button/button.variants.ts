import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "duration-fast ease-standard transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-focus focus-visible:ring-2",
    "focus-visible:ring-offset-background focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-primary text-primary-foreground shadow-xs", "hover:bg-interactive-hover"],
        brand: ["bg-brand text-brand-foreground shadow-xs", "hover:brightness-95"],
        secondary: ["bg-secondary text-secondary-foreground", "hover:bg-muted"],
        outline: ["border-border bg-surface text-foreground border", "hover:bg-muted"],
        ghost: ["text-foreground", "hover:bg-muted"],
        destructive: ["bg-destructive text-destructive-foreground", "hover:brightness-95"],
      },
      size: {
        sm: "h-8 rounded-sm px-3 text-sm",
        md: "h-10 rounded-md px-4 text-sm",
        lg: "h-12 rounded-lg px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;
