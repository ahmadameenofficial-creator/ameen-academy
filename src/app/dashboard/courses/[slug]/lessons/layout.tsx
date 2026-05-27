import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CourseSidebar } from "@/components/dashboard/course-sidebar";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export default async function LessonsLayout({ params, children }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { slug } = await params;
  const userId = session.user.id;

  // بنحمّل هيكل الكورس + تقدّم الطالب مرة واحدة في الـ layout
  // الـ layout مبيتعملش re-render لما الطالب ينتقل بين الدروس
  const [course, enrollment, completedLessons] = await Promise.all([
    prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        _count: { select: { lessons: true } },
        modules: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            lessons: {
              orderBy: { order: "asc" },
              select: { id: true, title: true, duration: true },
            },
          },
        },
      },
    }),
    prisma.enrollment.findFirst({
      where: { userId, course: { slug } },
    }),
    prisma.lessonProgress.findMany({
      where: { userId, isCompleted: true, lesson: { course: { slug } } },
      select: { lessonId: true },
    }),
  ]);

  if (!course) notFound();
  if (!enrollment) redirect(`/courses/${slug}`);

  const completedIds = completedLessons.map((l) => l.lessonId);

  return (
    <div className="-mx-4 md:-mx-6 -mt-4 md:-mt-6 min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row-reverse">
      {/* السايدبار — يمين في الديسكتوب (RTL)، فوق في الموبايل */}
      <CourseSidebar
        courseTitle={course.title}
        courseSlug={slug}
        modules={course.modules}
        completedIds={completedIds}
        totalLessons={course._count.lessons}
      />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
