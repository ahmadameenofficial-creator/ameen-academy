import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BriefGenerator } from "@/components/brief/brief-generator";

export const metadata: Metadata = {
  title: "ولّد بريف تصميم احترافي",
  description:
    "ولّد بريف تصميم واقعي بضغطة زرار — لوجو، سوشيال ميديا، أو هوية بصرية كاملة. اتدرّب على بريفات زي اللي بتيجي من عملاء حقيقيين.",
  alternates: { canonical: "/brief/generate" },
};

export default function GenerateBriefPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            ولّد بريف التصميم بتاعك
          </h1>
          <p className="mt-2 text-muted-foreground">
            اختار نوع المشروع والمستوى، وهنطلّعلك بريف واقعي تتدرّب عليه زي عميل حقيقي.
          </p>
        </div>
        <BriefGenerator />
      </main>
      <Footer />
    </>
  );
}
