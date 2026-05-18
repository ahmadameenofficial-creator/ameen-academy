import type { Metadata } from "next";
import { CommunityFeed } from "./community-feed";

export const metadata: Metadata = {
  title: "المجتمع",
  description: "مجتمع أكاديمية أمين — شارك وتعلّم مع باقي الطلاب",
};

// الصفحة static — البوستات بتتحمل client-side عشان السرعة
export default function CommunityPage() {
  return <CommunityFeed />;
}
