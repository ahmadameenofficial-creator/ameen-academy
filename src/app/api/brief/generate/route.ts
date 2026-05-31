import { NextResponse } from "next/server";
import { z } from "zod";
import { generateBrief } from "@/lib/brief/engine";
import { badRequest } from "@/lib/admin-api";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

// نداء الـ AI ممكن ياخد وقت — نوسّع مهلة الـ function على Vercel
export const maxDuration = 60;

const schema = z.object({
  type: z.enum(["LOGO", "SOCIAL_POST", "BRAND_IDENTITY"]),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "PRO"]),
  category: z.string().optional(),
  useAI: z.boolean().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("طلب غير صالح");
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return badRequest(result.error.errors[0]?.message ?? "بيانات غير صالحة");
  }

  // التوليد من القالب مجاني وفوري. الـ AI بس هو اللي بينده Gemini ويكلّف كوتة،
  // فنحط عليه حد لكل IP — ولو اتعدّى نرجّع للقالب بهدوء بدل ما نرفض الطلب.
  const opts = { ...result.data };
  if (opts.useAI) {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(`brief-ai:${ip}`, RATE_LIMITS.briefAI);
    if (!rl.success) opts.useAI = false;
  }

  const brief = await generateBrief(opts);
  return NextResponse.json({ brief });
}
