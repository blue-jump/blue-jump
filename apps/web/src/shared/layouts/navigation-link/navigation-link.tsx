import Link from "next/link";

import type { ReactNode } from "react";

import type { NavigationItem } from "@/constants";

export type NavigationLinkVariant = "desktop" | "mobile" | "profile";

export interface NavigationLinkProps {
  item: NavigationItem;
  pathname: string;
  variant?: NavigationLinkVariant;
  children?: ReactNode;
  onNavigate?: () => void;
}

const variantClassNames: Record<NavigationLinkVariant, string> = {
  desktop: "rounded-md px-3 py-2 text-sm font-medium",
  mobile: "flex min-h-11 w-full items-center rounded-lg px-3 py-2.5 text-base font-medium",
  profile:
    "inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-2 py-1.5 text-sm font-medium",
};

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getStateClassName({
  available,
  current,
  variant,
}: {
  available: boolean;
  current: boolean;
  variant: NavigationLinkVariant;
}) {
  if (!available) {
    return variant === "profile"
      ? "cursor-default border-border bg-surface text-muted-foreground/50"
      : "cursor-default text-muted-foreground/50";
  }

  if (current) {
    return variant === "profile"
      ? "border-primary/30 bg-primary/10 text-primary"
      : "bg-primary/10 text-primary";
  }

  return variant === "profile"
    ? "border-border bg-surface text-muted-foreground hover:border-primary/20 hover:text-foreground"
    : "text-muted-foreground hover:bg-muted hover:text-foreground";
}

export default function NavigationLink({
  item,
  pathname,
  variant = "desktop",
  children,
  onNavigate,
}: NavigationLinkProps) {
  const current = item.available && isCurrentPath(pathname, item.href);

  const className = [
    variantClassNames[variant],
    getStateClassName({
      available: item.available,
      current,
      variant,
    }),
    "transition-colors duration-fast ease-standard motion-reduce:transition-none",
  ].join(" ");

  if (!item.available) {
    return (
      <span aria-disabled="true" title="준비 중" className={className}>
        {children ?? item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={current ? "page" : undefined}
      className={className}
      onClick={onNavigate}
    >
      {children ?? item.label}
    </Link>
  );
}
