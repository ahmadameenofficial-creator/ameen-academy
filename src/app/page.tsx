import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FreeCourseSection } from "@/components/landing/free-course-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaSection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "أكاديمية أمين | اتعلم المهارات اللي هتجيبلك فلوس في 2026",
  description:
    "أكاديمية أمين — اتعلم المهارات اللي السوق محتاجها: تصميم جرافيك، ذكاء اصطناعي، فريلانس. كورسات عملية بالعربي من الصفر للاحتراف مع شهادة إتمام ووصول مدى الحياة.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FreeCourseSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
