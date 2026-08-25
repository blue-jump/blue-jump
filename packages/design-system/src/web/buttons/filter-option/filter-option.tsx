import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface FilterOptionProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-pressed" | "children" | "type"
> {
  selected: boolean;
  children: ReactNode;
}

export default function FilterOption({
  selected,
  children,
  className,
  ...props
}: FilterOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={[
        "relative min-h-7 shrink-0 pb-2 text-sm",
        "duration-fast ease-standard transition-colors motion-reduce:transition-none",
        selected
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground font-medium",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}

      {selected ? (
        <span aria-hidden="true" className="bg-brand absolute inset-x-0 bottom-0 h-0.5" />
      ) : null}
    </button>
  );
}
