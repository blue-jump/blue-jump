import type { Metadata } from "next";

import { CreativeListView } from "@/views/creative";

export const metadata: Metadata = {
  title: "창작",
  description: "블루점프 팬들이 만든 다양한 창작물을 탐색합니다.",
};

export default function CreativePage() {
  return <CreativeListView />;
}
