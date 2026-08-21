import { Pagination } from "@blue-jump/design-system/web";
import type { ContentListResponse } from "@blue-jump/domain/content/client";

import { URLS } from "@/constants";

interface ContentPaginationProps {
  meta: ContentListResponse["meta"];
}

const DEFAULT_CONTENT_LIMIT = 20;

function createContentPageHref(page: number, limit: number) {
  const searchParams = new URLSearchParams();

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  if (limit !== DEFAULT_CONTENT_LIMIT) {
    searchParams.set("limit", String(limit));
  }

  const queryString = searchParams.toString();

  return queryString ? `${URLS.CLIENT.CONTENTS}?${queryString}` : URLS.CLIENT.CONTENTS;
}

export default function ContentPagination({ meta }: ContentPaginationProps) {
  if (meta.totalPages <= 1) {
    return null;
  }

  return (
    <Pagination
      meta={meta}
      getHref={(page) => createContentPageHref(page, meta.limit)}
      previousLabel="이전"
      nextLabel="다음"
      aria-label="콘텐츠 페이지네이션"
    />
  );
}
