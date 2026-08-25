"use client";

import { FilterOption } from "@blue-jump/design-system/web";

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
      <div className="border-border divide-border divide-y border-y">
        <div className="py-4 sm:grid sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start sm:gap-4">
          <p className="text-foreground text-sm font-semibold">콘텐츠 유형</p>

          <div
            role="group"
            aria-label="창작 콘텐츠 유형"
            className="-mx-4 mt-3 overflow-x-auto px-4 sm:mx-0 sm:mt-0 sm:px-0"
          >
            <div className="flex w-max min-w-full gap-6">
              <FilterOption selected={value.type === "ALL"} onClick={() => changeType("ALL")}>
                전체
              </FilterOption>

              {availableTypes.map((type) => (
                <FilterOption
                  key={type}
                  selected={value.type === type}
                  onClick={() => changeType(type)}
                >
                  {CREATIVE_TYPE_LABELS[type]}
                </FilterOption>
              ))}
            </div>
          </div>
        </div>

        <div className="py-4 sm:grid sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start sm:gap-4">
          <p className="text-foreground text-sm font-semibold">관련 멤버</p>

          <div
            role="group"
            aria-label="관련 멤버"
            className="-mx-4 mt-3 overflow-x-auto px-4 sm:mx-0 sm:mt-0 sm:px-0"
          >
            <div className="flex w-max min-w-full gap-6">
              <FilterOption selected={value.talentId === "ALL"} onClick={() => changeTalent("ALL")}>
                전체 멤버
              </FilterOption>

              {talents.map((talent) => (
                <FilterOption
                  key={talent.id}
                  selected={value.talentId === talent.id}
                  onClick={() => changeTalent(talent.id)}
                >
                  {talent.name}
                </FilterOption>
              ))}
            </div>
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
