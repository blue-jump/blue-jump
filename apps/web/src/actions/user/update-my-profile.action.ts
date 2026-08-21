"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@blue-jump/auth/server";
import { executeFormAction } from "@blue-jump/core/action";
import { UpdateUserProfileRequest } from "@blue-jump/domain/user/client";
import { updateUserProfileService } from "@blue-jump/domain/user/server";

import { URLS } from "@/constants";

export async function updateMyProfileAction(_prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const result = await executeFormAction({
    actionName: "user.update_my_profile",
    schema: UpdateUserProfileRequest,
    formData,
    handler: (input) => updateUserProfileService(session.user.id, input),
    successMessage: "프로필이 수정되었습니다.",
  });

  if (result.ok) {
    revalidatePath(URLS.CLIENT.MY_PAGE);
  }

  return result;
}
