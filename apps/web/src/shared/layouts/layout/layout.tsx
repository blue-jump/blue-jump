import type { ReactNode } from "react";

import { Header } from "../header";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh">
      <a
        href="#main-content"
        className="bg-brand text-brand-foreground duration-fast ease-standard fixed top-4 left-4 z-(--layer-toast) -translate-y-24 rounded-md px-4 py-2 text-sm font-medium shadow-md transition-transform focus-visible:translate-y-0 motion-reduce:transition-none"
      >
        본문으로 건너뛰기
      </a>

      <Header />

      <main id="main-content" className="min-w-0">
        {children}
      </main>
    </div>
  );
}
