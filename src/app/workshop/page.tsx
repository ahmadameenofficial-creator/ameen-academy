import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/workshop/lenis-provider";
import { WorkshopHero } from "@/components/workshop/hero";
import { SocialProofTicker } from "@/components/workshop/social-proof-ticker";
import { PainSection } from "@/components/workshop/pain-section";
import { SolutionSection } from "@/components/workshop/solution-section";
import { CaseStudiesSection } from "@/components/workshop/case-studies-section";

const CurriculumSection = dynamic(() => import("@/components/workshop/curriculum-section").then(m => ({ default: m.CurriculumSection })));
const InstructorSection = dynamic(() => import("@/components/workshop/instructor-section").then(m => ({ default: m.InstructorSection })));
const OfferStackSection = dynamic(() => import("@/components/workshop/offer-stack-section").then(m => ({ default: m.OfferStackSection })));
const GuaranteeSection = dynamic(() => import("@/components/workshop/guarantee-section").then(m => ({ default: m.GuaranteeSection })));
const FaqSection = dynamic(() => import("@/components/workshop/faq-section").then(m => ({ default: m.FaqSection })));
const FinalCtaSection = dynamic(() => import("@/components/workshop/final-cta-section").then(m => ({ default: m.FinalCtaSection })));
const StickyCta = dynamic(() => import("@/components/workshop/sticky-cta").then(m => ({ default: m.StickyCta })));

export const metadata: Metadata = {
  title: "كورس ورشة أمين | اكسب أول 5,000 جنيه من مهارة حقيقية في 90 يوم",
  description:
    "تصميم + AI + موقع + تسويق — 30+ ساعة عملي من الصفر. 300+ شخص بدأوا يكسبوا فعلاً. ضمان كامل. 1,500 جنيه.",
  openGraph: {
    type: "website",
    title: "كورس ورشة أمين | اكسب أول 5,000 جنيه في 90 يوم",
    description:
      "تصميم + AI + موقع + تسويق. 30+ ساعة عملي من الصفر. 300+ بدأوا يكسبوا. ضمان كامل.",
    locale: "ar_EG",
    siteName: "أكاديمية أمين",
  },
  twitter: {
    card: "summary_large_image",
    title: "كورس ورشة أمين | مهارة حقيقية + بيزنس من الصفر",
    description: "تصميم + AI + موقع + تسويق. 30+ ساعة عملي. 300+ بدأوا يكسبوا. ضمان كامل.",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "كورس ورشة أمين — اكسب أول 5,000 جنيه من مهارة حقيقية",
  description:
    "كورس مسجّل 30+ ساعة — تصميم + AI + موقع + تسويق + LinkedIn. من الصفر لأول 5,000 جنيه في 90 يوم.",
  provider: {
    "@type": "Organization",
    name: "أكاديمية أمين",
    url: "https://ameen.academy",
  },
  instructor: { "@type": "Person", name: "أحمد أمين" },
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
      <LenisProvider>
        <Navbar />
        <main className="flex-1 overflow-x-hidden">
          <WorkshopHero />
          <SocialProofTicker />
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
        <StickyCta />
        <Footer />
      </LenisProvider>
    </>
  );
}
