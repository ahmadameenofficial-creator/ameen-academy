import { prisma } from "@/lib/prisma";

const USER_SELECT = { id: true, name: true, image: true, role: true } as const;

/** أو اعمل محادثة جديدة لو مفيش */
export async function findOrCreateConversation(userId1: string, userId2: string) {
  // رتّب الـ IDs عشان نضمن uniqueness
  const [p1, p2] = [userId1, userId2].sort();

  const existing = await prisma.conversation.findUnique({
    where: { participant1Id_participant2Id: { participant1Id: p1, participant2Id: p2 } },
    include: {
      participant1: { select: USER_SELECT },
      participant2: { select: USER_SELECT },
    },
  });

  if (existing) return existing;

  return prisma.conversation.create({
    data: { participant1Id: p1, participant2Id: p2 },
    include: {
      participant1: { select: USER_SELECT },
      participant2: { select: USER_SELECT },
    },
  });
}

/** جيب كل محادثات اليوزر مرتبة بآخر رسالة */
export async function getUserConversations(userId: string) {
  return prisma.conversation.findMany({
    where: {
      OR: [{ participant1Id: userId }, { participant2Id: userId }],
    },
    include: {
      participant1: { select: USER_SELECT },
      participant2: { select: USER_SELECT },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          id: true,
          content: true,
          senderId: true,
          isRead: true,
          createdAt: true,
        },
      },
    },
    orderBy: { lastMessageAt: "desc" },
  });
}

/** جيب رسائل محادثة معينة (paginated) */
export function getMessages(conversationId: string, cursor?: string, limit = 30) {
  return prisma.message.findMany({
    where: { conversationId },
    include: { sender: { select: USER_SELECT } },
    orderBy: { createdAt: "desc" },
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
  });
}

/** ابعت رسالة */
export async function sendMessage(conversationId: string, senderId: string, content: string, image?: string) {
  const [message] = await prisma.$transaction([
    prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
        image: image || null,
      },
      include: { sender: { select: USER_SELECT } },
    }),
    prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    }),
  ]);

  return message;
}

/** عدد الرسائل الغير مقروءة */
export function countUnreadMessages(userId: string) {
  return prisma.message.count({
    where: {
      isRead: false,
      senderId: { not: userId },
      conversation: {
        OR: [{ participant1Id: userId }, { participant2Id: userId }],
      },
    },
  });
}

/** علّم رسائل محادثة كـ مقروءة */
export function markConversationRead(conversationId: string, readerId: string) {
  return prisma.message.updateMany({
    where: {
      conversationId,
      senderId: { not: readerId },
      isRead: false,
    },
    data: { isRead: true },
  });
}

/** تأكد إن اليوزر مشارك في المحادثة */
export async function isParticipant(conversationId: string, userId: string) {
  const conv = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      OR: [{ participant1Id: userId }, { participant2Id: userId }],
    },
    select: { id: true },
  });
  return !!conv;
}
