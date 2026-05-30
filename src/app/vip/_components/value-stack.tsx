"use client";

import { motion } from "framer-motion";
import {
  IconBolt,
  IconCalendarEvent,
  IconBriefcase,
  IconStar,
  IconMessages,
  IconFolder,
  IconArrowLeft,
} from "@tabler/icons-react";

const VALUE_ITEMS = [
  {
    icon: IconCalendarEvent,
    badge: "مرتين شهرياً",
    title: "لايف كل أسبوعين",
    what: "90 دقيقة. موضوع محدد كل مرة. مثلاً: «إزاي تسعّر شغلانة بـ 5000 ج»، «AI tools اللي بتشتغل فعلاً في 2026»، «التعامل مع العميل اللي بيغيّر كل ساعة».",
    forBeginner:
      "مش tutorial تنساه بعد أسبوع. كل لايف خطوة عملية تطبّقها، ونراجعها في اللي بعده. كده بتتقدّم بسرعة بدل ما تلف سنين لوحدك وتتعلّم بالغلط.",
    value: 600,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: IconBolt,
    badge: "كل لايف",
    title: "Hot Seat — دورك بييجي",
    what: "30 دقيقة في كل لايف، عضو واحد بياخد spotlight لشغله الشخصي. أنا بـ feedback قدّام الكل. كل عضو دوره بييجي كل 6-8 لايفات.",
    forBeginner:
      "حد محترف يبصّ على شغلك ويقولك بالظبط «ده غلط، اعمله كده» — قدّام الكل. الـ 30 دقيقة دي بـ 1500 ج في السوق، وهنا دورك بييجي تلقائي كل كام لايف.",
    value: 1500,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: IconBriefcase,
    badge: "كل شهر",
    title: "Brief بأسلوب client حقيقي",
    what: "Brief بسياق + جمهور + ميزانية + deadline. مش «صمّم لوجو». «صمّم لوجو لمطعم بيرجر في الإسكندرية، ميزانية 8000 ج، عايز launch على إنستجرام».",
    forBeginner:
      "البورتفوليو الضعيف: «صمّمت لوجو لكافيه» + صورة. البورتفوليو اللي بيبيع: السياق، التحدي، الـ solution، الـ result. كل شهر brief = 12 مشروع محترم في السنة. بعد سنة عندك بورتفوليو بمستوى محترف بخبرة سنين.",
    value: 800,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: IconStar,
    badge: "شخصي",
    title: "مراجعة Portfolio شهرية",
    what: "Loom 10-15 دقيقة — فيه أنا بشوف شغلك، بـ screenshare، بقولك بالظبط: ده اللي بيخلّيه pro، ده اللي بيخلّيه طالب.",
    forBeginner:
      "هاوريك تصميمين: ده بـ 1500 ج وده بـ 5000 ج، وأقولك بالظبط ايه اللي فرّق بينهم. بعدها مش هتشوف شغلك بنفس العين تاني — هتبص له بعين المحترف.",
    value: 500,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: IconBriefcase,
    badge: "Exclusive",
    title: "Job Board مغلق",
    what: "كل شغلانة بتيجيلي ومش بأخدها (بسبب وقتي أو سعرها)، بترميها هنا. كله من 1500 ج وفوق — مفيش رخيص.",
    forBeginner:
      "مش محتاج brand ولا اسم كبير عشان تشتغل — الشغل بييجيلك جاهز. شغلانة واحدة بـ 3000 ج طول السنة = برّرت اشتراكك 4 مرات. واحدة بس!",
    value: "غير محدودة",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: IconMessages,
    badge: "24/7",
    title: "WhatsApp + Discord مغلق",
    what: "30 شخص بس. ناس بترد. ناس بتشتغل فعلاً. مفيش «وش الكتاب». مفيش «أنا مش فاهم».",
    forBeginner:
      "السؤال اللي مش هتلاقي عليه رد جدّي في جروبات فيسبوك — هنا بتلاقي رد محترم في 30 دقيقة من ناس بتشتغل في المجال فعلاً، مش كلام نظري.",
    value: 300,
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    icon: IconFolder,
    badge: "Update شهرياً",
    title: "مكتبة الموارد",
    what: "Mockups، fonts عربية مرتّبة، contracts بالعربي للعميل المصري، scripts للتعامل («العميل بيغيّر كل شوية، أرد ازاي؟»).",
    forBeginner:
      "أول contract بالعربي تطلبه من العميل = شكلك بقى محترف. أول mockup جاهز للـ presentation = شغلك بقى يبيع. وفّرت 20 ساعة شهرياً كنت هتضيّعها في التدوير بدل ما تشتغل.",
    value: 700,
    color: "from-yellow-500/20 to-amber-500/20",
  },
];

export function ValueStack() {
  const totalValue = VALUE_ITEMS.reduce((sum, item) => {
    return typeof item.value === "number" ? sum + item.value : sum;
  }, 0);

  return (
    <section id="whats-inside" className="py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(160,2,255,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-400 font-bold mb-4 uppercase tracking-[0.2em] text-xs">
            ده اللي بتاخده · 7 حاجات
          </p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight text-white">
            قيمتهم{" "}
            <span className="text-white/30 line-through">{totalValue.toLocaleString("ar-EG")} ج</span>
            <br />
            بتدفع{" "}
            <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
              نصّهم بس.
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="space-y-5">
          {VALUE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 hover:border-brand-500/30 transition-all overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${item.color}`}
                />

                <div className="relative flex flex-col md:flex-row md:items-start gap-5">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 md:h-8 md:w-8 text-brand-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-[10px] md:text-xs font-bold text-brand-300 uppercase tracking-widest bg-brand-500/10 border border-brand-500/20 rounded-full px-3 py-1">
                        {item.badge}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white">{item.title}</h3>
                    </div>

                    <p className="text-white/70 leading-relaxed mb-4 text-sm md:text-base">
                      {item.what}
                    </p>

                    {/* Beginner benefit - HIGHLIGHTED */}
                    <div className="bg-gradient-to-br from-brand-950/40 to-transparent border-r-2 border-brand-500 pr-4 py-3 mb-2">
                      <p className="text-[10px] font-bold text-brand-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <IconArrowLeft className="h-3 w-3" />
                        ليه ده يفرق معاك:
                      </p>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed">
                        {item.forBeginner}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 md:text-left md:min-w-[110px]">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                      قيمته
                    </p>
                    <p className="text-white/30 line-through font-mono text-base">
                      {typeof item.value === "number" ? `${item.value} ج` : item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 relative bg-gradient-to-br from-brand-900/50 via-brand-950/70 to-black border-2 border-brand-500/40 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-700/30 rounded-full blur-3xl" />

          <div className="relative">
            <p className="text-white/40 line-through text-lg md:text-xl mb-2">
              قيمة فعلية: {totalValue.toLocaleString("ar-EG")} ج شهرياً
            </p>
            <p className="text-5xl md:text-7xl font-black mb-3">
              <span className="bg-gradient-to-r from-brand-200 via-brand-400 to-brand-500 bg-clip-text text-transparent">
                199 ج
              </span>
            </p>
            <p className="text-base md:text-lg text-white/60 mb-1">
              للشهر الأول بالـ <strong className="text-brand-300">Early Bird</strong>
            </p>
            <p className="text-xs text-white/40">
              يجدد على السعر العادي (349 ج) — تقدر تكنسل قبل ما يتجدد
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
