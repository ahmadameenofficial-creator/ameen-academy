export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  thumbnail: string | null;
  category: string;
  tags: string[];
  readingTime: number;
  viewsCount: number;
  isFeatured: boolean;
  publishedAt: Date | null;
  author: { name: string; image: string | null };
}
