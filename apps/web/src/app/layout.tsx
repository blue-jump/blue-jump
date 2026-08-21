import "./globals.css";

import type { Metadata } from "next";

import type { ReactNode } from "react";

import { serverEnv } from "@/config/server-env";

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.WEB_APP_URL),
  title: "Web",
  description: "Service application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isDev = serverEnv.NODE_ENV !== "production";

  return (
    <html lang="ko" data-ds-theme="web" data-ds-mode="light">
      <body {...(isDev ? { suppressHydrationWarning: true } : {})}>{children}</body>
    </html>
  );
}
