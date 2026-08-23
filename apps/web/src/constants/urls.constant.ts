export const URLS = {
  CLIENT: {
    HOME: "/",
    COMMUNITY: "/community",
    POST: (postId: string) => `/community/${postId}`,
    CREATIVE: "/creative",
    CREATIVE_DETAIL: (creativeId: string) => `/creative/${creativeId}`,
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
