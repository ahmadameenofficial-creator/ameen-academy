import { requireAdminApi, unauthorized } from "@/lib/admin-api";
import { leadsDb } from "@/lib/db";

// تصدير الـ leads كملف CSV (بيفتح مباشرة في Google Sheets / Excel)
export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  const leads = await leadsDb.findAllLeads();

  const headers = ["الاسم", "واتساب", "الإيميل", "المصدر", "التاريخ"];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;

  const rows = leads.map((l) =>
    [
      l.name,
      l.phone || "",
      l.email || "",
      l.source,
      new Date(l.createdAt).toLocaleString("ar-EG"),
    ]
      .map((c) => escape(String(c)))
      .join(","),
  );

  // BOM عشان العربي يظهر صح في Excel
  const csv = "﻿" + [headers.map(escape).join(","), ...rows].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ameen-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
