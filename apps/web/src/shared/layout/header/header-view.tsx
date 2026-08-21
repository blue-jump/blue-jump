import Link from "next/link";

import { URLS } from "@/constants";

export default function HeaderView() {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <Link href={URLS.CLIENT.HOME} className="text-base font-semibold tracking-tight">
          BLUE JUMP
        </Link>
      </div>
    </header>
  );
}
