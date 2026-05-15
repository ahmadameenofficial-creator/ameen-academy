import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/lib/constants";
import {
  IconClock,
  IconEye,
  IconArticle,
  IconArrowLeft,
  IconTrendingUp,
} from "@tabler/icons-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "المدونة — مقالات عن المهارات، AI، والشغل أونلاين",
  description:
    "مقالات عملية بالعربي عن إزاي تجيب فلوس من الإنترنت، أفضل أدوات AI، تعلم التصميم، الفريلانس بالدولار، وأهم المهارات المطلوبة في سوق العمل 2026.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "مدونة أكاديمية أمين — مهارات، AI، فريلانس",
    description: "مقالات عملية تساعدك تتعلم وتكسب",
    type: "website",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  "تصميم": "تصميم",
  "AI": "ذكاء اصطناعي",
  "فريلانس": "فريلانس",
  "مهارات": "مهارات",
  "أدوات": "أدوات",
};

async function getPosts() {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    include: { author: { select: { name: true, image: true } } },
  });
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts.find((p) => p.isFeatured);
  const regularPosts = posts.filter((p) => p !== featuredPost);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: SITE_CONFIG.url },
          { name: "المدونة", url: `${SITE_CONFIG.url}/blog` },
        ]}
      />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/50 to-background py-16 md:py-20">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A002FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="container mx-auto px-4 text-center relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100/60 px-4 py-1.5 text-sm text-brand-700 mb-6">
              <IconTrendingUp className="h-4 w-4" />
              مقالات عملية تساعدك تتعلم وتكسب
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              المدونة
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              محتوى حقيقي مبني على تجارب — مش كلام نظري.
              هنا هتلاقي اللي يخليك تبدأ صح وتفضل ماشي.
            </p>
          </div>
        </section>

        {posts.length === 0 ? (
          <section className="container mx-auto px-4 py-20">
            <div className="text-center">
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <IconArticle className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                المقالات جاية قريب
              </h2>
              <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                بنجهّز محتوى قوي هيساعدك تاخد أول خطوة صح — استنّونا
              </p>
            </div>
          </section>
        ) : (
          <>
            {/* المقال المميّز */}
            {featuredPost && (
              <section className="container mx-auto px-4 -mt-6 mb-8 relative z-10">
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="grid md:grid-cols-2">
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                        {featuredPost.thumbnail ? (
                          <Image
                            src={featuredPost.thumbnail}
                            alt={featuredPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            priority
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center min-h-[240px]">
                            <IconArticle className="h-16 w-16 text-white/30" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge variant="solid" className="shadow-lg">مميّز</Badge>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <Badge variant="default" className="w-fit mb-3">
                          {CATEGORY_LABELS[featuredPost.category] || featuredPost.category}
                        </Badge>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-brand-600 transition-colors">
                          {featuredPost.title}
                        </h2>
                        {featuredPost.excerpt && (
                          <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <IconClock className="h-4 w-4" />
                            {featuredPost.readingTime} دقيقة قراءة
                          </span>
                          {featuredPost.viewsCount > 0 && (
                            <span className="flex items-center gap-1.5">
                              <IconEye className="h-4 w-4" />
                              {featuredPost.viewsCount}
                            </span>
                          )}
                          {featuredPost.publishedAt && (
                            <span>{formatDate(featuredPost.publishedAt)}</span>
                          )}
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-brand-600 text-sm font-medium group-hover:gap-3 transition-all">
                          اقرأ المقال
                          <IconArrowLeft className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* باقي المقالات */}
            {regularPosts.length > 0 && (
              <section className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                  {regularPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                      <article className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:shadow-brand-500/5 hover:border-brand-200 transition-all duration-300 h-full flex flex-col">
                        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                          {post.thumbnail ? (
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              width={600}
                              height={338}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-brand-100 to-brand-50">
                              <IconArticle className="h-10 w-10 text-brand-300" />
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                          <Badge variant="default" className="w-fit mb-3 text-[11px]">
                            {CATEGORY_LABELS[post.category] || post.category}
                          </Badge>

                          <h2 className="font-bold text-foreground text-lg leading-snug line-clamp-2 mb-2 group-hover:text-brand-600 transition-colors">
                            {post.title}
                          </h2>

                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <IconClock className="h-3.5 w-3.5" />
                                {post.readingTime} دقيقة
                              </span>
                              {post.viewsCount > 0 && (
                                <span className="flex items-center gap-1">
                                  <IconEye className="h-3.5 w-3.5" />
                                  {post.viewsCount}
                                </span>
                              )}
                            </div>
                            <span>{post.author.name}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="rounded-2xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #A002FF 0%, transparent 50%), radial-gradient(circle at 80% 50%, #6D01B0 0%, transparent 50%)" }} />
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                عايز تتعلم المهارات دي عمليا؟
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-6 max-w-md mx-auto">
                المقالات بداية كويسة — بس الكورسات هي اللي هتخليك تبدأ تكسب فعلا
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
      </main>
      <Footer />
    </>
  );
}
