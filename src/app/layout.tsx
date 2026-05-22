import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { OrganizationSchema, WebsiteSchema } from "@/lib/structured-data";
import { ReferralCapture } from "@/components/referral-capture";
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
    default: "أكاديمية أمين | اتعلم المهارات اللي هتجيبلك فلوس في 2026",
    template: `%s | ${SITE_CONFIG.nameAr}`,
  },
  description:
    "أكاديمية أمين — اتعلم المهارات اللي السوق محتاجها في 2026: تصميم جرافيك، ذكاء اصطناعي، فريلانس، ومهارات حديثة. كورسات عملية بالعربي من الصفر للاحتراف مع شهادة معتمدة.",
  keywords: [
    "كورسات اونلاين",
    "تعلم مهارات جديدة",
    "اتعلم وانت في البيت",
    "كورسات جرافيك ديزاين",
    "تعلم الذكاء الاصطناعي",
    "كورس AI بالعربي",
    "ازاي اجيب فلوس من الانترنت",
    "شغل اونلاين",
    "فريلانس مصر",
    "مهارات مطلوبة 2026",
    "كورس فوتوشوب",
    "كورس الستريتور",
    "أكاديمية أمين",
    "Ameen Academy",
    "كورسات تصميم اونلاين",
    "دخل إضافي من الانترنت",
    "تعلم من الصفر",
    "كورسات عربي احترافية",
    "شغل فريلانس بالدولار",
    "مهارات المستقبل",
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
    title: "أكاديمية أمين | اتعلم المهارات اللي هتجيبلك فلوس في 2026",
    description:
      "اتعلم تصميم، AI، فريلانس، ومهارات مطلوبة في السوق. كورسات عملية بالعربي من الصفر للاحتراف.",
    siteName: "أكاديمية أمين",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "أكاديمية أمين — اتعلم مهارات تجيبلك فلوس",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أكاديمية أمين | اتعلم المهارات اللي هتجيبلك فلوس في 2026",
    description:
      "كورسات تصميم، AI، فريلانس بالعربي. من الصفر للاحتراف مع شهادة معتمدة.",
    creator: "@ameen_academy",
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
        <ReferralCapture />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
