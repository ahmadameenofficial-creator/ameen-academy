// =====================================================
// Gemini (Google AI Studio) — wrapper خفيف بـ raw fetch (بدون مكتبة)
// كل النداءات server-side فقط. لو مفيش مفتاح، الدوال بترجع null بأمان
// والمحرك بيكمّل بالقوالب.
// ملاحظة: يُستورد من كود server-side فقط (API routes / server components).
// =====================================================

const API_KEY = process.env.GEMINI_API_KEY;
// سلسلة موديلات: الأقوى الأول، ولو الكوتة المجانية خلصت (429) ننزل للي بعده.
// flash كوتته المجانية 20 طلب/يوم بس — flash-lite كوتته أعلى بكتير وجودته كافية.
const MODEL_CHAIN = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export function isGeminiEnabled(): boolean {
  return Boolean(API_KEY);
}

interface GeminiTextResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
}

// parts: نص فقط أو نص + صورة (vision) — نفس الشكل اللي الـ API مستنيه
type GeminiParts = ({ text: string } | { inline_data: { mime_type: string; data: string } })[];

async function callGemini(
  parts: GeminiParts,
  generationConfig: Record<string, unknown>
): Promise<string | null> {
  if (!API_KEY) return null;

  for (const model of MODEL_CHAIN) {
    try {
      const res = await fetch(`${BASE}/${model}:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts }], generationConfig }),
        // مهلة معقولة عشان مهلة Vercel functions
        signal: AbortSignal.timeout(45000),
      });

      if (res.ok) {
        const data = (await res.json()) as GeminiTextResponse;
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
        if (text) return text;
        console.error(`[gemini] ${model}: رد فاضي (ممكن truncation أو safety block)`);
        continue;
      }

      // 429 = الكوتة خلصت لليوم — نجرب الموديل اللي بعده في السلسلة
      console.error(`[gemini] ${model}: HTTP ${res.status}${res.status === 429 ? " (كوتة) — بنجرب الموديل التالي" : ""}`);
      if (res.status !== 429) return null;
    } catch (e) {
      console.error(`[gemini] ${model}: ${e instanceof Error ? e.message : "خطأ غير معروف"}`);
      return null;
    }
  }
  return null;
}

/**
 * إعادة صياغة سيناريو البريف بنبرة عميل حقيقي بالعامية المصرية.
 * بيرجع null لو مفيش مفتاح أو حصل أي خطأ — المحرك بيكمّل بالقالب.
 */
export async function rewriteScenario(baseScenario: string, brandTone: string): Promise<string | null> {
  const prompt = `إنت عميل مصري بتكلّم مصمم جرافيك بالعامية المصرية. خد البريف ده وأعيد صياغته كأنه رسالة واتساب حقيقية منك ليه — طبيعية، فيها شوية تفاصيل عن مشروعك، بنبرة "${brandTone}". خليها مقنعة وواقعية ومن غير أي رموز تعبيرية (emojis). البريف:\n\n${baseScenario}\n\nاكتب الرسالة بس، من غير أي مقدمة.`;

  // thinkingBudget: 0 يقفل "التفكير الداخلي" بتاع 2.5 عشان ميستهلكش
  // حد التوكنز ويقطع النص. مش محتاجين تفكير لإعادة صياغة بسيطة.
  return callGemini([{ text: prompt }], {
    temperature: 0.9,
    maxOutputTokens: 800,
    thinkingConfig: { thinkingBudget: 0 },
  });
}

// بوست واحد ضمن حملة سوشيال مولّدة بالـ AI
export interface EnrichedCampaignPost {
  role: string; // زاوية البوست (عد تنازلي/مقارنة/شهادة عميل...)
  headline: string;
  subline: string;
  cta: string;
}

// إثراء البريف: رسالة عميل + 3 أقسام شرح + (للسوشيال) حملة كاملة متنوّعة
export interface BriefEnrichment {
  scenario: string; // رسالة العميل بنبرته (بتحل محل القالب)
  brandStory: string; // قصة البراند: مين هو، ليه اتعمل، إيه اللي يميّزه
  customerInsight: string; // العميل المستهدف: مين، بيدوّر على إيه، إيه اللي يوقفه
  designRationale: string; // توجيه للمصمم: إيه اللي يخلّي التصميم ناجح والزاوية الإبداعية
  campaign?: {
    theme: string;
    hashtag: string;
    posts: EnrichedCampaignPost[];
  };
}

export interface EnrichContext {
  clientName: string;
  clientBusiness: string;
  category: string;
  audience: string;
  competitors: string;
  essence: string;
  brandTone: string;
  goal: string;
  type: string;
  occasion?: string; // مناسبة/سبب الحملة (للسوشيال)
}

// قواعد اللهجة — تتبع في كل النصوص عشان نشيل إحساس الـ AI تماماً
const HUMAN_TONE_RULES = `قواعد الكتابة (مهمة جداً):
- اكتب زي تاجر مصري شاطر بيكلّم زباينه، مش زي روبوت أو إعلان رسمي.
- ممنوع تماماً الكليشيهات الفاضية زي: "في عالمنا اليوم"، "نسعى دائماً"، "الجودة والتميز"، "نحرص على"، "بكل فخر"، "وجهتك الأولى"، "نقدم لكم".
- خلّي الكلام قصير، محدد، وفيه تفصيلة ملموسة (رقم، اسم منتج، موقف حقيقي) — مش وصف عام.
- العناوين تكون hooks بتوقف الـ scroll (سؤال، رقم صادم، تحدّي، فضول)، مش مجرد وصف.
- بلاش علامات تعجب كتير، وبلاش أي رموز تعبيرية (emojis) خالص.
- في رسالة العميل: ابدأ من غير ما تنادي المصمم باسمه، ومتكتبش أبداً أي placeholder زي [اسم المصمم] أو (اسم المصمم) أو [الاسم] — ادخل في الموضوع على طول أو قول "يا فنان/يا مصمم".
- نوّع التراكيب — متبدأش كل جملة بنفس الأسلوب.`;

// مواقف بتتحقن عشوائياً في البرومبت — عشان رسالة العميل تيجي بحكاية مختلفة
// كل مرة حتى لو نفس المجال اتكرر
const SCENARIO_SEEDS = [
  "لسه فاتح من شهر وعايز يبان قبل المنافسين",
  "اتعامل مع مصمم قبلك وطلّع شغل وحش وخايف يتلدغ تاني",
  "شغّال من سنين بس شكله قديم وعايز يجدد جلده",
  "دخل شريك جديد ومعاه فلوس وعايزين يكبروا بسرعة",
  "الموسم الجاي على الأبواب وعايز يلحق يجهز",
  "بيفتح فرع تاني وعايز الشكل يبقى موحّد",
  "شاف منافس ليه شغل أونلاين حلو واتقهر",
  "بدأ من البيت ودلوقتي بينقل لمحل حقيقي",
  "عنده زباين أوفلاين كتير بس مالوش أي وجود أونلاين",
  "بيحضّر لإعلان ممول أول مرة وعايز الشكل يستاهل الفلوس",
];

const CAMPAIGN_ANGLES = `زوايا البوستات المتاحة (اختار 4 مختلفة فعلاً تبني قمع تسويقي مترابط لهذه الحملة بالذات، بلا تكرار):
عد تنازلي للموعد، تشويق غامض، الكشف عن العرض، مقارنة قبل/بعد، شهادة عميل أو قصة نجاح، سؤال أو استفتاء للجمهور، إحصائية أو معلومة صادمة، خلف الكواليس، رد على اعتراض شائع (FAQ)، عرض محدود بكمية أو وقت، آخر فرصة، شرح القيمة (ليه إحنا).`;

/**
 * بيطلّع بريف غني ومتنوّع: رسالة العميل + شرح للبراند والعميل وتوجيه التصميم،
 * وللسوشيال حملة كاملة من 4 بوستات بزوايا متنوّعة وTOV بشري قوي.
 * بيرجع JSON منظّم. أي خطأ/تجاوز كوتة → null والمحرك بيكمّل بالقالب.
 */
export async function enrichBrief(ctx: EnrichContext): Promise<BriefEnrichment | null> {
  if (!API_KEY) return null;

  const isSocial = ctx.type === "SOCIAL_POST";
  const typeLabel =
    ctx.type === "LOGO"
      ? "تصميم شعار"
      : isSocial
        ? "حملة سوشيال ميديا"
        : "هوية بصرية كاملة";

  const campaignBlock = isSocial
    ? `,
  "campaign": {
    "theme": "ثيم/مناسبة الحملة في جملة",
    "hashtag": "هاشتاج موحّد بالعربي يبدأ بـ # من غير مسافات",
    "posts": [
      { "role": "زاوية البوست 1", "headline": "عنوان hook قوي", "subline": "سطر داعم محدد", "cta": "دعوة فعل" },
      { "role": "زاوية البوست 2", "headline": "...", "subline": "...", "cta": "..." },
      { "role": "زاوية البوست 3", "headline": "...", "subline": "...", "cta": "..." },
      { "role": "زاوية البوست 4", "headline": "...", "subline": "...", "cta": "..." }
    ]
  }`
    : "";

  const prompt = `إنت مدير إبداعي مصري محترف بتجهّز بريف تصميم حقيقي لمصمم هيحطه في البورتفوليو بتاعه. النوع المطلوب: ${typeLabel}.

معلومات المشروع:
- العميل: ${ctx.clientName}، صاحب «${ctx.clientBusiness}»
- المجال: ${ctx.category}
- جوهر البراند: ${ctx.essence}
- الجمهور: ${ctx.audience}
- وضع السوق والمنافسين: ${ctx.competitors}
- نبرة البراند: ${ctx.brandTone}
- المطلوب: ${ctx.goal}${ctx.occasion ? `\n- مناسبة الحملة: ${ctx.occasion}` : ""}
- موقف العميل دلوقتي (ابنِ عليه رسالته وتفاصيلها): ${SCENARIO_SEEDS[Math.floor(Math.random() * SCENARIO_SEEDS.length)]}

${HUMAN_TONE_RULES}
${isSocial ? `\n${CAMPAIGN_ANGLES}\n` : ""}
رد بصيغة JSON فقط، من غير أي نص قبله أو بعده، بالشكل ده بالظبط:
{
  "scenario": "رسالة واتساب حقيقية من العميل للمصمم بالعامية المصرية، بنبرة ${ctx.brandTone}، فيها تفاصيل ملموسة عن المشروع وإيه اللي محتاجه بالظبط.",
  "brandStory": "فقرة قصيرة (٢-٣ جمل) عن البراند: قصته، ليه اتعمل، وإيه اللي يميّزه عن المنافسين بشكل محدد.",
  "customerInsight": "فقرة قصيرة (٢-٣ جمل) عن العميل المستهدف: مين بالظبط، بيدوّر على إيه، وإيه اللي بيوقفه ويخليه يتفاعل.",
  "designRationale": "فقرة قصيرة (٢-٣ جمل) توجيه للمصمم: إيه اللي يخلّي التصميم ناجح، الزاوية الإبداعية، وإيه يتجنّبه."${campaignBlock}
}`;

  const text = await callGemini([{ text: prompt }], {
    temperature: 0.95,
    // الحملة محتاجة توكنز أكتر عشان الـ4 بوستات (العربي توكنز تقيلة)
    maxOutputTokens: isSocial ? 3200 : 1500,
    thinkingConfig: { thinkingBudget: 0 },
  });
  if (!text) return null;

  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]) as Partial<BriefEnrichment>;
    if (!parsed.scenario || parsed.scenario.trim().length === 0) return null;

    // تنظيف رسالة العميل من أي placeholder للاسم لو الموديل حطّه بالغلط
    const cleanScenario = parsed.scenario
      .replace(/[\[\(]\s*(اسم المصمم|الاسم|اسمك|المصمم)\s*[\]\)]/g, "يا فنان")
      .trim();

    let campaign: BriefEnrichment["campaign"];
    if (
      parsed.campaign &&
      Array.isArray(parsed.campaign.posts) &&
      parsed.campaign.posts.length > 0
    ) {
      campaign = {
        theme: (parsed.campaign.theme ?? ctx.occasion ?? "").trim(),
        hashtag: (parsed.campaign.hashtag ?? "").trim(),
        posts: parsed.campaign.posts.slice(0, 4).map((p) => ({
          role: (p?.role ?? "").trim(),
          headline: (p?.headline ?? "").trim(),
          subline: (p?.subline ?? "").trim(),
          cta: (p?.cta ?? "").trim(),
        })),
      };
    }

    return {
      scenario: cleanScenario,
      brandStory: (parsed.brandStory ?? "").trim(),
      customerInsight: (parsed.customerInsight ?? "").trim(),
      designRationale: (parsed.designRationale ?? "").trim(),
      campaign,
    };
  } catch {
    return null;
  }
}

export interface SubmissionFeedback {
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
}

/**
 * تحليل حل مصمم مقابل البريف عبر Gemini vision.
 * imageBase64: الصورة base64 (بدون prefix)، mimeType: نوعها.
 * بيرجع null لو مفيش مفتاح أو خطأ.
 */
export async function analyzeSubmission(
  imageBase64: string,
  mimeType: string,
  briefSummary: string
): Promise<SubmissionFeedback | null> {
  if (!API_KEY) return null;

  const prompt = `إنت مدرّب تصميم محترف. ده بريف: "${briefSummary}". قيّم التصميم المرفق مقابل البريف. رد بصيغة JSON فقط بالشكل ده بالظبط من غير أي نص تاني: {"score": <رقم من 0 ل 100>, "strengths": ["نقطة","نقطة"], "improvements": ["نقطة","نقطة"]}. الملاحظات بالعامية المصرية ومن غير emojis.`;

  try {
    // flash-lite بيدعم vision برضه — نفس سلسلة الـ fallback
    const text = await callGemini(
      [
        { text: prompt },
        { inline_data: { mime_type: mimeType, data: imageBase64 } },
      ],
      { temperature: 0.4, maxOutputTokens: 1000, thinkingConfig: { thinkingBudget: 0 } }
    );
    if (!text) return null;

    // استخراج JSON من الرد
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]) as SubmissionFeedback;
    if (typeof parsed.score !== "number") return null;
    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score))),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 5) : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 5) : [],
    };
  } catch {
    return null;
  }
}
