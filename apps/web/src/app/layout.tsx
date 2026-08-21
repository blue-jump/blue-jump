import "./globals.css";

import type { Metadata } from "next";

import type { ReactNode } from "react";

import { serverEnv } from "@/config/server-env";
import { Layout } from "@/shared/layouts";

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.WEB_APP_URL),
  applicationName: "BLUE JUMP",
  title: {
    default: "BLUE JUMP",
    template: "%s | BLUE JUMP",
  },
  description: "버튜버와 팬의 활동, 창작, 프로젝트와 기록을 연결하는 블루점프 팬 커뮤니티입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isDev = serverEnv.NODE_ENV !== "production";

  return (
    <html lang="ko" data-ds-theme="web" data-ds-mode="light">
      <body {...(isDev ? { suppressHydrationWarning: true } : {})}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
