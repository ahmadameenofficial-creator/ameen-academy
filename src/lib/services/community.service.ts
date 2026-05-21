import { communityDb } from "@/lib/db";

export async function getPosts(options: {
  courseId?: string;
  page: number;
  limit: number;
  userId?: string;
}) {
  const where = { isDeleted: false as const, ...(options.courseId && { courseId: options.courseId }) };

  const [posts, total] = await Promise.all([
    communityDb.findPosts(where, options.page, options.limit),
    communityDb.countPosts(where),
  ]);

  const postIds = posts.map((p) => p.id);

  const [reactionCounts, myReactions] = await Promise.all([
    communityDb.getReactionCountsForPosts(postIds),
    options.userId
      ? communityDb.getUserReactionsForPosts(options.userId, postIds)
      : Promise.resolve([]),
  ]);

  const reactionsByPost = new Map<string, Record<string, number>>();
  const totalByPost = new Map<string, number>();
  for (const r of reactionCounts) {
    if (!r.postId) continue;
    const byType = reactionsByPost.get(r.postId) ?? {};
    byType[r.type] = r._count;
    reactionsByPost.set(r.postId, byType);
    totalByPost.set(r.postId, (totalByPost.get(r.postId) ?? 0) + r._count);
  }
  const myReactionMap = new Map(
    myReactions.filter((r): r is typeof r & { postId: string } => r.postId !== null).map((r) => [r.postId, r.type]),
  );

  const postsWithReactions = posts.map((post) => ({
    ...post,
    reactionsSummary: {
      total: totalByPost.get(post.id) ?? 0,
      byType: reactionsByPost.get(post.id) ?? {},
      myReaction: myReactionMap.get(post.id) ?? null,
    },
  }));

  return { posts: postsWithReactions, total, pages: Math.ceil(total / options.limit) };
}

export async function reactToPost(userId: string, postId: string, type: string) {
  const existing = await communityDb.findReaction(userId, postId);

  if (existing && existing.type === type) {
    await communityDb.deleteReaction(existing.id);
    const reactions = await getReactionsSummary(postId);
    return { removed: true, myReaction: null, reactions };
  }

  await communityDb.upsertReaction(userId, postId, type);
  const reactions = await getReactionsSummary(postId);
  return { type, myReaction: type, reactions };
}

async function getReactionsSummary(postId: string) {
  const reactions = await communityDb.getPostReactionsSummary(postId);
  const total = reactions.reduce((sum, r) => sum + r._count, 0);
  const byType: Record<string, number> = {};
  reactions.forEach((r) => { byType[r.type] = r._count; });
  return { total, byType };
}
