import Image from "next/image";
import Link from "next/link";
import {
  IconSparkles,
  IconArrowLeft,
  IconStar,
  IconBrush,
  IconVideo,
  IconRobot,
  IconGift,
  IconClock,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tilt3D } from "@/components/ui/tilt-3d";
import { BorderBeam } from "@/components/ui/border-beam";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-24">
      {/* خلفية حيّة: أورورا بتتنفس + شبكة بتدّي عمق */}
      <div className="absolute inset-0 mesh-bg" aria-hidden />
      <div className="aurora-bg" aria-hidden />
      <div className="absolute inset-0 grid-pattern" aria-hidden />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* النص */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              <IconSparkles className="size-4" />
              <span>كورسات 2026 متاحة دلوقتي</span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 animate-fade-up text-balance text-3xl font-bold leading-[1.35] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              اتعلّم المهارات اللي{" "}
              <span className="text-gradient-brand inline-block pb-1">هتجيبلك فلوس</span>{" "}
              في 2026
            </h1>

            {/* Subheading */}
            <p
              className="mt-6 max-w-xl animate-fade-up text-balance text-lg leading-relaxed text-muted-foreground mx-auto lg:mx-0"
              style={{ animationDelay: "0.1s" }}
            >
              كورسات عملية في التصميم، المونتاج، والذكاء الاصطناعي — من الصفر للاحتراف. اتعلّم، اشتغل، وابني دخل حقيقي.
            </p>

            {/* Skills pills */}
            <div
              className="mt-5 flex animate-fade-up flex-wrap items-center justify-center gap-2 lg:justify-start"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 border border-brand-100">
                <IconBrush className="size-3.5" />
                جرافيك ديزاين
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 border border-brand-100">
                <IconVideo className="size-3.5" />
                فيديو إديتنج
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 border border-brand-100">
                <IconRobot className="size-3.5" />
                أدوات AI
              </span>
            </div>

            {/* CTAs */}
            <div
              className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                asChild
                variant="gradient"
                size="xl"
                className="btn-shine workshop-btn-glow w-full sm:w-auto"
              >
                <Link href="/free">
                  <IconGift className="size-5" />
                  ابدأ بالكورس المجاني
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                <Link href="/workshop">
                  شوف كورس الورشة
                  <IconArrowLeft className="size-5" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators — قيمة حقيقية بدون أرقام مضخّمة */}
            <div
              className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-2">
                <IconGift className="size-5 text-brand-500" />
                <span>كورس مجاني تبدأ بيه</span>
              </div>
              <div className="flex items-center gap-2">
                <IconBrush className="size-5 text-brand-500" />
                <span>محتوى عملي بالعربي</span>
              </div>
              <div className="flex items-center gap-2">
                <IconClock className="size-5 text-brand-500" />
                <span>وصول مدى الحياة</span>
              </div>
            </div>
          </div>

          {/* الصورة */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
            <Tilt3D className="relative">
              {/* هالة ضوئية بتتنفس ورا الصورة */}
              <div
                className="absolute inset-4 rounded-3xl bg-brand-500/25 blur-2xl animate-pulse-glow"
                aria-hidden
              />

              {/* الصورة الرئيسية + شعاع بيلف حواليها */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20 border-2 border-white/20">
                <Image
                  src="/images/00.png"
                  alt="أحمد أمين — مؤسس أكاديمية أمين"
                  width={600}
                  height={400}
                  className="w-72 sm:w-96 lg:w-[28rem] h-auto object-cover"
                  priority
                />
                <BorderBeam />
              </div>

              {/* Floating badges — بتعوم ببطء */}
              <div className="absolute -bottom-4 -right-4 animate-float bg-background rounded-2xl shadow-lg border border-border px-4 py-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
                  <IconStar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">كورسات متعددة</p>
                  <p className="text-[10px] text-muted-foreground">محتوى عملي محدّث</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 animate-float-delayed bg-background rounded-2xl shadow-lg border border-border px-4 py-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
                  <IconGift className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">كورس مجاني</p>
                  <p className="text-[10px] text-muted-foreground">ابدأ من غير جنيه</p>
                </div>
              </div>
            </Tilt3D>
          </div>
        </div>
      </div>
    </section>
  );
}
