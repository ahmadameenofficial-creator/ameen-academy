import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { notificationsDb } from "@/lib/db";
import { handleApiError, UnauthorizedError } from "@/lib/errors";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    const [notifications, unreadCount] = await Promise.all([
      notificationsDb.findUserNotifications(session.user.id),
      notificationsDb.countUnreadNotifications(session.user.id),
    ]);

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT() {
  try {
    const session = await auth();
    if (!session?.user) throw new UnauthorizedError();

    await notificationsDb.markAllNotificationsRead(session.user.id);
    return NextResponse.json({ message: "تم" });
  } catch (error) {
    return handleApiError(error);
  }
}
