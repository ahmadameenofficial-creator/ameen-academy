import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { referralService } from "@/lib/services";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// تعليم عمولة كمدفوعة
export async function PUT(req: Request, context: RouteContext) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const { id } = await context.params;
  const { action } = await req.json().catch(() => ({}));

  if (action !== "pay") {
    return NextResponse.json({ error: "action لازم يكون pay" }, { status: 400 });
  }

  try {
    await referralService.payCommission(id);
    revalidatePath("/admin/commissions");
    return NextResponse.json({ message: "تم تعليم العمولة كمدفوعة" });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
