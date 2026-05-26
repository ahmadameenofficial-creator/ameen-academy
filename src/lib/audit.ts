import { prisma } from "@/lib/prisma";

/**
 * سجّل فعل أدمن في الـ Audit Log
 * بيشتغل في الخلفية — لو فشل مش هيأثر على العملية الأصلية
 */
export function auditLog(params: {
  userId: string;
  action: string;
  target?: string;
  details?: string;
  ipAddress?: string;
}) {
  prisma.auditLog
    .create({ data: params })
    .catch((err) => console.error("[AuditLog] فشل التسجيل:", err));
}
