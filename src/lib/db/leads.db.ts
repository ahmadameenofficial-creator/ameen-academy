import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export function createLead(data: Prisma.LeadUncheckedCreateInput) {
  return prisma.lead.create({ data });
}

// نتأكد إن الـ lead مش مكرر (نفس الإيميل أو نفس الرقم)
export function findExistingLead(email?: string, phone?: string) {
  const or: Prisma.LeadWhereInput[] = [];
  if (email) or.push({ email });
  if (phone) or.push({ phone });
  if (or.length === 0) return Promise.resolve(null);
  return prisma.lead.findFirst({ where: { OR: or }, select: { id: true } });
}

export function findAllLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}

export function countLeads() {
  return prisma.lead.count();
}

/** هل المستخدم ده سجّل بياناته قبل كده؟ (بالإيميل) */
export function isLeadByEmail(email: string) {
  return prisma.lead.findFirst({
    where: { email },
    select: { id: true },
  });
}
