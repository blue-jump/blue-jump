import type { CSSProperties } from "react";

import type { Talent } from "@/types";

type TalentThemeSource = Pick<Talent, "signatureColor" | "themeKey">;

type TalentThemeStyle = CSSProperties & {
  "--talent-primary": string;
};

export function buildTalentThemeProps(talent: TalentThemeSource) {
  const style: TalentThemeStyle = {
    "--talent-primary": talent.signatureColor,
  };

  return {
    "data-talent-theme": talent.themeKey,
    style,
  };
}
