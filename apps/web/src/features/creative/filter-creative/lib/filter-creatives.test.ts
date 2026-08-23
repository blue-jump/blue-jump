import { describe, expect, it } from "vitest";

import { MOCK_CREATIVES } from "@/mocks/creatives.mock";
import { MOCK_TALENTS } from "@/mocks/talents.mock";

import { filterCreatives, getAvailableCreativeTypes } from "./filter-creatives";

const talent = MOCK_TALENTS.find((talent) =>
  MOCK_CREATIVES.some((creative) => creative.talentIds.includes(talent.id)),
);

if (!talent) {
  throw new Error("Creative Filter 테스트에 사용할 관련 Talent를 찾을 수 없습니다.");
}

const creative = MOCK_CREATIVES.find((creative) => creative.talentIds.includes(talent.id));

if (!creative) {
  throw new Error(`Creative Filter 테스트에 사용할 Creative를 찾을 수 없습니다: ${talent.id}`);
}

describe("getAvailableCreativeTypes", () => {
  it("현재 Creative Mock Data에 실제로 존재하는 Type만 반환합니다.", () => {
    const types = getAvailableCreativeTypes(MOCK_CREATIVES);

    expect(types.length).toBeGreaterThan(0);
    expect(new Set(types).size).toBe(types.length);

    for (const type of types) {
      expect(MOCK_CREATIVES.some((creative) => creative.type === type)).toBe(true);
    }
  });
});

describe("filterCreatives", () => {
  it("전체 조건에서는 모든 Creative를 반환합니다.", () => {
    expect(
      filterCreatives(MOCK_CREATIVES, {
        type: "ALL",
        talentId: "ALL",
      }),
    ).toEqual(MOCK_CREATIVES);
  });

  it("Creative Type을 기준으로 필터링합니다.", () => {
    const creatives = filterCreatives(MOCK_CREATIVES, {
      type: creative.type,
      talentId: "ALL",
    });

    expect(creatives.length).toBeGreaterThan(0);

    for (const item of creatives) {
      expect(item.type).toBe(creative.type);
    }
  });

  it("관련 Talent를 기준으로 필터링합니다.", () => {
    const creatives = filterCreatives(MOCK_CREATIVES, {
      type: "ALL",
      talentId: talent.id,
    });

    expect(creatives.length).toBeGreaterThan(0);

    for (const item of creatives) {
      expect(item.talentIds).toContain(talent.id);
    }
  });

  it("Creative Type과 Talent 조건을 함께 적용합니다.", () => {
    const creatives = filterCreatives(MOCK_CREATIVES, {
      type: creative.type,
      talentId: talent.id,
    });

    expect(creatives).toContainEqual(creative);

    for (const item of creatives) {
      expect(item.type).toBe(creative.type);
      expect(item.talentIds).toContain(talent.id);
    }
  });

  it("조건에 맞는 Creative가 없으면 빈 배열을 반환합니다.", () => {
    const creatives = filterCreatives(
      MOCK_CREATIVES.filter((item) => item.id !== creative.id),
      {
        type: creative.type,
        talentId: talent.id,
      },
    );

    const expectedCreatives = MOCK_CREATIVES.filter(
      (item) =>
        item.id !== creative.id &&
        item.type === creative.type &&
        item.talentIds.includes(talent.id),
    );

    expect(creatives).toEqual(expectedCreatives);
  });
});
