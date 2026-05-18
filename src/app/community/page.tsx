import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CommunityFeed } from "./community-feed";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const [session, posts] = await Promise.all([
    auth(),
    prisma.post.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        content: true,
        isPinned: true,
        createdAt: true,
        user: { select: { id: true, name: true, image: true, role: true } },
        comments: {
          where: { isDeleted: false, parentId: null },
          take: 2,
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            content: true,
            createdAt: true,
            parentId: true,
            isDeleted: true,
            postId: true,
            userId: true,
            user: { select: { id: true, name: true, image: true, role: true } },
            replies: {
              where: { isDeleted: false },
              orderBy: { createdAt: "asc" },
              take: 2,
              select: {
                id: true,
                content: true,
                createdAt: true,
                parentId: true,
                isDeleted: true,
                postId: true,
                userId: true,
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
      take: 10,
    }),
  ]);

  const userId = session?.user?.id;

  const initialPosts = posts.map((post) => {
    const reactionsByType: Record<string, number> = {};
    post.reactions.forEach((r) => {
      reactionsByType[r.type] = (reactionsByType[r.type] || 0) + 1;
    });

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
        myReaction: userId
          ? post.reactions.find((r) => r.userId === userId)?.type || null
          : null,
      },
      _count: post._count,
      createdAt: post.createdAt.toISOString(),
    };
  });

  return <CommunityFeed initialPosts={initialPosts} />;
}
