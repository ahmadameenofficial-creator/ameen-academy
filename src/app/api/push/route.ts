import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// ============ تسجيل/إلغاء اشتراك جهاز في الإشعارات ============

// خدمات الـ push الشرعية بس — من غير القايمة دي أي مستخدم يقدر يسجّل
// أي URL والسيرفر هيبعتله POST في كل broadcast (ثغرة SSRF)
const PUSH_SERVICES = [
  ".googleapis.com", // كروم/أندرويد (FCM)
  ".push.apple.com", // سفاري/آيفون
  ".push.services.mozilla.com", // فايرفوكس
  ".notify.windows.com", // إيدج (WNS)
];

function isTrustedPushEndpoint(endpoint: string): boolean {
  try {
    const url = new URL(endpoint);
    return (
      url.protocol === "https:" &&
      PUSH_SERVICES.some((s) => url.hostname.endsWith(s))
    );
  } catch {
    return false;
  }
}

const subscribeSchema = z.object({
  endpoint: z.string().url().max(1000).refine(isTrustedPushEndpoint, {
    message: "endpoint مش من خدمة push معروفة",
  }),
  keys: z.object({
    p256dh: z.string().min(1).max(300),
    auth: z.string().min(1).max(100),
  }),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = subscribeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "بيانات الاشتراك مش صالحة" }, { status: 400 });
    }

    const { endpoint, keys } = result.data;
    const userAgent = req.headers.get("user-agent")?.slice(0, 255) || null;

    // upsert بالـ endpoint — لو نفس الجهاز سجّل تاني (أو بمستخدم مختلف) بنحدّث مش بنكرر
    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: {
        userId: session.user.id,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent,
      },
      update: {
        userId: session.user.id,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة، جرّب تاني" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const endpoint = typeof body?.endpoint === "string" ? body.endpoint : null;
    if (!endpoint) {
      return NextResponse.json({ error: "endpoint مطلوب" }, { status: 400 });
    }

    // بيمسح اشتراك المستخدم نفسه بس — محدش يقدر يلغي اشتراك غيره
    await prisma.pushSubscription.deleteMany({
      where: { endpoint, userId: session.user.id },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة، جرّب تاني" }, { status: 500 });
  }
}
