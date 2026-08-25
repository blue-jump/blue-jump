import { describe, expect, it } from "vitest";

import { buildTalentThemeProps } from "./build-talent-theme-props";

describe("buildTalentThemeProps", () => {
  it("Talent의 themeKey와 signatureColor를 Theme Scope Props로 변환한다", () => {
    const result = buildTalentThemeProps({
      themeKey: "haroha",
      signatureColor: "#FFCB0F",
    });

    expect(result).toEqual({
      "data-talent-theme": "haroha",
      style: {
        "--talent-primary": "#FFCB0F",
      },
    });
  });
});
