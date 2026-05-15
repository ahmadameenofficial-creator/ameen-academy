import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { OrganizationSchema, WebsiteSchema } from "@/lib/structured-data";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

// ============ Viewport ============
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#A002FF",
};

// ============ Metadata ============
export const metadata: Metadata = {
  title: {
    default: "أكاديمية أمين | تعلّم الجرافيك ديزاين باحتراف",
    template: `%s | ${SITE_CONFIG.nameAr}`,
  },
  description:
    "أكاديمية أمين — أقوى كورسات جرافيك ديزاين باللغة العربية. اتعلم Photoshop و Illustrator من الصفر للاحتراف مع شهادة معتمدة. كورسات مسجلة بجودة عالية مع حماية كاملة للمحتوى.",
  keywords: [
    "كورسات جرافيك ديزاين",
    "تعليم تصميم جرافيك",
    "كورس فوتوشوب",
    "كورس الستريتور",
    "تعلم التصميم",
    "أكاديمية أمين",
    "Ameen Academy",
    "graphic design courses arabic",
    "كورسات تصميم اونلاين",
    "تعليم فوتوشوب بالعربي",
    "كورسات تصميم مصر",
    "تعلم الجرافيك ديزاين",
    "دورات تصميم احترافي",
    "كورس تصميم شعارات",
    "كورس تصميم سوشيال ميديا",
  ],
  authors: [{ name: "أكاديمية أمين", url: SITE_CONFIG.url }],
  creator: "أكاديمية أمين",
  publisher: "أكاديمية أمين",
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_CONFIG.url,
    title: "أكاديمية أمين | تعلّم الجرافيك ديزاين باحتراف",
    description:
      "أقوى كورسات جرافيك ديزاين باللغة العربية. اتعلم من الصفر للاحتراف مع شهادة معتمدة.",
    siteName: "أكاديمية أمين",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "أكاديمية أمين — تعلّم الجرافيك ديزاين",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أكاديمية أمين | تعلّم الجرافيك ديزاين باحتراف",
    description:
      "أقوى كورسات جرافيك ديزاين باللغة العربية. اتعلم من الصفر للاحتراف.",
    creator: "@ameenacademy",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // هتحطه لما تاخد الكود من Google Search Console
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "education",
  other: {
    // Geo-targeting لمصر والوطن العربي
    "geo.region": "EG",
    "geo.placename": "Cairo, Egypt",
    "geo.position": "30.0444;31.2357",
    ICBM: "30.0444, 31.2357",
    "content-language": "ar",
    // Dublin Core metadata
    "DC.language": "ar",
    "DC.creator": "أكاديمية أمين",
    "DC.subject": "تعليم, جرافيك ديزاين, تصميم",
    "DC.publisher": "أكاديمية أمين",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* JSON-LD: Organization + Website */}
        <OrganizationSchema />
        <WebsiteSchema />
        {/* GA4 */}
        <GoogleAnalytics />
      </head>
      <body className={`${ibmPlex.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
