import type { Metadata } from "next";
import { CommunityFeed } from "./community-feed";
import { getPosts } from "@/lib/services/community.service";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "المجتمع",
  description: "مجتمع أكاديمية أمين — شارك وتعلّم مع باقي الطلاب",
};

// البوستات بتتحمل server-side عشان مفيش loading spinner
export default async function CommunityPage() {
  const session = await auth();
  const { posts } = await getPosts({
    page: 1,
    limit: 20,
    userId: session?.user?.id,
  });

  return <CommunityFeed initialPosts={posts} />;
}
