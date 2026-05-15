import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/lib/constants";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { LikeButton } from "@/components/blog/like-button";
import { CommentsSection } from "@/components/blog/comments-section";
import {
  IconClock,
  IconCalendar,
  IconEye,
  IconUser,
  IconArrowRight,
  IconArrowLeft,
  IconArticle,
} from "@tabler/icons-react";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      thumbnail: true,
      category: true,
      tags: true,
      author: { select: { name: true } },
      publishedAt: true,
      updatedAt: true,
    },
  });

  if (!post) return { title: "مقال مش موجود" };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: { canonical: `/blog/${slug}` },
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || post.title,
      url: `/blog/${slug}`,
      siteName: "أكاديمية أمين",
      locale: "ar_EG",
      images: post.thumbnail
        ? [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }]
        : undefined,
      authors: [post.author.name],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

function ArticleSchema({
  post,
  slug,
}: {
  post: {
    title: string;
    excerpt: string | null;
    content: string;
    thumbnail: string | null;
    publishedAt: Date | null;
    updatedAt: Date;
    readingTime: number;
    author: { name: string; image: string | null };
  };
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "EducationalOrganization",
      name: "أكاديمية أمين",
      url: SITE_CONFIG.url,
      logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/images/logo.svg` },
    },
    inLanguage: "ar",
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    ...(post.thumbnail && {
      image: { "@type": "ImageObject", url: post.thumbnail },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function renderContent(content: string) {
  const lines = content.split("\n");
  let inList = false;
  let listType = "ul" as string;

  const html = lines
    .map((line, i) => {
      const trimmed = line.trim();

      // بداية أو نهاية قائمة
      const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
      const isOrdered = /^\d+\.\s/.test(trimmed);
      const isListItem = isBullet || isOrdered;

      let prefix = "";
      let suffix = "";

      if (isListItem && !inList) {
        listType = isOrdered ? "ol" : "ul";
        prefix = listType === "ol" ? '<ol class="list-decimal pr-6 space-y-2 my-4">' : '<ul class="list-disc pr-6 space-y-2 my-4">';
        inList = true;
      } else if (!isListItem && inList) {
        suffix = listType === "ol" ? "</ol>" : "</ul>";
        inList = false;
      }

      // Headings
      if (trimmed.startsWith("### ")) {
        const text = applyInline(trimmed.slice(4));
        return `${suffix}<h3 class="text-lg md:text-xl font-bold text-foreground mt-10 mb-4">${text}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        const text = applyInline(trimmed.slice(3));
        return `${suffix}<h2 class="text-xl md:text-2xl font-bold text-foreground mt-12 mb-5 pb-3 border-b border-border">${text}</h2>`;
      }
      if (trimmed.startsWith("# ")) {
        const text = applyInline(trimmed.slice(2));
        return `${suffix}<h1 class="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">${text}</h1>`;
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        const text = applyInline(trimmed.slice(2));
        return `${suffix}<blockquote class="border-r-4 border-brand-500 pr-4 my-6 text-muted-foreground italic">${text}</blockquote>`;
      }

      // Horizontal rule
      if (trimmed === "---" || trimmed === "***") {
        return `${suffix}<hr class="my-8 border-border" />`;
      }

      // List items
      if (isBullet) {
        const text = applyInline(trimmed.slice(2));
        return `${prefix}<li class="text-muted-foreground leading-relaxed">${text}</li>`;
      }
      if (isOrdered) {
        const text = applyInline(trimmed.replace(/^\d+\.\s/, ""));
        return `${prefix}<li class="text-muted-foreground leading-relaxed">${text}</li>`;
      }

      // Empty line
      if (trimmed === "") {
        return suffix || "<br/>";
      }

      // Paragraph
      const text = applyInline(trimmed);
      return `${suffix}<p class="text-muted-foreground leading-[1.9] mb-4 text-base md:text-lg">${text}</p>`;
    })
    .join("\n");

  // لو كان فيه قائمة مفتوحة في الآخر
  const closingTag = inList ? (listType === "ol" ? "</ol>" : "</ul>") : "";
  return html + closingTag;
}

function applyInline(text: string) {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
  // Italic
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Inline code
  text = text.replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm text-brand-600 font-mono">$1</code>');
  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-brand-600 underline underline-offset-2 hover:text-brand-700 transition-colors">$1</a>'
  );
  return text;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    include: { author: { select: { name: true, image: true } } },
  });

  if (!post) notFound();

  await prisma.blogPost.update({
    where: { id: post.id },
    data: { viewsCount: { increment: 1 } },
  });

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      category: post.category,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, thumbnail: true, readingTime: true, excerpt: true },
  });

  const publishDate = post.publishedAt
    ? new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(post.publishedAt)
    : "";

  return (
    <>
      <ArticleSchema post={post} slug={slug} />
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: SITE_CONFIG.url },
          { name: "المدونة", url: `${SITE_CONFIG.url}/blog` },
          { name: post.title, url: `${SITE_CONFIG.url}/blog/${slug}` },
        ]}
      />
      <ReadingProgress />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-50 to-background py-10 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <Link
                href="/blog"
                className="text-sm text-brand-600 hover:underline flex items-center gap-1"
              >
                <IconArrowRight className="h-4 w-4" />
                المدونة
              </Link>
              <span className="text-muted-foreground text-sm">/</span>
              <Badge variant="default">{post.category}</Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-foreground leading-[1.3]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 text-muted-foreground text-lg md:text-xl leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-7 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center">
                  {post.author.image ? (
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <IconUser className="h-4 w-4 text-brand-500" />
                  )}
                </div>
                <span className="font-medium text-foreground">{post.author.name}</span>
              </div>
              <span className="h-4 w-px bg-border" />
              {publishDate && (
                <span className="flex items-center gap-1.5">
                  <IconCalendar className="h-4 w-4" />
                  {publishDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <IconClock className="h-4 w-4" />
                {post.readingTime} دقيقة قراءة
              </span>
              <span className="flex items-center gap-1.5">
                <IconEye className="h-4 w-4" />
                {post.viewsCount} مشاهدة
              </span>
            </div>

            <div className="mt-5 pt-5 border-t border-border">
              <ShareButtons title={post.title} slug={slug} />
            </div>
          </div>
        </section>

        {/* الصورة */}
        {post.thumbnail && (
          <div className="container mx-auto px-4 max-w-3xl mb-10">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={800}
                height={450}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* المحتوى */}
        <article className="container mx-auto px-4 max-w-3xl pb-12">
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {/* Tags + Like + Share */}
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3">
                <LikeButton slug={slug} />
                <ShareButtons title={post.title} slug={slug} />
              </div>
            </div>
          </div>
        </article>

        <CommentsSection slug={slug} />

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-3xl pb-12">
          <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #A002FF 0%, transparent 50%)" }} />
            <div className="relative">
              <h3 className="text-xl font-bold mb-2">عايز تتعلم المهارات دي عمليا؟</h3>
              <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
                شوف كورساتنا العملية — من الصفر للاحتراف مع شهادة معتمدة
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 font-medium px-6 py-3 hover:bg-white/90 transition-colors"
              >
                شوف الكورسات
                <IconArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* مقالات مشابهة */}
        {relatedPosts.length > 0 && (
          <section className="container mx-auto px-4 max-w-3xl pb-16">
            <h3 className="text-lg font-bold text-foreground mb-6">مقالات تانية هتعجبك</h3>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <div className="rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-brand-200 transition-all duration-300">
                    <div className="aspect-[16/9] bg-muted overflow-hidden">
                      {related.thumbnail ? (
                        <Image
                          src={related.thumbnail}
                          alt={related.title}
                          width={300}
                          height={169}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center">
                          <IconArticle className="h-8 w-8 text-brand-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-brand-600 transition-colors leading-relaxed">
                        {related.title}
                      </h4>
                      <span className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <IconClock className="h-3 w-3" /> {related.readingTime} دقيقة
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
