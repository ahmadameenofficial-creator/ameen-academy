import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { messagesDb } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ count: 0 });
  }

  const count = await messagesDb.countUnreadMessages(session.user.id);
  return NextResponse.json({ count });
}
