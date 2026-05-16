import { prisma } from "@/lib/prisma";
import { BlogManager } from "./blog-manager";

export const revalidate = 30;

async function getPosts() {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      thumbnail: true,
      category: true,
      tags: true,
      isPublished: true,
      isFeatured: true,
      viewsCount: true,
      readingTime: true,
      publishedAt: true,
      createdAt: true,
      author: { select: { name: true, image: true } },
    },
  });
}

export default async function AdminBlogPage() {
  const posts = await getPosts();

  const serialized = posts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt?.toISOString() || null,
    createdAt: p.createdAt.toISOString(),
    author: { name: p.author.name || "أدمن", image: p.author.image },
  }));

  return <BlogManager initialPosts={serialized} />;
}
