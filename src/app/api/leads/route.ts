import { NextResponse } from "next/server";
import { leadsDb } from "@/lib/db";
import { leadSchema } from "@/lib/validations/lead";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { handleApiError, ValidationError, RateLimitError } from "@/lib/errors";

// تسجيل lead جديد (مهتم بالكورس المجاني) — endpoint عام
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(`lead:${ip}`, RATE_LIMITS.register);
    if (!rl.success) throw new RateLimitError("سجّلت قبل كده، استنى شوية");

    const body = await req.json();
    const result = leadSchema.safeParse(body);
    if (!result.success) {
      throw new ValidationError(result.error.errors[0].message);
    }

    const { name, phone, email, source } = result.data;
    const cleanEmail = email || undefined;
    const cleanPhone = phone || undefined;

    // ميكررش نفس الشخص
    const existing = await leadsDb.findExistingLead(cleanEmail, cleanPhone);
    if (existing) {
      return NextResponse.json({ message: "إنت مسجّل معانا بالفعل — هتكون أول واحد ياخده" });
    }

    await leadsDb.createLead({
      name,
      phone: cleanPhone,
      email: cleanEmail,
      source: source || "free-course",
    });

    return NextResponse.json({ message: "تمام! هتكون أول واحد ياخد الكورس أول ما ينزل" });
  } catch (error) {
    return handleApiError(error);
  }
}
