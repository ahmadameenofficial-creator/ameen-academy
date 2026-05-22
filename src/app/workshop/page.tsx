import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WorkshopHero } from "@/components/workshop/hero";
import { PainSection } from "@/components/workshop/pain-section";

const SolutionSection = dynamic(() => import("@/components/workshop/solution-section").then(m => ({ default: m.SolutionSection })));
const InstructorSection = dynamic(() => import("@/components/workshop/instructor-section").then(m => ({ default: m.InstructorSection })));
const CurriculumSection = dynamic(() => import("@/components/workshop/curriculum-section").then(m => ({ default: m.CurriculumSection })));
const CaseStudiesSection = dynamic(() => import("@/components/workshop/case-studies-section").then(m => ({ default: m.CaseStudiesSection })));
const OfferStackSection = dynamic(() => import("@/components/workshop/offer-stack-section").then(m => ({ default: m.OfferStackSection })));
const GuaranteeSection = dynamic(() => import("@/components/workshop/guarantee-section").then(m => ({ default: m.GuaranteeSection })));
const FaqSection = dynamic(() => import("@/components/workshop/faq-section").then(m => ({ default: m.FaqSection })));
const FinalCtaSection = dynamic(() => import("@/components/workshop/final-cta-section").then(m => ({ default: m.FinalCtaSection })));

export const metadata: Metadata = {
  title: "كورس ورشة أمين | اتعلم أقوى مهارة في 2026 واكسب أول 5,000 جنيه",
  description:
    "كورس مسجّل 30+ ساعة — من الصفر تماماً. تصميم + AI + تسويق + LinkedIn. مش محتاج خبرة سابقة. 300+ شخص بدأوا يكسبوا. سعر الإطلاق 1,500 جنيه.",
  openGraph: {
    type: "website",
    title: "كورس ورشة أمين | اتعلم أقوى مهارة في 2026 واكسب دخل إضافي",
    description:
      "30+ ساعة تعليم عملي — من الصفر للكسب. تصميم + AI + تسويق + LinkedIn. مش محتاج خبرة. ضمان كامل.",
    locale: "ar_EG",
    siteName: "أكاديمية أمين",
  },
  twitter: {
    card: "summary_large_image",
    title: "كورس ورشة أمين | اتعلم أقوى مهارة في 2026",
    description: "30+ ساعة — من الصفر للكسب. تصميم + AI + تسويق. 300+ بدأوا يكسبوا. ضمان كامل.",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "كورس ورشة أمين — اتعلم أقوى مهارة في 2026 واكسب دخل إضافي",
  description:
    "كورس مسجّل 30+ ساعة — تصميم + AI + تسويق + LinkedIn. من الصفر تماماً. نظام كامل يوديك لأول 5,000 جنيه.",
  provider: {
    "@type": "Organization",
    name: "أكاديمية أمين",
    url: "https://ameen.academy",
  },
  instructor: {
    "@type": "Person",
    name: "أحمد أمين",
  },
  inLanguage: "ar",
  offers: {
    "@type": "Offer",
    price: "1500",
    priceCurrency: "EGP",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT30H",
  },
};

export default function WorkshopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <WorkshopHero />
        <PainSection />
        <SolutionSection />
        <CurriculumSection />
        <InstructorSection />
        <CaseStudiesSection />
        <OfferStackSection />
        <GuaranteeSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
