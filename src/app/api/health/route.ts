import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Ping بسيط عشان الداتابيز متنامش (Neon cold start prevention)
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
