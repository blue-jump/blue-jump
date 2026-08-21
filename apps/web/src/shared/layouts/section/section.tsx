import type { ComponentPropsWithRef } from "react";

export type SectionSpacing = "none" | "sm" | "md" | "lg";

export interface SectionProps extends ComponentPropsWithRef<"section"> {
  spacing?: SectionSpacing;
}

const spacingClassNames: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-6 md:py-8",
  md: "py-10 md:py-12",
  lg: "py-14 md:py-20",
};

export default function Section({ spacing = "md", className, ...props }: SectionProps) {
  return (
    <section
      className={[spacingClassNames[spacing], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
