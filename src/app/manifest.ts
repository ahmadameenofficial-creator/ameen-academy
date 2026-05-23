import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "أكاديمية أمين",
    short_name: "أمين",
    description: "اتعلم المهارات اللي هتجيبلك فلوس في 2026 — بالعربي ومن الصفر للاحتراف.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#A002FF",
    dir: "rtl",
    lang: "ar",
    categories: ["education"],
    icons: [
      {
        src: "/images/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
