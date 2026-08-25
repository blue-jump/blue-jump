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
      className="border-border -mx-4 overflow-x-auto border-b px-4 sm:mx-0 sm:px-0"
    >
      <div className="flex w-max min-w-full gap-6">
        {POST_CATEGORY_OPTIONS.map((option) => {
          const selected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onValueChange(option.value)}
              className={[
                "relative min-h-11 shrink-0 pb-3 text-sm",
                "duration-fast ease-standard transition-colors motion-reduce:transition-none",
                selected
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground font-medium",
              ].join(" ")}
            >
              {option.label}

              {selected ? (
                <span aria-hidden="true" className="bg-brand absolute inset-x-0 bottom-0 h-0.5" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
