"use client";

import type { PostCategory } from "@/types";

import type { PostCategoryFilterValue } from "../../lib";

export interface PostCategoryFilterProps {
  value: PostCategoryFilterValue;
  onValueChange: (value: PostCategoryFilterValue) => void;
}

const POST_CATEGORY_OPTIONS = [
  {
    value: "ALL",
    label: "전체",
  },
  {
    value: "GENERAL",
    label: "일반",
  },
  {
    value: "MEME",
    label: "밈",
  },
  {
    value: "QUESTION",
    label: "질문",
  },
  {
    value: "INFORMATION",
    label: "정보",
  },
] satisfies readonly {
  value: "ALL" | PostCategory;
  label: string;
}[];

export default function PostCategoryFilter({ value, onValueChange }: PostCategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="게시글 카테고리"
      className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <div className="flex w-max min-w-full gap-2">
        {POST_CATEGORY_OPTIONS.map((option) => {
          const selected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onValueChange(option.value)}
              className={[
                "flex min-h-10 items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium",
                "duration-fast ease-standard transition-colors motion-reduce:transition-none",
                selected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              {selected ? <span aria-hidden="true">✓</span> : null}

              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
