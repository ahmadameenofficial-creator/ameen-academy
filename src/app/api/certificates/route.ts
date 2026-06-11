import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "لازم تسجل دخول" }, { status: 401 });
  }

  try {
    const { courseId, certificateName } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: "courseId مطلوب" }, { status: 400 });
    }

    // الاسم اللي هيتطبع على الشهادة — لازم ثلاثي (3 كلمات على الأقل)
    // وبالإنجليزي إجباري (الشهادة كلها إنجليزي عشان لينكدإن والـ CV)
    const name = typeof certificateName === "string" ? certificateName.trim().replace(/\s+/g, " ") : "";
    const nameWords = name.split(" ").filter((w) => w.length >= 2);
    const validChars = /^[a-zA-Z\s'.-]+$/.test(name);
    if (name && (!validChars || nameWords.length < 3 || name.length > 60)) {
      return NextResponse.json(
        { error: "اكتب اسمك الثلاثي كامل (3 أسماء على الأقل) بالحروف الإنجليزية بس" },
        { status: 400 }
      );
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      include: {
        course: {
          select: {
            title: true,
            modules: {
              select: {
                lessons: { select: { id: true } },
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "مش مسجل في الكورس ده" }, { status: 403 });
    }

    const allLessonIds = enrollment.course.modules.flatMap((m) =>
      m.lessons.map((l) => l.id)
    );

    if (allLessonIds.length === 0) {
      return NextResponse.json({ error: "الكورس مفيهوش دروس" }, { status: 400 });
    }

    const completedCount = await prisma.lessonProgress.count({
      where: {
        userId: session.user.id,
        lessonId: { in: allLessonIds },
        isCompleted: true,
      },
    });

    if (completedCount < allLessonIds.length) {
      return NextResponse.json(
        {
          error: "لازم تخلص كل الدروس الأول",
          progress: Math.round((completedCount / allLessonIds.length) * 100),
        },
        { status: 400 }
      );
    }

    const existing = await prisma.certificate.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId } },
    });

    if (existing) {
      return NextResponse.json({
        certificateCode: existing.certificateCode,
        message: "الشهادة موجودة بالفعل",
      });
    }

    // لازم يكون فيه اسم ثلاثي مسجّل — من الطلب الحالي أو من إصدار سابق
    // ولو الاسم المخزّن قديم (عربي مثلاً) بنطلبه تاني بالإنجليزي
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { certificateName: true },
    });
    const storedNameValid =
      !!user?.certificateName && /^[a-zA-Z\s'.-]+$/.test(user.certificateName);
    if (!name && !storedNameValid) {
      return NextResponse.json(
        { error: "محتاجين اسمك الثلاثي بالإنجليزي الأول", needName: true },
        { status: 400 }
      );
    }
    if (name && name !== user?.certificateName) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { certificateName: name },
      });
    }

    const certificateCode = `AMN-${randomBytes(4).toString("hex").toUpperCase()}`;

    // الـ PDF بيتعمل generate on-the-fly في /api/certificates/[code]
    // فمش محتاجين نخزنه في الداتابيز (بيوفّر مساحة كبيرة)
    const certificate = await prisma.certificate.create({
      data: {
        userId: session.user.id,
        courseId,
        certificateCode,
      },
    });

    await prisma.enrollment.update({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      data: { completedAt: new Date() },
    });

    return NextResponse.json({
      certificateCode: certificate.certificateCode,
      message: "تم إصدار الشهادة بنجاح",
    });
  } catch {
    return NextResponse.json({ error: "حصل مشكلة" }, { status: 500 });
  }
}
