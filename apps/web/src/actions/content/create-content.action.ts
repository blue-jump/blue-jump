"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@blue-jump/auth/server";
import type { ActionResult } from "@blue-jump/core/action";
import { executeFormAction } from "@blue-jump/core/action";
import { CreateContentRequest, type ContentDetailResponse } from "@blue-jump/domain/content/client";
import { createContentService } from "@blue-jump/domain/content/server";

import { URLS } from "@/constants";

export async function createContentAction(
  _prevState: ActionResult<ContentDetailResponse> | null,
  formData: FormData,
) {
  const session = await requireUser();

  const result = await executeFormAction({
    actionName: "content.create",
    schema: CreateContentRequest,
    formData,
    handler: (input) =>
      createContentService(
        {
          id: session.user.id,
          role: session.user.role,
          status: session.user.status,
        },
        input,
      ),
    successMessage: "콘텐츠가 생성되었습니다.",
  });

  if (result.ok) {
    revalidatePath(URLS.CLIENT.HOME);
    revalidatePath(URLS.CLIENT.MY_PAGE);
  }

  return result;
}
