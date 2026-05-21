import { prisma } from "@/lib/prisma";

export function findPublishedBlogPosts() {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    include: { author: { select: { name: true, image: true } } },
  });
}

export function findBlogBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
  });
}

export function findBlogBySlugFull(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    include: {
      author: { select: { name: true, image: true, bio: true } },
    },
  });
}

export function findAdminBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { author: { select: { name: true, image: true } } },
  });
}

export function findBlogPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export function createBlogPost(data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  category: string;
  tags?: string[];
  authorId: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  readingTime?: number;
}) {
  return prisma.blogPost.create({
    data: {
      ...data,
      publishedAt: data.isPublished ? new Date() : null,
    },
  });
}

export function updateBlogPost(id: string, data: Record<string, unknown>) {
  return prisma.blogPost.update({ where: { id }, data });
}

export function deleteBlogPost(id: string) {
  return prisma.blogPost.delete({ where: { id } });
}

export function incrementBlogViews(id: string) {
  return prisma.blogPost.update({
    where: { id },
    data: { viewsCount: { increment: 1 } },
  });
}

export function findBlogComments(postId: string) {
  return prisma.blogComment.findMany({
    where: { postId, parentId: null, isDeleted: false },
    take: 50,
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { id: true, name: true, image: true, role: true } },
      replies: {
        where: { isDeleted: false },
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true, image: true, role: true } },
        },
      },
    },
  });
}

export function createBlogComment(postId: string, userId: string, content: string, parentId?: string) {
  return prisma.blogComment.create({
    data: { postId, userId, content, parentId: parentId || null },
    include: {
      user: { select: { id: true, name: true, image: true, role: true } },
      replies: {
        include: {
          user: { select: { id: true, name: true, image: true, role: true } },
        },
      },
    },
  });
}
