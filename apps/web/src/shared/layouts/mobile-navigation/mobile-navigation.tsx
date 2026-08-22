"use client";

import { useState } from "react";

import { Avatar, Drawer, IconButton } from "@blue-jump/design-system/web";

import type { NavigationItem } from "@/constants";

import { GlobalNavigation } from "../global-navigation";
import { NavigationLink } from "../navigation-link";

export interface MobileNavigationProps {
  items: readonly NavigationItem[];
  profileItem: NavigationItem;
  pathname: string;
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export default function MobileNavigation({ items, profileItem, pathname }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      side="right"
      size="sm"
      title="BLUE JUMP"
      description="블루점프의 주요 공간으로 이동합니다."
      trigger={
        <IconButton aria-label="메뉴 열기" variant="ghost">
          <MenuIcon />
        </IconButton>
      }
    >
      <div className="flex h-full flex-col">
        <div className="p-4">
          <GlobalNavigation items={items} pathname={pathname} variant="mobile" onNavigate={close} />
        </div>

        <div className="border-border mt-auto border-t p-4">
          <p className="text-caption text-muted-foreground mb-2 px-2 font-medium tracking-wide uppercase">
            My Space
          </p>

          <NavigationLink
            item={profileItem}
            pathname={pathname}
            variant="profile"
            onNavigate={close}
          >
            <Avatar fallback="ME" size="sm" />

            <span>{profileItem.label}</span>
          </NavigationLink>
        </div>
      </div>
    </Drawer>
  );
}
