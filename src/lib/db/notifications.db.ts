import { prisma } from "@/lib/prisma";

export function findUserNotifications(userId: string, limit = 30) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function countUnreadNotifications(userId: string) {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}

export function markAllNotificationsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
