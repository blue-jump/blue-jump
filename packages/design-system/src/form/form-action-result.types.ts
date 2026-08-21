import type { ActionResult } from "@blue-jump/core/action";

export type FormActionResult<TData = unknown> = ActionResult<TData> | null | undefined;
