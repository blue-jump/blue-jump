import { requireUser } from "@blue-jump/auth/server";
import { getUserByIdService } from "@blue-jump/domain/user/server";

import { MyProfileView } from "@/views/my-profile-view";

export const runtime = "nodejs";

export default async function MePage() {
  const session = await requireUser();

  const result = await getUserByIdService(session.user.id);

  return <MyProfileView result={result} />;
}
