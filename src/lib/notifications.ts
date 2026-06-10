import { prisma } from "@/lib/prisma";
import type { NotificationType } from "@prisma/client";
import { sendPushToUser, broadcastPush } from "@/lib/push";

// ============ نظام الإشعارات الموحّد ============
// كل إشعار شخصي بيتسجّل in-app + بيطير Web Push لكل أجهزة المستخدم.
// الإشعارات الجماعية (بوست/كورس/مقال جديد) push فقط — عشان منملاش
// جدول الإشعارات بآلاف الصفوف المكررة، والمحتوى أصلاً ظاهر في الموقع.

/** قصّ النص لمعاينة قصيرة تليق بالإشعار */
function snippet(text: string, max = 90) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  link,
}: {
  userId: string;
  type: NotificationType;
  title: string;
  message?: string;
  link?: string;
}) {
  const notification = await prisma.notification.create({
    data: { userId, type, title, message, link },
  });

  // الـ push بيتجدول بعد الرد (after) — مش بيعطّل ولا بيتقتل على Vercel
  sendPushToUser(userId, {
    title,
    body: message,
    link: link || "/dashboard",
    tag: `${type}:${userId}`,
  });

  return notification;
}

// ============ إشعارات شخصية ============

export async function notifyPaymentApproved(userId: string, courseTitle: string) {
  return createNotification({
    userId,
    type: "PAYMENT_SUCCESS",
    title: "اشتراكك اتفعّل",
    message: `دفعتك اتأكدت — كورس "${courseTitle}" مفتوح قدامك دلوقتي. يلا نبدأ`,
    link: "/dashboard",
  });
}

export async function notifyNewComment(
  postOwnerId: string,
  commenterName: string,
  commentText?: string
) {
  return createNotification({
    userId: postOwnerId,
    type: "COMMENT",
    title: `${commenterName} علّق على منشورك`,
    message: commentText ? `"${snippet(commentText)}"` : "خش شوف قال إيه ورد عليه",
    link: "/community",
  });
}

export async function notifyCommentReply(
  parentCommentOwnerId: string,
  replierName: string,
  replyText?: string
) {
  return createNotification({
    userId: parentCommentOwnerId,
    type: "COMMENT",
    title: `${replierName} ردّ على تعليقك`,
    message: replyText ? `"${snippet(replyText)}"` : "في رد جديد مستنيك",
    link: "/community",
  });
}

// ============ إشعارات جماعية (push فقط — لكل المشتركين) ============

// مهلة بين إشعارات البوستات — عشان الكوميونتي النشط ميتحوّلش لمدفع سبام
// والناس تشيل إذن الإشعارات (اللي مبيرجعش تاني)
const POST_BROADCAST_COOLDOWN_MIN = 30;

/** أي حد نشر بوست في الكوميونتي — بيوصل للكل ما عدا صاحب البوست */
export async function broadcastNewPost(
  authorId: string,
  authorName: string,
  postContent: string,
  hasImage = false
) {
  // لو اتنشر بوست تاني خلال آخر نص ساعة يبقى الناس لسه واخدة إشعار — نسكت
  // (البوست الحالي نفسه محسوب، عشان كده الحد أكبر من 1)
  const since = new Date(Date.now() - POST_BROADCAST_COOLDOWN_MIN * 60 * 1000);
  const recentPosts = await prisma.post.count({
    where: { createdAt: { gte: since } },
  });
  if (recentPosts > 1) return;

  broadcastPush(
    {
      title: `${authorName} نشر في الكوميونتي`,
      body: postContent.trim()
        ? `"${snippet(postContent)}"`
        : hasImage
          ? "شارك صورة جديدة — خش شوفها"
          : "",
      link: "/community",
      tag: "community-post", // البوستات المتتالية بتستبدل بعضها — مفيش إزعاج
    },
    { excludeUserId: authorId }
  );
}

/** كورس جديد نزل — أهم إشعار بيزنس في المنصة */
export async function broadcastNewCourse(courseTitle: string, courseSlug: string) {
  return broadcastPush({
    title: "كورس جديد نزل على المنصة",
    body: `"${courseTitle}" متاح من دلوقتي — خش شوفه قبل ما السعر يتغير`,
    link: `/courses/${courseSlug}`,
    tag: "new-course",
  });
}

/** مقال جديد على المدونة */
export async function broadcastNewArticle(articleTitle: string, articleSlug: string) {
  return broadcastPush({
    title: "مقال جديد مستنيك",
    body: snippet(articleTitle, 100),
    link: `/blog/${articleSlug}`,
    tag: "new-article",
  });
}
