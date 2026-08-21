"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@blue-jump/auth/server";
import type { ActionResult } from "@blue-jump/core/action";
import { executeFormAction } from "@blue-jump/core/action";
import { ContentIdParam, type ContentDetailResponse } from "@blue-jump/domain/content/client";
import { softDeleteContentService } from "@blue-jump/domain/content/server";

import { URLS } from "@/constants";

export async function deleteContentAction(
  _prevState: ActionResult<ContentDetailResponse> | null,
  formData: FormData,
) {
  const session = await requireAdmin();

  const result = await executeFormAction({
    actionName: "admin.content.delete",
    schema: ContentIdParam,
    formData,
    handler: ({ id }) =>
      softDeleteContentService(id, {
        id: session.user.id,
        role: session.user.role,
        status: session.user.status,
      }),
    successMessage: "콘텐츠가 삭제되었습니다.",
  });

  if (result.ok) {
    revalidatePath(URLS.CLIENT.CONTENTS);
  }

  return result;
}
