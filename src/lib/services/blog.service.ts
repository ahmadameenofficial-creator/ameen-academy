import { blogDb } from "@/lib/db";

export function getPublishedPosts() {
  return blogDb.findPublishedBlogPosts();
}

export function getBlogDetail(slug: string) {
  return blogDb.findBlogBySlugFull(slug);
}

export function getBlogComments(postId: string) {
  return blogDb.findBlogComments(postId);
}

export function addBlogComment(postId: string, userId: string, content: string, parentId?: string) {
  return blogDb.createBlogComment(postId, userId, content, parentId);
}
