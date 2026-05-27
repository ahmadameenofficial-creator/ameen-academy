import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { messagesDb } from "@/lib/db";
import { createNotification } from "@/lib/notifications";

// GET — جيب كل محادثاتي
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  const conversations = await messagesDb.getUserConversations(session.user.id);

  // عدد الرسائل الغير مقروءة لكل محادثة
  const withMeta = conversations.map((conv) => {
    const otherUser =
      conv.participant1.id === session.user.id ? conv.participant2 : conv.participant1;
    const lastMessage = conv.messages[0] || null;
    const isUnread = lastMessage && !lastMessage.isRead && lastMessage.senderId !== session.user.id;

    return {
      id: conv.id,
      otherUser,
      lastMessage,
      isUnread,
      lastMessageAt: conv.lastMessageAt,
    };
  });

  return NextResponse.json(withMeta);
}

// POST — ابدأ محادثة جديدة أو ابعت رسالة لحد
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجّل دخول" }, { status: 401 });
  }

  try {
    const { recipientId, content, image } = await req.json();

    if (!recipientId || !content?.trim()) {
      return NextResponse.json({ error: "البيانات ناقصة" }, { status: 400 });
    }

    if (recipientId === session.user.id) {
      return NextResponse.json({ error: "مش ممكن تبعت رسالة لنفسك" }, { status: 400 });
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: "الرسالة طويلة أوي (الحد 2000 حرف)" }, { status: 400 });
    }

    // أو انشئ المحادثة لو مفيش
    const conversation = await messagesDb.findOrCreateConversation(session.user.id, recipientId);

    // ابعت الرسالة
    const message = await messagesDb.sendMessage(conversation.id, session.user.id, content.trim(), image);

    // إشعار للمستلم
    createNotification({
      userId: recipientId,
      type: "MESSAGE",
      title: "رسالة جديدة",
      message: `${session.user.name || "شخص"}: ${content.slice(0, 60)}${content.length > 60 ? "..." : ""}`,
      link: "/community/messages",
    }).catch(() => {}); // مبتوقفش لو الإشعار فشل

    return NextResponse.json({ conversationId: conversation.id, message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
