"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../../utils";

export type DrawerSide = "left" | "right";
export type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps extends Omit<ComponentProps<typeof DialogPrimitive.Root>, "children"> {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  contentClassName?: string;
}

const sideClassNames: Record<DrawerSide, string> = {
  left: "left-0 border-r",
  right: "right-0 border-l",
};

const sizeClassNames: Record<DrawerSize, string> = {
  sm: "w-[min(20rem,88vw)]",
  md: "w-[min(24rem,88vw)]",
  lg: "w-[min(28rem,92vw)]",
};

export default function Drawer({
  trigger,
  title,
  description,
  children,
  side = "right",
  size = "md",
  contentClassName,
  ...rootProps
}: DrawerProps) {
  return (
    <DialogPrimitive.Root {...rootProps}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn("fixed inset-0 z-(--layer-overlay)", "bg-overlay")}
        />

        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-0 z-(--layer-modal)",
            "flex flex-col",
            "border-border bg-surface text-surface-foreground",
            "shadow-xl",
            "focus:outline-none",
            sideClassNames[side],
            sizeClassNames[size],
            contentClassName,
          )}
        >
          <div className="border-border flex min-h-16 items-start justify-between gap-4 border-b px-5 py-4">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-foreground text-base font-semibold">
                {title}
              </DialogPrimitive.Title>

              {description ? (
                <DialogPrimitive.Description className="text-muted-foreground mt-1 text-sm">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>

            <DialogPrimitive.Close
              className={cn(
                "inline-flex size-9 shrink-0 items-center justify-center rounded-md",
                "text-muted-foreground",
                "duration-fast ease-standard transition-colors",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none",
                "focus-visible:ring-focus focus-visible:ring-2",
                "focus-visible:ring-offset-surface focus-visible:ring-offset-2",
              )}
              aria-label="닫기"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </DialogPrimitive.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
