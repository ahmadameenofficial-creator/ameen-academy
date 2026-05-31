// =====================================================
// Gemini (Google AI Studio) — wrapper خفيف بـ raw fetch (بدون مكتبة)
// كل النداءات server-side فقط. لو مفيش مفتاح، الدوال بترجع null بأمان
// والمحرك بيكمّل بالقوالب.
// ملاحظة: يُستورد من كود server-side فقط (API routes / server components).
// =====================================================

const API_KEY = process.env.GEMINI_API_KEY;
const TEXT_MODEL = "gemini-2.5-flash";
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export function isGeminiEnabled(): boolean {
  return Boolean(API_KEY);
}

interface GeminiTextResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
}

async function callGemini(model: string, body: unknown): Promise<string | null> {
  if (!API_KEY) return null;
  const res = await fetch(`${BASE}/${model}:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // مهلة معقولة عشان مهلة Vercel functions
    signal: AbortSignal.timeout(45000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as GeminiTextResponse;
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

/**
 * إعادة صياغة سيناريو البريف بنبرة عميل حقيقي بالعامية المصرية.
 * بيرجع null لو مفيش مفتاح أو حصل أي خطأ — المحرك بيكمّل بالقالب.
 */
export async function rewriteScenario(baseScenario: string, brandTone: string): Promise<string | null> {
  const prompt = `إنت عميل مصري بتكلّم مصمم جرافيك بالعامية المصرية. خد البريف ده وأعيد صياغته كأنه رسالة واتساب حقيقية منك ليه — طبيعية، فيها شوية تفاصيل عن مشروعك، بنبرة "${brandTone}". خليها مقنعة وواقعية ومن غير أي رموز تعبيرية (emojis). البريف:\n\n${baseScenario}\n\nاكتب الرسالة بس، من غير أي مقدمة.`;

  return callGemini(TEXT_MODEL, {
    contents: [{ parts: [{ text: prompt }] }],
    // thinkingBudget: 0 يقفل "التفكير الداخلي" بتاع 2.5-flash عشان ميستهلكش
    // حد التوكنز ويقطع النص. مش محتاجين تفكير لإعادة صياغة بسيطة.
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 800,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });
}

// إثراء البريف: رسالة عميل + 3 أقسام شرح تساعد المصمم يفهم البراند والعميل
export interface BriefEnrichment {
  scenario: string; // رسالة العميل بنبرته (بتحل محل القالب)
  brandStory: string; // قصة البراند: مين هو، ليه اتعمل، إيه اللي يميّزه
  customerInsight: string; // العميل المستهدف: مين، بيدوّر على إيه، إيه اللي يوقفه
  designRationale: string; // توجيه للمصمم: إيه اللي يخلّي التصميم ناجح والزاوية الإبداعية
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
}

/**
 * بيطلّع بريف غني ومتنوّع: رسالة العميل + شرح للبراند والعميل وتوجيه التصميم.
 * بيرجع JSON منظّم. أي خطأ/تجاوز كوتة → null والمحرك بيكمّل بالقالب.
 */
export async function enrichBrief(ctx: EnrichContext): Promise<BriefEnrichment | null> {
  if (!API_KEY) return null;

  const typeLabel =
    ctx.type === "LOGO"
      ? "تصميم شعار"
      : ctx.type === "SOCIAL_POST"
        ? "حملة سوشيال ميديا"
        : "هوية بصرية كاملة";

  const prompt = `إنت مدير إبداعي مصري محترف بتجهّز بريف تصميم حقيقي لمصمم. النوع المطلوب: ${typeLabel}.

معلومات المشروع:
- العميل: ${ctx.clientName}، صاحب «${ctx.clientBusiness}»
- المجال: ${ctx.category}
- جوهر البراند: ${ctx.essence}
- الجمهور: ${ctx.audience}
- وضع السوق والمنافسين: ${ctx.competitors}
- نبرة البراند: ${ctx.brandTone}
- المطلوب: ${ctx.goal}

اطلّع بريف غني ومتنوّع (متكررش نفس الكلام). رد بصيغة JSON فقط، من غير أي نص قبله أو بعده، بالشكل ده بالظبط:
{
  "scenario": "رسالة واتساب حقيقية من العميل للمصمم بالعامية المصرية، بنبرة ${ctx.brandTone}، فيها تفاصيل عن المشروع وإيه اللي محتاجه. طبيعية ومقنعة.",
  "brandStory": "فقرة قصيرة (٢-٣ جمل) عن البراند: قصته، ليه اتعمل، وإيه اللي يميّزه عن المنافسين.",
  "customerInsight": "فقرة قصيرة (٢-٣ جمل) عن العميل المستهدف: مين هو بالظبط، بيدوّر على إيه، وإيه اللي بيوقفه قدام التصميم ويخليه يتفاعل.",
  "designRationale": "فقرة قصيرة (٢-٣ جمل) توجيه للمصمم: إيه اللي يخلّي التصميم ده ناجح، الزاوية الإبداعية المقترحة، وإيه اللي لازم يتجنّبه."
}
كل النصوص بالعامية المصرية ومن غير أي رموز تعبيرية (emojis).`;

  const text = await callGemini(TEXT_MODEL, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.95,
      maxOutputTokens: 1400,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });
  if (!text) return null;

  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]) as Partial<BriefEnrichment>;
    if (!parsed.scenario || parsed.scenario.trim().length === 0) return null;
    return {
      scenario: parsed.scenario.trim(),
      brandStory: (parsed.brandStory ?? "").trim(),
      customerInsight: (parsed.customerInsight ?? "").trim(),
      designRationale: (parsed.designRationale ?? "").trim(),
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
    const res = await fetch(`${BASE}/${TEXT_MODEL}:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: imageBase64 } },
            ],
          },
        ],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1000, thinkingConfig: { thinkingBudget: 0 } },
      }),
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GeminiTextResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
