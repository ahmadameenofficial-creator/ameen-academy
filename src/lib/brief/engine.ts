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
  DEADLINES_BY_TYPE,
  DELIVERABLES,
  TITLE_TEMPLATES,
  DOS_BANK,
  DONTS_BANK,
  DOS_BY_TYPE,
  MUST_INCLUDE_BY_TYPE,
  TEASER_POSTS,
  URGENCY_POSTS,
  VALUE_POSTS,
  type BusinessSeed,
  type Campaign,
} from "./banks";
import { enrichBrief, isGeminiEnabled } from "@/lib/gemini";
import { getCachedBrief, cacheBrief } from "./ai-cache";

// النصوص الجاهزة اللي بتتحط على التصميم (Text On Visuals)
export interface BriefCopy {
  headline: string;
  subline: string;
  cta: string;
  hashtag: string;
}

// بوست واحد ضمن حملة السوشيال
export interface SocialCampaignPost {
  role: string; // دور البوست في الحملة (تشويق/إعلان/قيمة/استعجال)
  headline: string;
  subline: string;
  cta: string;
}

// حملة سوشيال ميديا كاملة من 4 بوستات مترابطة
export interface SocialCampaign {
  theme: string; // ثيم/مناسبة الحملة
  hashtag: string; // الهاشتاج الموحّد لكل الحملة
  posts: SocialCampaignPost[];
}

export interface BriefDetails {
  goal: string; // الهدف المحدد من التصميم
  keyMessage: string; // الرسالة الأساسية اللي لازم توصل
  copy?: BriefCopy; // النصوص الجاهزة (للهوية كمثال تطبيقي)
  campaign?: SocialCampaign; // حملة الـ4 بوستات (للسوشيال ميديا)
  brandStory?: string; // قصة البراند ومميزاته (AI)
  customerInsight?: string; // تحليل العميل المستهدف (AI)
  designRationale?: string; // توجيه التصميم والزاوية الإبداعية (AI)
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

  // كاش الـ AI: لو فيه مخزون بريفات AI كفاية نخدم منه أحياناً ونوفّر نداء Gemini.
  // مانعملش كده لو المستخدم طلب مجال معيّن — عشان نحافظ على الصلة بطلبه.
  if (useAI && isGeminiEnabled() && !category) {
    const cached = getCachedBrief(type, level);
    if (cached) return cached;
  }

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

  const deadline = pick(DEADLINES_BY_TYPE[type][level]);
  // الألوان الممنوعة تظهر من المستوى المتوسط فأعلى
  const forbiddenColor = level === "BEGINNER" ? undefined : pick(FORBIDDEN_COLORS);

  const title = pick(TITLE_TEMPLATES[type]).replace("{business}", clientBusiness);
  const deliverables = DELIVERABLES[type];

  // الهدف والرسالة حسب النوع
  const { goal, keyMessage, copy, campaignPlan } = buildObjective({
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
    deadline,
    forbiddenColor,
    type,
  });

  let scenario = baseScenario;
  let source: "TEMPLATE" | "AI" = "TEMPLATE";
  let brandStory: string | undefined;
  let customerInsight: string | undefined;
  let designRationale: string | undefined;
  let finalCampaign = campaignPlan;

  // طبقة الـ AI — بتثري البريف بشرح حقيقي عن البراند والعميل وتوجيه التصميم،
  // وبتولّد حملة سوشيال بزوايا متنوّعة وTOV بشري. أي مشكلة → نرجع للقالب.
  if (useAI && isGeminiEnabled()) {
    try {
      const enriched = await enrichBrief({
        clientName,
        clientBusiness,
        category: business.category,
        audience: business.audience,
        competitors: business.competitors,
        essence,
        brandTone,
        goal,
        type,
        occasion: campaign.occasion,
      });
      if (enriched) {
        scenario = enriched.scenario;
        brandStory = enriched.brandStory || undefined;
        customerInsight = enriched.customerInsight || undefined;
        designRationale = enriched.designRationale || undefined;
        source = "AI";
        // لو الـ AI طلّع حملة كاملة نستخدمها بدل قالب المكتبة (للسوشيال)
        if (type === "SOCIAL_POST" && enriched.campaign && enriched.campaign.posts.length > 0) {
          finalCampaign = {
            theme: enriched.campaign.theme || campaign.occasion,
            hashtag: enriched.campaign.hashtag || campaign.hashtag,
            posts: enriched.campaign.posts.map((p, i) => ({
              role: p.role || `البوست ${i + 1}`,
              headline: p.headline,
              subline: p.subline,
              cta: p.cta,
            })),
          };
        }
      }
    } catch {
      // fallback صامت للقالب — المنصة ماتقفش أبداً
    }
  }

  const generated: GeneratedBrief = {
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
      deadline,
      forbiddenColor,
      notes: persona.trait,
    },
    deliverables,
    details: {
      goal,
      keyMessage,
      copy,
      campaign: finalCampaign,
      brandStory,
      customerInsight,
      designRationale,
      mustInclude,
      moodKeywords,
      dos,
      donts,
    },
  };

  // نخزّن نسخ الـ AI الناجحة في المخزون عشان نعيد استخدامها ونوفّر كوتة
  if (source === "AI" && !category) cacheBrief(generated);

  return generated;
}

// الهدف + الرسالة + النصوص الجاهزة حسب النوع
function buildObjective(p: {
  type: BriefType;
  clientBusiness: string;
  category: string;
  essence: string;
  campaign: Campaign;
}): { goal: string; keyMessage: string; copy?: BriefCopy; campaignPlan?: SocialCampaign } {
  switch (p.type) {
    case "SOCIAL_POST":
      return {
        goal: `حملة سوشيال ميديا متكاملة من 4 بوستات مترابطة تروّج لـ«${p.campaign.occasion}»، تبني تفاعل متصاعد من التشويق للعرض للاستعجال، وتجيب عملاء فعليين لـ${p.clientBusiness}`,
        keyMessage: `${p.campaign.headline} — ${p.campaign.subline}`,
        campaignPlan: buildSocialCampaign(p.campaign, p.essence, p.clientBusiness),
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

// بناء حملة سوشيال من 4 بوستات (fallback القالب): افتتاح متنوّع → كشف العرض
// → قيمة/إثبات → ختام/استعجال. الأدوار بتتنوّع عشوائياً عشان البريفات ماتتكررش.
function buildSocialCampaign(
  campaign: Campaign,
  essence: string,
  clientBusiness: string
): SocialCampaign {
  const opener = pick(TEASER_POSTS);
  const value = pick(VALUE_POSTS);
  const closer = pick(URGENCY_POSTS);

  const fill = (s: string) =>
    s.replace("{occasion}", campaign.occasion).replace("{business}", clientBusiness).replace("{essence}", essence);

  return {
    theme: campaign.occasion,
    hashtag: campaign.hashtag,
    posts: [
      {
        role: `البوست 1 — ${opener.role}`,
        headline: fill(opener.post.headline),
        subline: fill(opener.post.subline),
        cta: opener.post.cta,
      },
      {
        role: "البوست 2 — الكشف عن العرض",
        headline: campaign.headline,
        subline: campaign.subline,
        cta: campaign.cta,
      },
      {
        role: `البوست 3 — ${value.role}`,
        headline: fill(value.post.headline),
        subline: fill(value.post.subline),
        cta: value.post.cta,
      },
      {
        role: `البوست 4 — ${closer.role}`,
        headline: fill(closer.post.headline),
        subline: fill(closer.post.subline),
        cta: campaign.cta,
      },
    ],
  };
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
    `التسليم خلال ${p.deadline}.`,
  ];
  if (p.forbiddenColor) {
    lines.push(`ملاحظة مهمة: مش عايز ${p.forbiddenColor} خالص في التصميم.`);
  }
  lines.push("بصّ على التفاصيل تحت — كتبتلك كل اللي محتاجه. اللي عايز توضيح فيه ابعتلي.");
  return lines.join("\n");
}
