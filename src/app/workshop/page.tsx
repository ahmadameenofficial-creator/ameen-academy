import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WorkshopHero } from "@/components/workshop/hero";
import { PainSection } from "@/components/workshop/pain-section";
import { SolutionSection } from "@/components/workshop/solution-section";
import { InstructorSection } from "@/components/workshop/instructor-section";
import { CurriculumSection } from "@/components/workshop/curriculum-section";
import { CaseStudiesSection } from "@/components/workshop/case-studies-section";
import { OfferStackSection } from "@/components/workshop/offer-stack-section";
import { GuaranteeSection } from "@/components/workshop/guarantee-section";
import { FaqSection } from "@/components/workshop/faq-section";
import { FinalCtaSection } from "@/components/workshop/final-cta-section";

export const metadata: Metadata = {
  title: "كورس ورشة أمين | أول 5,000 جنيه من الجرافيك ديزاين في 90 يوم",
  description:
    "كورس مسجّل 30+ ساعة — تصميم جرافيك + AI Tools + تسويق شخصي + LinkedIn. أكتر من 300 طالب بدأوا يكسبوا. سعر الإطلاق 1,500 جنيه بدل 3,000.",
  openGraph: {
    type: "website",
    title: "كورس ورشة أمين | أول 5,000 جنيه من التصميم في 90 يوم",
    description:
      "30+ ساعة تعليم عملي — من الصفر لمصمم بيكسب. تصميم + AI + تسويق + LinkedIn. ضمان كامل.",
    locale: "ar_EG",
    siteName: "أكاديمية أمين",
  },
  twitter: {
    card: "summary_large_image",
    title: "كورس ورشة أمين | أول 5,000 جنيه من التصميم في 90 يوم",
    description: "30+ ساعة — تصميم + AI + تسويق. أكتر من 300 خريج. ضمان كامل.",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "كورس ورشة أمين — أول 5,000 جنيه من الجرافيك ديزاين",
  description:
    "كورس مسجّل 30+ ساعة — تصميم جرافيك + AI Tools + تسويق شخصي + LinkedIn. نظام كامل من الصفر لمصمم بيكسب.",
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
