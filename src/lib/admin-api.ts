import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function requireAdminApi() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export function unauthorized() {
  return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}
