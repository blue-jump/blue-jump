"use client";

import { CREATIVE_TYPE_LABELS } from "@/entities/creative";
import type { Creative, Talent } from "@/types";

import {
  getAvailableCreativeTypes,
  type CreativeFilterValue,
  type CreativeTalentFilterValue,
  type CreativeTypeFilterValue,
} from "../../lib";

export interface CreativeFilterProps {
  creatives: readonly Pick<Creative, "type">[];
  talents: readonly Pick<Talent, "id" | "name">[];
  value: CreativeFilterValue;
  resultCount: number;
  onValueChange: (value: CreativeFilterValue) => void;
}

export default function CreativeFilter({
  creatives,
  talents,
  value,
  resultCount,
  onValueChange,
}: CreativeFilterProps) {
  const availableTypes = getAvailableCreativeTypes(creatives);

  function changeType(type: CreativeTypeFilterValue) {
    onValueChange({
      ...value,
      type,
    });
  }

  function changeTalent(talentId: CreativeTalentFilterValue) {
    onValueChange({
      ...value,
      talentId,
    });
  }

  return (
    <div>
      <div>
        <p className="text-foreground text-sm font-semibold">콘텐츠 유형</p>

        <div
          role="group"
          aria-label="창작 콘텐츠 유형"
          className="-mx-4 mt-3 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          <div className="flex w-max min-w-full gap-2">
            <button
              type="button"
              aria-pressed={value.type === "ALL"}
              onClick={() => changeType("ALL")}
              className={[
                "flex min-h-10 items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium",
                "duration-fast ease-standard transition-colors motion-reduce:transition-none",
                value.type === "ALL"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              {value.type === "ALL" ? <span aria-hidden="true">✓</span> : null}
              <span>전체</span>
            </button>

            {availableTypes.map((type) => {
              const selected = value.type === type;

              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => changeType(type)}
                  className={[
                    "flex min-h-10 items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium",
                    "duration-fast ease-standard transition-colors motion-reduce:transition-none",
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {selected ? <span aria-hidden="true">✓</span> : null}
                  <span>{CREATIVE_TYPE_LABELS[type]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-border mt-6 border-t pt-5">
        <p className="text-foreground text-sm font-semibold">관련 멤버</p>

        <div
          role="group"
          aria-label="관련 멤버"
          className="-mx-4 mt-3 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          <div className="flex w-max min-w-full gap-2">
            <button
              type="button"
              aria-pressed={value.talentId === "ALL"}
              onClick={() => changeTalent("ALL")}
              className={[
                "flex min-h-10 items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium",
                "duration-fast ease-standard transition-colors motion-reduce:transition-none",
                value.talentId === "ALL"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              {value.talentId === "ALL" ? <span aria-hidden="true">✓</span> : null}

              <span>전체 멤버</span>
            </button>

            {talents.map((talent) => {
              const selected = value.talentId === talent.id;

              return (
                <button
                  key={talent.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => changeTalent(talent.id)}
                  className={[
                    "flex min-h-10 items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium",
                    "duration-fast ease-standard transition-colors motion-reduce:transition-none",
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {selected ? <span aria-hidden="true">✓</span> : null}
                  <span>{talent.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div aria-live="polite">
        {resultCount === 0 ? (
          <p className="text-muted-foreground mt-6 text-sm">조건에 맞는 창작물이 없습니다.</p>
        ) : null}
      </div>
    </div>
  );
}
