import { prisma } from "@/lib/prisma";

const USER_SELECT = { id: true, name: true, image: true, role: true } as const;

export function findPosts(where: { isDeleted: boolean; courseId?: string }, page: number, limit: number) {
  return prisma.post.findMany({
    where,
    include: {
      user: { select: USER_SELECT },
      comments: {
        where: { isDeleted: false, parentId: null },
        take: 3,
        orderBy: { createdAt: "asc" as const },
        include: {
          user: { select: USER_SELECT },
          replies: {
            where: { isDeleted: false },
            orderBy: { createdAt: "asc" as const },
            take: 10,
            include: { user: { select: USER_SELECT } },
          },
        },
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
    skip: (page - 1) * limit,
    take: limit,
  });
}

export function countPosts(where: { isDeleted: boolean; courseId?: string }) {
  return prisma.post.count({ where });
}

export function getReactionCountsForPosts(postIds: string[]) {
  return prisma.reaction.groupBy({
    by: ["postId", "type"],
    where: { postId: { in: postIds } },
    _count: true,
  });
}

export function getUserReactionsForPosts(userId: string, postIds: string[]) {
  return prisma.reaction.findMany({
    where: { postId: { in: postIds }, userId },
    select: { postId: true, type: true },
  });
}

export function createPost(userId: string, content: string, courseId?: string | null, image?: string | null) {
  return prisma.post.create({
    data: { userId, content, courseId: courseId || null, image: image || null },
    include: {
      user: { select: USER_SELECT },
      _count: { select: { comments: true, likes: true } },
    },
  });
}

export function findPostById(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export function updatePost(id: string, data: { content?: string; isDeleted?: boolean }) {
  return prisma.post.update({ where: { id }, data });
}

export function findReaction(userId: string, postId: string) {
  return prisma.reaction.findUnique({
    where: { userId_postId: { userId, postId } },
  });
}

export function upsertReaction(userId: string, postId: string, type: string) {
  return prisma.reaction.upsert({
    where: { userId_postId: { userId, postId } },
    create: { userId, postId, type },
    update: { type },
  });
}

export function deleteReaction(id: string) {
  return prisma.reaction.delete({ where: { id } });
}

export function getPostReactionsSummary(postId: string) {
  return prisma.reaction.groupBy({
    by: ["type"],
    where: { postId },
    _count: true,
  });
}
