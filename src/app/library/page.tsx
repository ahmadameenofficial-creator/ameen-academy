import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LibraryHero } from "@/components/library/library-hero";
import { LibraryGrid } from "@/components/library/library-grid";

export const metadata: Metadata = {
  title: "مكتبة كتب التصميم — أقوى كتب الجرافيك والإبداع | أكاديمية أمين",
  description:
    "مكتبة مختارة لأقوى كتب الجرافيك ديزاين والإبداع: تايبوجرافي، هوية، جريد، ألوان — بملخص عربي و«ليه تقراه» لكل كتاب. فيها كتب مجانية تقراها دلوقتي وترشيحات تستاهل.",
  alternates: {
    canonical: "/library",
  },
  openGraph: {
    title: "مكتبة كتب التصميم | أكاديمية أمين",
    description: "أقوى كتب الجرافيك ديزاين والإبداع بملخص عربي لكل كتاب.",
    type: "website",
  },
};

export default function LibraryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LibraryHero />
        <LibraryGrid />
      </main>
      <Footer />
    </>
  );
}
