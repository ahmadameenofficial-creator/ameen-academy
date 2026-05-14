import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Providers } from "@/components/providers";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name + " · " + SITE_CONFIG.nameAr,
    template: `%s · ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ["كورسات", "تعليم", "برمجة", "أكاديمية", "Ameen Academy"],
  authors: [{ name: "Ameen Academy" }],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${ibmPlex.variable} font-sans`}>
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
