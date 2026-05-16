import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CommunityFeed } from "./community-feed";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const session = await auth();

  const posts = await prisma.post.findMany({
    where: { isDeleted: false },
    include: {
      user: { select: { id: true, name: true, image: true, role: true } },
      comments: {
        where: { isDeleted: false, parentId: null },
        take: 3,
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true, image: true, role: true } },
          replies: {
            where: { isDeleted: false },
            orderBy: { createdAt: "asc" },
            take: 10,
            include: {
              user: { select: { id: true, name: true, image: true, role: true } },
            },
          },
        },
      },
      reactions: {
        select: { type: true, userId: true },
      },
      _count: {
        select: {
          comments: { where: { isDeleted: false } },
          likes: true,
          reactions: true,
        },
      },
    },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    take: 20,
  });

  const initialPosts = posts.map((post) => {
    const reactionsByType: Record<string, number> = {};
    post.reactions.forEach((r) => {
      reactionsByType[r.type] = (reactionsByType[r.type] || 0) + 1;
    });
    const myReaction = session?.user
      ? post.reactions.find((r) => r.userId === session.user.id)?.type || null
      : null;

    return {
      id: post.id,
      content: post.content,
      user: post.user,
      isPinned: post.isPinned,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      comments: post.comments.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
        replies: c.replies?.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })),
      })),
      reactionsSummary: {
        total: post.reactions.length,
        byType: reactionsByType,
        myReaction,
      },
      _count: post._count,
      createdAt: post.createdAt.toISOString(),
    };
  });

  return <CommunityFeed initialPosts={initialPosts} />;
}
