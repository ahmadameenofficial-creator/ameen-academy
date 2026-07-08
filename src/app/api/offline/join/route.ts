import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// فورم انضمام الأوفلاين — عامة (بدون auth)
// الطلب بيتسجل PENDING ومبيدخلش في أي حسابات لحد ما الأدمن يوافق
const joinSchema = z.object({
  groupId: z.string().min(1, "اختار الجروب"),
  fullName: z.string().min(5, "اكتب اسمك الثلاثي").max(120),
  email: z.string().email("اكتب إيميل صحيح").max(120),
  whatsapp: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "اكتب رقم واتس مصري صحيح (01xxxxxxxxx)"),
  guardianPhone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "رقم ولي الأمر مش صحيح")
    .nullable()
    .optional()
    .or(z.literal("")),
  age: z.number().min(8, "السن من 8 لـ 60").max(60, "السن من 8 لـ 60"),
  address: z.string().min(2, "اكتب منطقتك").max(200),
  notes: z.string().max(300).optional(),
  website: z.string().optional(), // honeypot — البشر مبيشوفوهاش
});

export async function POST(req: Request) {
  try {
    const result = joinSchema.safeParse(await req.json());
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }
    const data = result.data;

    // honeypot: لو اتملت يبقى بوت — نرد بنجاح وهمي من غير تسجيل
    if (data.website) {
      return NextResponse.json({ message: "تم" }, { status: 201 });
    }

    const group = await prisma.offlineGroup.findUnique({
      where: { id: data.groupId },
      select: { id: true, isActive: true },
    });
    if (!group || !group.isActive) {
      return NextResponse.json({ error: "الجروب ده مش متاح دلوقتي" }, { status: 400 });
    }

    const whatsapp = data.whatsapp.replace(/\D/g, "");

    // منع التكرار: نفس الرقم مسجل قبل كده (في أي جروب)
    const existing = await prisma.offlineStudent.findFirst({
      where: { whatsapp },
      select: { id: true, status: true },
    });
    if (existing) {
      return NextResponse.json(
        {
          error:
            existing.status === "PENDING"
              ? "طلبك وصلنا قبل كده وهنتواصل معاك قريب إن شاء الله 🙌"
              : "الرقم ده مسجل عندنا بالفعل — كلمنا واتساب لو فيه حاجة",
        },
        { status: 409 }
      );
    }

    const ageNote = data.age < 18 && !data.guardianPhone ? "⚠️ تحت 18 من غير رقم ولي أمر" : null;

    await prisma.offlineStudent.create({
      data: {
        groupId: data.groupId,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        whatsapp,
        guardianPhone: data.guardianPhone ? data.guardianPhone.replace(/\D/g, "") : null,
        age: data.age,
        address: data.address.trim(),
        status: "PENDING",
        notes: [data.notes?.trim(), ageNote].filter(Boolean).join(" · ") || null,
      },
    });

    revalidatePath("/admin/offline");
    return NextResponse.json({ message: "تم" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة — جرب تاني" }, { status: 500 });
  }
}
