// =====================================================
// Gemini (Google AI Studio) — wrapper خفيف بـ raw fetch (بدون مكتبة)
// كل النداءات server-side فقط. لو مفيش مفتاح، الدوال بترجع null بأمان
// والمحرك بيكمّل بالقوالب.
// ملاحظة: يُستورد من كود server-side فقط (API routes / server components).
// =====================================================

const API_KEY = process.env.GEMINI_API_KEY;
const TEXT_MODEL = "gemini-2.0-flash";
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
    generationConfig: { temperature: 0.9, maxOutputTokens: 600 },
  });
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
        generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
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
