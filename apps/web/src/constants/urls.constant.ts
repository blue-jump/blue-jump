export const URLS = {
  CLIENT: {
    HOME: "/",
    COMMUNITY: "/community",
    CREATIVE: "/creative",
    PROJECTS: "/projects",
    GATHERINGS: "/gatherings",
    ARCHIVE: "/archive",
    TALENTS: "/talents",
    TALENT: (slug: string) => `/talents/${slug}`,
    PROFILE: "/profile",
    LOGIN: "/login",
  },
  API: {
    AUTH: {
      LOGOUT: "/api/auth/logout",
      GOOGLE: "/api/auth/google",
      NAVER: "/api/auth/naver",
      OAUTH: (providerId: string) => `/api/auth/${providerId}`,
      OAUTH_CALLBACK: (providerId: string) => `/api/auth/${providerId}/callback`,
    },
  },
} as const;
