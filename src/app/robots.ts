import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ameen.academy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/admin/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
        ],
      },
      // السماح لـ Google بالوصول الكامل للصفحات العامة
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/"],
      },
      // السماح صراحةً لزواحف الـ AI بالوصول للصفحات العامة
      // عشان نتعرض ونتذكر في ChatGPT و Perplexity و Google AI و Claude
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/"],
      },
      // منع الـ bots اللي بتستهلك موارد بدون فايدة
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
