import { prisma } from "@/lib/prisma";
import type { NotificationType } from "@prisma/client";

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
  return prisma.notification.create({
    data: { userId, type, title, message, link },
  });
}

export async function notifyPaymentApproved(userId: string, courseTitle: string) {
  return createNotification({
    userId,
    type: "PAYMENT_SUCCESS",
    title: "تم تفعيل اشتراكك",
    message: `تم تأكيد دفعك وتقدر دلوقتي تبدأ كورس "${courseTitle}"`,
    link: "/dashboard",
  });
}

export async function notifyNewComment(postOwnerId: string, commenterName: string) {
  return createNotification({
    userId: postOwnerId,
    type: "COMMENT",
    title: "تعليق جديد",
    message: `${commenterName} علّق على منشورك`,
    link: "/community",
  });
}
