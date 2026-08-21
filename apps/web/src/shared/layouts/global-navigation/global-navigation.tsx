import type { NavigationItem } from "@/constants";

import { NavigationLink } from "../navigation-link";

export interface GlobalNavigationProps {
  items: readonly NavigationItem[];
  pathname: string;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function GlobalNavigation({
  items,
  pathname,
  variant = "desktop",
  onNavigate,
}: GlobalNavigationProps) {
  return (
    <nav aria-label="주요 메뉴">
      <ul
        className={
          variant === "mobile" ? "flex flex-col gap-1" : "flex items-center justify-center gap-1"
        }
      >
        {items.map((item) => (
          <li key={item.id}>
            <NavigationLink
              item={item}
              pathname={pathname}
              variant={variant}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
