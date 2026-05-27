import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { messagesDb } from "@/lib/db";
import { createNotification } from "@/lib/notifications";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

interface RouteContext {
  params: Promise<{ conversationId: string }>;
}

// GET — جيب رسائل محادثة (paginated)
export async function GET(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const { conversationId } = await context.params;

  // تأكد إن اليوزر مشارك في المحادثة
  const isP = await messagesDb.isParticipant(conversationId, session.user.id);
  if (!isP) {
    return NextResponse.json({ error: "مش مصرّحلك" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") || undefined;

  const messages = await messagesDb.getMessages(conversationId, cursor, 30);

  // علّم الرسائل كـ مقروءة
  await messagesDb.markConversationRead(conversationId, session.user.id);

  return NextResponse.json({ messages, hasMore: messages.length === 30 });
}

// POST — ابعت رسالة في محادثة موجودة
export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const rl = rateLimit(`msg:${session.user.id}`, RATE_LIMITS.comment);
  if (!rl.success) {
    return NextResponse.json({ error: "استنى شوية قبل ما تبعت تاني" }, { status: 429 });
  }

  const { conversationId } = await context.params;

  const isP = await messagesDb.isParticipant(conversationId, session.user.id);
  if (!isP) {
    return NextResponse.json({ error: "مش مصرّحلك" }, { status: 403 });
  }

  try {
    const { content, image } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: "الرسالة فاضية" }, { status: 400 });
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: "الرسالة طويلة أوي" }, { status: 400 });
    }

    const message = await messagesDb.sendMessage(conversationId, session.user.id, content.trim(), image);

    // إشعار للطرف التاني
    const conv = await messagesDb.findOrCreateConversation(
      session.user.id,
      session.user.id, // dummy — مش هنستخدمه
    ).catch(() => null);
    // نحتاج نعرف مين الطرف التاني
    // بدل ما نعمل query تاني، نجيب من الـ conversation
    const { prisma } = await import("@/lib/prisma");
    const fullConv = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { participant1Id: true, participant2Id: true },
    });
    if (fullConv) {
      const recipientId =
        fullConv.participant1Id === session.user.id
          ? fullConv.participant2Id
          : fullConv.participant1Id;
      createNotification({
        userId: recipientId,
        type: "MESSAGE",
        title: "رسالة جديدة",
        message: `${session.user.name || "شخص"}: ${content.slice(0, 60)}`,
        link: "/community/messages",
      }).catch(() => {});
    }

    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
