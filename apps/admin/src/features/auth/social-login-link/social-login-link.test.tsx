import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { URLS } from "@/constants";

import SocialLoginLink from "./social-login-link";

describe("SocialLoginLink", () => {
  it("OAuth 링크를 렌더링한다", () => {
    render(<SocialLoginLink providerId="google" href={URLS.API.AUTH.GOOGLE} />);

    const link = screen.getByRole("link", { name: "Google로 로그인" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", URLS.API.AUTH.GOOGLE);
    expect(link).toHaveAttribute("data-provider", "google");
    expect(screen.getByText("Google 계정으로 계속 진행합니다.")).toBeInTheDocument();
  });

  it("providerId에 따라 제공자 이름을 렌더링한다", () => {
    render(<SocialLoginLink providerId="naver" href={URLS.API.AUTH.NAVER} />);

    expect(screen.getByRole("link", { name: "네이버로 로그인" })).toBeInTheDocument();
    expect(screen.getByText("네이버 계정으로 계속 진행합니다.")).toBeInTheDocument();
  });
});
