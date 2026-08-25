import type { Creative, CreativeType, TalentId } from "@/types";

export type CreativeTypeFilterValue = "ALL" | CreativeType;
export type CreativeTalentFilterValue = "ALL" | TalentId;

export interface CreativeFilterValue {
  type: CreativeTypeFilterValue;
  talentId: CreativeTalentFilterValue;
}

export function getAvailableCreativeTypes(
  creatives: readonly Pick<Creative, "type">[],
): CreativeType[] {
  return [...new Set(creatives.map((creative) => creative.type))];
}

export function filterCreatives(
  creatives: readonly Creative[],
  value: CreativeFilterValue,
): Creative[] {
  return creatives.filter((creative) => {
    const matchesType = value.type === "ALL" || creative.type === value.type;

    const matchesTalent = value.talentId === "ALL" || creative.talentIds.includes(value.talentId);

    return matchesType && matchesTalent;
  });
}
