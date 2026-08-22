"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar } from "@blue-jump/design-system/web";

import { NAVIGATION_ITEMS, PROFILE_NAVIGATION_ITEM, URLS } from "@/constants";

import { Container } from "../container";
import { GlobalNavigation } from "../global-navigation";
import { MobileNavigation } from "../mobile-navigation";
import { NavigationLink } from "../navigation-link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/90 sticky top-0 z-(--layer-sticky) border-b backdrop-blur-xl">
      <Container size="wide" className="flex h-16 items-center gap-6">
        <Link
          href={URLS.CLIENT.HOME}
          aria-label="블루점프 메인"
          className="relative block h-8 w-28 shrink-0 rounded-md sm:w-32"
        >
          <Image
            src="/images/brand/logo.webp"
            alt="BLUE JUMP"
            fill
            priority
            sizes="128px"
            className="object-contain object-left"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 lg:block">
          <GlobalNavigation items={NAVIGATION_ITEMS} pathname={pathname} />
        </div>

        <div className="ml-auto hidden shrink-0 lg:block">
          <NavigationLink item={PROFILE_NAVIGATION_ITEM} pathname={pathname} variant="profile">
            <Avatar fallback="ME" size="sm" />

            <span>{PROFILE_NAVIGATION_ITEM.label}</span>
          </NavigationLink>
        </div>

        <div className="ml-auto lg:hidden">
          <MobileNavigation
            items={NAVIGATION_ITEMS}
            profileItem={PROFILE_NAVIGATION_ITEM}
            pathname={pathname}
          />
        </div>
      </Container>
    </header>
  );
}
