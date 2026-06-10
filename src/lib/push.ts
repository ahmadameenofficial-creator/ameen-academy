import webpush from "web-push";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";

// ============ Web Push — إرسال إشعارات للأجهزة المشتركة ============
// بنبعت مباشرة لسيرفرات جوجل/أبل/موزيلا بمفاتيح VAPID — مفيش وسيط ولا تكلفة.

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:support@ameen.academy";

const pushConfigured = !!(VAPID_PUBLIC && VAPID_PRIVATE);
if (pushConfigured) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC!, VAPID_PRIVATE!);
} else {
  console.warn("[push] مفاتيح VAPID مش متظبطة — الإشعارات متعطّلة");
}

export interface PushPayload {
  title: string;
  body?: string;
  /** الصفحة اللي بتتفتح لما المستخدم يدوس على الإشعار */
  link?: string;
  /** إشعارات بنفس الـ tag بتستبدل بعضها بدل ما تتكدّس (مثلاً: تعليقات نفس البوست) */
  tag?: string;
}

interface StoredSubscription {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}

/** إرسال لاشتراك واحد — لو الجهاز شال الاشتراك (410/404) بنمسحه من عندنا */
async function deliver(sub: StoredSubscription, payload: PushPayload): Promise<boolean> {
  try {
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      },
      JSON.stringify(payload),
      { TTL: 60 * 60 * 24 } // الإشعار يستنى يوم لو الجهاز مقفول، بعدها يسقط
    );
    return true;
  } catch (err) {
    const statusCode = (err as { statusCode?: number })?.statusCode;
    // الاشتراك مات (المستخدم شال الإذن أو غيّر المتصفح) — تنظيف صامت
    if (statusCode === 404 || statusCode === 410) {
      await prisma.pushSubscription
        .delete({ where: { id: sub.id } })
        .catch(() => {});
    }
    return false;
  }
}

/** إرسال على دفعات — عشان منفتحش مئات الاتصالات مرة واحدة على Vercel */
async function deliverBatch(subs: StoredSubscription[], payload: PushPayload) {
  const BATCH = 50;
  for (let i = 0; i < subs.length; i += BATCH) {
    await Promise.allSettled(subs.slice(i, i + BATCH).map((s) => deliver(s, payload)));
  }
}

/**
 * إشعار شخصي — بيوصل لكل أجهزة المستخدم (موبايل + لاب).
 * الإرسال بيتجدول بـ after() — Vercel بيخلّي الـ function عايشة بعد الرد،
 * فالإشعار مضمون يكمّل من غير ما يبطّأ الـ response.
 */
export function sendPushToUser(userId: string, payload: PushPayload) {
  if (!pushConfigured) return;
  after(async () => {
    const subs = await prisma.pushSubscription.findMany({
      where: { userId },
      select: { id: true, endpoint: true, p256dh: true, auth: true },
    });
    if (subs.length === 0) return;
    await deliverBatch(subs, payload);
  });
}

/** إشعار جماعي لكل المشتركين — للبوستات والكورسات والمقالات الجديدة */
export function broadcastPush(
  payload: PushPayload,
  options?: { excludeUserId?: string }
) {
  if (!pushConfigured) return;
  after(async () => {
    const subs = await prisma.pushSubscription.findMany({
      where: options?.excludeUserId ? { userId: { not: options.excludeUserId } } : undefined,
      select: { id: true, endpoint: true, p256dh: true, auth: true },
    });
    if (subs.length === 0) return;
    await deliverBatch(subs, payload);
  });
}
