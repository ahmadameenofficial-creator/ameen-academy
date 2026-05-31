// =====================================================
// منصة البريف — المحرك الهجين
// بيركّب بريف احترافي من القوالب (مجاني/فوري)، ويستخدم Gemini عند الطلب مع fallback
// =====================================================

import type { BriefType, BriefLevel } from "@prisma/client";
import {
  BUSINESSES,
  CLIENT_NAMES,
  CLIENT_PERSONAS,
  FORBIDDEN_COLORS,
  BUDGETS,
  DEADLINES_BY_TYPE,
  DELIVERABLES,
  TITLE_TEMPLATES,
  DOS_BANK,
  DONTS_BANK,
  DOS_BY_TYPE,
  MUST_INCLUDE_BY_TYPE,
  type BusinessSeed,
  type Campaign,
} from "./banks";
import { rewriteScenario, isGeminiEnabled } from "@/lib/gemini";

// النصوص الجاهزة اللي بتتحط على التصميم (Text On Visuals)
export interface BriefCopy {
  headline: string;
  subline: string;
  cta: string;
  hashtag: string;
}

export interface BriefDetails {
  goal: string; // الهدف المحدد من التصميم
  keyMessage: string; // الرسالة الأساسية اللي لازم توصل
  copy?: BriefCopy; // النصوص الجاهزة (للسوشيال أساساً)
  mustInclude: string[]; // عناصر لازم تظهر
  moodKeywords: string[]; // الاتجاه البصري
  dos: string[]; // افعل
  donts: string[]; // لا تفعل
}

export interface GeneratedBrief {
  type: BriefType;
  level: BriefLevel;
  source: "TEMPLATE" | "AI";
  clientName: string;
  clientBusiness: string;
  businessCategory: string;
  title: string;
  scenario: string;
  audience: string;
  brandTone: string;
  constraints: {
    budget: string;
    deadline: string;
    forbiddenColor?: string;
    notes: string;
  };
  deliverables: { name: string; format: string; size: string }[];
  details: BriefDetails;
}

const LEVEL_ORDER: Record<BriefLevel, number> = { BEGINNER: 0, INTERMEDIATE: 1, PRO: 2 };

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// نختار عناصر متعددة عشوائية بدون تكرار
function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length > 0) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

function pickBusiness(category?: string): BusinessSeed {
  if (category) {
    const match = BUSINESSES.find((b) => b.category === category);
    if (match) return match;
  }
  return pick(BUSINESSES);
}

// نعوّض الـ placeholders في نصوص العناصر الإلزامية
function fillTemplate(
  text: string,
  vars: { business: string; category: string; campaign?: Campaign }
): string {
  return text
    .replace("{business}", vars.business)
    .replace("{category}", vars.category)
    .replace("{headline}", vars.campaign?.headline ?? "")
    .replace("{subline}", vars.campaign?.subline ?? "")
    .replace("{cta}", vars.campaign?.cta ?? "")
    .replace("{hashtag}", vars.campaign?.hashtag ?? "");
}

export interface GenerateOptions {
  type: BriefType;
  level: BriefLevel;
  category?: string;
  useAI?: boolean;
}

/**
 * توليد بريف كامل واحترافي. القوالب دايماً تشتغل؛ الـ AI طبقة اختيارية بـ fallback آمن.
 */
export async function generateBrief(opts: GenerateOptions): Promise<GeneratedBrief> {
  const { type, level, category, useAI = false } = opts;

  const business = pickBusiness(category);
  const clientBusiness = pick(business.names);
  const clientName = pick(CLIENT_NAMES);
  const brandTone = pick(business.tones);
  const essence = pick(business.essence);
  const moodKeywords = pick(business.moodSets);

  // الحملة/العرض — أساسي للسوشيال، وبيدّي سياق للأنواع التانية كمان
  const campaign = pick(business.campaigns);

  // شخصية مناسبة للمستوى أو أقل
  const eligiblePersonas = CLIENT_PERSONAS.filter(
    (p) => LEVEL_ORDER[p.minLevel] <= LEVEL_ORDER[level]
  );
  const persona = pick(eligiblePersonas);

  const budget = pick(BUDGETS[level]);
  const deadline = pick(DEADLINES_BY_TYPE[type][level]);
  // الألوان الممنوعة تظهر من المستوى المتوسط فأعلى
  const forbiddenColor = level === "BEGINNER" ? undefined : pick(FORBIDDEN_COLORS);

  const title = pick(TITLE_TEMPLATES[type]).replace("{business}", clientBusiness);
  const deliverables = DELIVERABLES[type];

  // الهدف والرسالة حسب النوع
  const { goal, keyMessage, copy } = buildObjective({
    type,
    clientBusiness,
    category: business.category,
    essence,
    campaign,
  });

  // العناصر الإلزامية (نعوّض الـ placeholders)
  const mustInclude = MUST_INCLUDE_BY_TYPE[type].map((t) =>
    fillTemplate(t, { business: clientBusiness, category: business.category, campaign })
  );

  // افعل / لا تفعل
  const dos = [...DOS_BY_TYPE[type], ...sample(DOS_BANK, 2)];
  const donts = sample(DONTS_BANK, 3);
  if (forbiddenColor) {
    donts.unshift(`ابعد تماماً عن ${forbiddenColor} — العميل بيكرهه`);
  }

  const baseScenario = buildScenario({
    clientName,
    clientBusiness,
    category: business.category,
    audience: business.audience,
    competitors: business.competitors,
    brandTone,
    persona: persona.trait,
    goal,
    budget,
    deadline,
    forbiddenColor,
    type,
  });

  let scenario = baseScenario;
  let source: "TEMPLATE" | "AI" = "TEMPLATE";

  // طبقة الـ AI — اختيارية وآمنة: أي مشكلة → نرجع للقالب
  if (useAI && isGeminiEnabled()) {
    try {
      const rewritten = await rewriteScenario(baseScenario, brandTone);
      if (rewritten && rewritten.trim().length > 0) {
        scenario = rewritten.trim();
        source = "AI";
      }
    } catch {
      // fallback صامت للقالب — المنصة ماتقفش أبداً
    }
  }

  return {
    type,
    level,
    source,
    clientName,
    clientBusiness,
    businessCategory: business.category,
    title,
    scenario,
    audience: business.audience,
    brandTone,
    constraints: {
      budget,
      deadline,
      forbiddenColor,
      notes: persona.trait,
    },
    deliverables,
    details: {
      goal,
      keyMessage,
      copy,
      mustInclude,
      moodKeywords,
      dos,
      donts,
    },
  };
}

// الهدف + الرسالة + النصوص الجاهزة حسب النوع
function buildObjective(p: {
  type: BriefType;
  clientBusiness: string;
  category: string;
  essence: string;
  campaign: Campaign;
}): { goal: string; keyMessage: string; copy?: BriefCopy } {
  switch (p.type) {
    case "SOCIAL_POST":
      return {
        goal: `بوست يروّج لـ«${p.campaign.occasion}» ويجيب تفاعل وعملاء فعليين لـ${p.clientBusiness}`,
        keyMessage: `${p.campaign.headline} — ${p.campaign.subline}`,
        copy: {
          headline: p.campaign.headline,
          subline: p.campaign.subline,
          cta: p.campaign.cta,
          hashtag: p.campaign.hashtag,
        },
      };
    case "LOGO":
      return {
        goal: `لوجو يبقى وش ${p.clientBusiness} ويلخّص فكرته: «${p.essence}»`,
        keyMessage: p.essence,
      };
    case "BRAND_IDENTITY":
      return {
        goal: `هوية بصرية متكاملة لـ${p.clientBusiness} تترجم «${p.essence}» لنظام بصري ثابت`,
        keyMessage: p.essence,
        // مثال تطبيقي للنصوص على نموذج السوشيال ضمن الهوية
        copy: {
          headline: p.campaign.headline,
          subline: p.campaign.subline,
          cta: p.campaign.cta,
          hashtag: p.campaign.hashtag,
        },
      };
  }
}

function buildScenario(p: {
  clientName: string;
  clientBusiness: string;
  category: string;
  audience: string;
  competitors: string;
  brandTone: string;
  persona: string;
  goal: string;
  budget: string;
  deadline: string;
  forbiddenColor?: string;
  type: BriefType;
}): string {
  const lines = [
    `أهلاً، أنا ${p.clientName} صاحب ${p.clientBusiness}.`,
    `إحنا في مجال ${p.category}، وجمهورنا ${p.audience}.`,
    `الوضع في السوق: ${p.competitors}.`,
    `اللي محتاجه منك بالظبط: ${p.goal}.`,
    `وحابب الإحساس العام يكون ${p.brandTone}.`,
    `${p.persona}.`,
    `الميزانية ${p.budget}، والتسليم خلال ${p.deadline}.`,
  ];
  if (p.forbiddenColor) {
    lines.push(`ملاحظة مهمة: مش عايز ${p.forbiddenColor} خالص في التصميم.`);
  }
  lines.push("بصّ على التفاصيل تحت — كتبتلك كل اللي محتاجه. اللي عايز توضيح فيه ابعتلي.");
  return lines.join("\n");
}
