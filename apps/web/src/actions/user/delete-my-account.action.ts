"use server";

import { redirect } from "next/navigation";

import { requireUser, revokeCurrentAuthSession } from "@blue-jump/auth/server";
import { executeFormAction } from "@blue-jump/core/action";
import { DeleteMyAccountRequest } from "@blue-jump/domain/user/client";
import { softDeleteUserService } from "@blue-jump/domain/user/server";

import { URLS } from "@/constants";

export async function deleteMyAccountAction(_prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const result = await executeFormAction({
    actionName: "user.delete_my_account",
    schema: DeleteMyAccountRequest,
    formData,
    handler: () => softDeleteUserService(session.user.id),
    successMessage: "회원 탈퇴가 완료되었습니다.",
  });

  if (!result.ok) {
    return result;
  }

  await revokeCurrentAuthSession();

  redirect(URLS.CLIENT.LOGIN);
}
