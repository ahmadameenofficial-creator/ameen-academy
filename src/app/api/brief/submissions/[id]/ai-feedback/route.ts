import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { analyzeSubmission, isGeminiEnabled } from "@/lib/gemini";
import { badRequest, unauthorized } from "@/lib/admin-api";

export const maxDuration = 60;

const MAX_IMAGE_BYTES = 6 * 1024 * 1024; // 6MB سقف للصورة قبل تحويلها

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  const { id } = await params;

  const submission = await prisma.briefSubmission.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      imageUrl: true,
      aiScore: true,
      aiFeedback: true,
      brief: { select: { slug: true, title: true, scenario: true } },
    },
  });

  if (!submission) return badRequest("الحل مش موجود");

  // أمان: صاحب الحل بس يقدر يطلب فيدباك AI (تحكّم في التكلفة ومنع إساءة الاستخدام)
  if (submission.userId !== session.user.id) return unauthorized();

  // كاش: لو فيه فيدباك قبل كده، رجّعه من غير ما ننده Gemini تاني
  if (submission.aiScore !== null && submission.aiFeedback) {
    return NextResponse.json({ cached: true, ...(submission.aiFeedback as object), score: submission.aiScore });
  }

  if (!isGeminiEnabled()) {
    return NextResponse.json(
      { error: "خدمة الـ AI مش متاحة حالياً. جرّب بعدين أو استنى فيدباك خبير." },
      { status: 503 }
    );
  }

  // تحميل الصورة من Bunny وتحويلها base64
  let imageBase64: string;
  let mimeType: string;
  try {
    const imgRes = await fetch(submission.imageUrl, { signal: AbortSignal.timeout(20000) });
    if (!imgRes.ok) throw new Error();
    mimeType = imgRes.headers.get("content-type") ?? "image/jpeg";
    if (!mimeType.startsWith("image/")) throw new Error();
    const buf = await imgRes.arrayBuffer();
    if (buf.byteLength > MAX_IMAGE_BYTES) {
      return badRequest("الصورة كبيرة على التحليل");
    }
    imageBase64 = Buffer.from(buf).toString("base64");
  } catch {
    return NextResponse.json({ error: "تعذّر تحميل صورة الحل" }, { status: 502 });
  }

  const summary = `${submission.brief.title}. ${submission.brief.scenario}`.slice(0, 1500);
  const feedback = await analyzeSubmission(imageBase64, mimeType, summary);

  if (!feedback) {
    return NextResponse.json(
      { error: "تعذّر توليد الفيدباك دلوقتي. جرّب تاني بعد شوية." },
      { status: 502 }
    );
  }

  // حفظ النتيجة (كاش دائم)
  await prisma.briefSubmission.update({
    where: { id: submission.id },
    data: { aiScore: feedback.score, aiFeedback: { ...feedback } },
  });

  revalidatePath(`/brief/${submission.brief.slug}`);

  return NextResponse.json({ cached: false, ...feedback });
}
