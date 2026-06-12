// =====================================================
// كاش بسيط للبريفات المولّدة بالـ AI — بيوفّر كوتة Gemini
// الفكرة: نحتفظ بمخزون متنوّع لكل (نوع/مستوى)، ونخدم منه أحياناً بدل
// ما نضرب Gemini كل مرة. التنوّع بيفضل عالي لأن المخزون فيه بريفات مختلفة.
// ملاحظة: in-memory لكل instance على Vercel — best-effort، مش مصدر حقيقة.
// =====================================================

import type { GeneratedBrief } from "./engine";

const MAX_POOL = 24; // أقصى عدد بريفات مخزّنة لكل (نوع/مستوى)
const MIN_POOL_TO_SERVE = 6; // مايخدمش من الكاش غير لما المخزون يدفّى
const SERVE_PROBABILITY = 0.4; // احتمال الخدمة من الكاش لو المخزون كفاية

const pool = new Map<string, GeneratedBrief[]>();

function keyOf(type: string, level: string): string {
  return `${type}:${level}`;
}

/**
 * بيرجّع بريف AI من المخزون لو المخزون دفّى وطلع الاحتمال،
 * وإلا بيرجّع null عشان المحرك ينده Gemini.
 * البريف اللي بيتقدّم بيتشال من المخزون — كل بريف بيتخدم مرة واحدة بس
 * عشان مفيش مستخدم يشوف نفس البريف مرتين.
 */
export function getCachedBrief(type: string, level: string): GeneratedBrief | null {
  const list = pool.get(keyOf(type, level));
  if (!list || list.length < MIN_POOL_TO_SERVE) return null;
  if (Math.random() > SERVE_PROBABILITY) return null;
  const [served] = list.splice(Math.floor(Math.random() * list.length), 1);
  return served ?? null;
}

/** بيخزّن بريف AI ناجح في المخزون (بحد أقصى MAX_POOL لكل مفتاح). */
export function cacheBrief(brief: GeneratedBrief): void {
  if (brief.source !== "AI") return;
  const k = keyOf(brief.type, brief.level);
  const list = pool.get(k) ?? [];
  list.push(brief);
  if (list.length > MAX_POOL) list.shift(); // نشيل الأقدم
  pool.set(k, list);
}
