import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { leadsService } from "@/lib/services";
import { LEAD_TIER_LABEL } from "@/lib/services/leads.service";

// تصدير كل العملاء كملف CSV احترافي (بيفتح في Google Sheets / Excel)
export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const contacts = await leadsService.getCrmContacts();

  const headers = [
    "الاسم",
    "الموبايل",
    "الإيميل",
    "النوع",
    "الحالة",
    "عدد الكورسات",
    "الكورسات",
    "في الكورس المجاني؟",
    "نسبة إتمام الكورس المجاني",
    "قوة الـ Lead",
    "إجمالي المدفوع (ج.م)",
    "تاريخ التسجيل",
    "آخر دخول",
  ];

  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;

  const rows = contacts.map((c) =>
    [
      c.name,
      c.phone || "",
      c.email || "",
      c.type === "user" ? "مسجّل" : "فورم اهتمام",
      c.source,
      String(c.enrolledCourses.length),
      c.enrolledCourses.map((e) => e.title).join(" | ") || "—",
      c.inFreeCourse ? "نعم" : "لا",
      c.inFreeCourse ? `${c.freeProgress}%` : "—",
      LEAD_TIER_LABEL[c.leadTier],
      c.totalPaid > 0 ? String(c.totalPaid / 100) : "0",
      new Date(c.createdAt).toLocaleString("ar-EG"),
      c.lastLoginAt ? new Date(c.lastLoginAt).toLocaleString("ar-EG") : "—",
    ]
      .map((v) => escape(String(v)))
      .join(","),
  );

  // BOM عشان العربي يظهر صح في Excel
  const csv = "﻿" + [headers.map(escape).join(","), ...rows].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ameen-crm-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
