import { prisma } from "@/lib/prisma";

// ============ النظرة العامة (/admin/offline) ============

export async function getOverview() {
  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [groups, dueStudents, recentAbsences, pendingStudents] = await Promise.all([
    prisma.offlineGroup.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        students: {
          select: {
            status: true,
            agreedPrice: true,
            isFree: true,
            payments: { select: { amount: true } },
          },
        },
      },
    }),
    // مستحق خلال 3 أيام أو متأخر
    prisma.offlineStudent.findMany({
      where: {
        status: "ACTIVE",
        nextDueDate: { not: null, lte: in3Days },
      },
      orderBy: { nextDueDate: "asc" },
      select: {
        id: true,
        fullName: true,
        whatsapp: true,
        guardianPhone: true,
        nextDueDate: true,
        nextDueAmount: true,
        groupId: true,
        group: { select: { name: true } },
      },
    }),
    // غيابات آخر 30 يوم — لإنذار التسريب (غيابين+)
    prisma.offlineAttendance.groupBy({
      by: ["studentId"],
      where: { status: "ABSENT", date: { gte: monthAgo } },
      _count: { studentId: true },
      having: { studentId: { _count: { gte: 2 } } },
    }),
    // طلبات الانضمام من الفورم العامة — مستنية موافقة
    prisma.offlineStudent.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        whatsapp: true,
        guardianPhone: true,
        age: true,
        address: true,
        notes: true,
        createdAt: true,
        groupId: true,
        group: { select: { name: true, price: true } },
      },
    }),
  ]);

  const riskIds = recentAbsences.map((a) => a.studentId);
  const riskStudents = riskIds.length
    ? await prisma.offlineStudent.findMany({
        where: { id: { in: riskIds }, status: "ACTIVE" },
        select: {
          id: true,
          fullName: true,
          whatsapp: true,
          groupId: true,
          group: { select: { name: true } },
        },
      })
    : [];
  const absenceCounts = Object.fromEntries(
    recentAbsences.map((a) => [a.studentId, a._count.studentId])
  );

  const groupCards = groups.map((g) => {
    const active = g.students.filter((s) => s.status === "ACTIVE");
    const collected = g.students.reduce(
      (sum, s) => sum + s.payments.reduce((p, x) => p + x.amount, 0),
      0
    );
    const expected = active.reduce((sum, s) => sum + s.agreedPrice, 0);
    return {
      id: g.id,
      name: g.name,
      dayOfWeek: g.dayOfWeek,
      isActive: g.isActive,
      price: g.price,
      expenses: g.expenses,
      activeCount: active.length,
      freeCount: active.filter((s) => s.isFree).length,
      collected,
      expected,
      profit: collected - g.expenses,
    };
  });

  const totals = groupCards.reduce(
    (t, g) => ({
      students: t.students + g.activeCount,
      free: t.free + g.freeCount,
      collected: t.collected + g.collected,
      expected: t.expected + g.expected,
      profit: t.profit + g.profit,
    }),
    { students: 0, free: 0, collected: 0, expected: 0, profit: 0 }
  );

  return {
    groups: groupCards,
    totals: { ...totals, remaining: Math.max(totals.expected - totals.collected, 0) },
    dueStudents,
    riskStudents: riskStudents.map((s) => ({
      ...s,
      absences: absenceCounts[s.id] ?? 0,
    })),
    pendingStudents,
  };
}

// ============ تفاصيل جروب (/admin/offline/[groupId]) ============

export async function getGroupDetail(groupId: string) {
  const group = await prisma.offlineGroup.findUnique({
    where: { id: groupId },
    include: {
      students: {
        orderBy: { createdAt: "asc" },
        include: {
          payments: { orderBy: { paidAt: "desc" } },
          attendance: { orderBy: { date: "desc" } },
        },
      },
    },
  });
  if (!group) return null;

  // تواريخ الحصص المسجلة (مشتقة من سجلات الحضور)
  const sessionDates = Array.from(
    new Set(
      group.students.flatMap((s) =>
        s.attendance.map((a) => a.date.toISOString().slice(0, 10))
      )
    )
  ).sort((a, b) => b.localeCompare(a));

  return { group, sessionDates };
}
