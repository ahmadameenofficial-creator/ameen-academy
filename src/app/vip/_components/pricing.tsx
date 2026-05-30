"use client";

import { motion } from "framer-motion";
import { IconCheck, IconBolt, IconCrown, IconStar } from "@tabler/icons-react";
import { PLANS, ANNUAL_SAVINGS, ROUND_INFO } from "../_constants";

const FEATURES = {
  base: [
    "كل الـ 7 مميزات",
    "لايف كل أسبوعين",
    "Brief شهري + Portfolio Review",
    "Job Board + المكتبة",
    "WhatsApp + Discord",
    "كنسل في أي وقت",
    "ضمان 7 أيام",
  ],
  annual: [
    "كل المميزات",
    "مكالمة 1-on-1 ربع سنوية (45 د)",
    "Priority في الـ Hot Seat",
    "Certificate + LinkedIn badge",
    "ضمان 14 يوم",
  ],
};

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-white/5 scroll-mt-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(160,2,255,0.1),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500/20 to-brand-700/20 border border-brand-500/40 rounded-full px-4 py-2 mb-6">
            <IconBolt className="h-4 w-4 text-brand-300" />
            <span className="text-xs font-bold text-brand-200 uppercase tracking-widest">
              عرض الـ Round الأول · ينتهي 3 يونيو
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black leading-tight text-white mb-5">
            احجز قبل ما يقفل،
            <br />
            <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
              وادفع النص.
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
            بعد 3 يونيو الـ Round الأول بيتقفل، والسعر برضو بيرجع لطبيعته.
            <br />
            اختار الأنسب ليك دلوقتي.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Monthly */}
          <PricingCard
            plan="monthly"
            featured={false}
            delay={0}
          />

          {/* Annual - Featured */}
          <PricingCard
            plan="annual"
            featured={true}
            delay={0.1}
          />

          {/* Quarterly */}
          <PricingCard
            plan="quarterly"
            featured={false}
            delay={0.2}
          />
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-xs md:text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            الـ Round الأول بيبدأ <strong className="text-white">{ROUND_INFO.startMonth}</strong>.
            بعد ما الـ 30 مكان يتلموا، الباب بيقفل لحد الـ Round اللي بعده. والـ Early Bird مش بيتكرّر.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  featured,
  delay,
}: {
  plan: "monthly" | "quarterly" | "annual";
  featured: boolean;
  delay: number;
}) {
  const planData = PLANS[plan.toUpperCase() as "MONTHLY" | "QUARTERLY" | "ANNUAL"];
  const features = plan === "annual" ? FEATURES.annual : FEATURES.base;
  const pricePerMonth = Math.round(planData.earlyBird / planData.months);
  const savings = planData.regular - planData.earlyBird;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className={`relative rounded-3xl p-7 md:p-8 ${
        featured
          ? "bg-gradient-to-br from-brand-800/40 via-brand-950/60 to-black border-2 border-brand-500 shadow-2xl shadow-brand-500/30 md:scale-105"
          : "bg-white/[0.02] border border-white/10"
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-brand-400 to-brand-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-brand-500/40">
            <IconStar className="h-3 w-3 fill-white" />
            الأوفر · يوفّر {ANNUAL_SAVINGS} ج
          </div>
        </div>
      )}

      {/* Plan Label */}
      <div className="flex items-center gap-2 mb-4">
        {featured && <IconCrown className="h-5 w-5 text-brand-300" />}
        <p className="text-sm font-bold text-white/70">{planData.label}</p>
      </div>

      {/* Price */}
      <div className="mb-2">
        <span className="text-white/30 line-through text-2xl font-mono">
          {planData.regular.toLocaleString("ar-EG")} ج
        </span>
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <span
          className={`text-5xl md:text-6xl font-black tracking-tight ${
            featured ? "bg-gradient-to-br from-brand-200 to-brand-500 bg-clip-text text-transparent" : "text-white"
          }`}
        >
          {planData.earlyBird.toLocaleString("ar-EG")}
        </span>
        <span className="text-base text-white/60 font-normal">ج</span>
      </div>

      <p className="text-xs text-white/50 mb-1">
        لـ {planData.period}
      </p>

      {plan !== "monthly" && (
        <p className="text-xs text-brand-300 font-medium mb-6">
          = {pricePerMonth.toLocaleString("ar-EG")} ج/شهر · توفّر {savings.toLocaleString("ar-EG")} ج
        </p>
      )}

      {plan === "monthly" && (
        <p className="text-xs text-white/40 mb-6">
          يجدد على {PLANS.MONTHLY.regular} ج · تكنسل في أي وقت
        </p>
      )}

      {/* Features */}
      <ul className="space-y-2.5 mb-7">
        {features.map((feature, i) => (
          <li key={i} className={`flex items-start gap-2.5 text-sm ${featured ? "text-white/90" : "text-white/70"}`}>
            <IconCheck
              className={`h-4 w-4 shrink-0 mt-0.5 ${
                featured ? "text-brand-400" : "text-brand-500"
              }`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#apply"
        className={`block text-center font-black py-3.5 rounded-xl transition-all ${
          featured
            ? "bg-gradient-to-br from-brand-400 to-brand-600 hover:from-brand-300 hover:to-brand-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-400/40"
            : "bg-white/10 hover:bg-white/15 text-white"
        }`}
      >
        {featured ? "احجز السنوي" : `احجز ${planData.label}`}
      </a>
    </motion.div>
  );
}
