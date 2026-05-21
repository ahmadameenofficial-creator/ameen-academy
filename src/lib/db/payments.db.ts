import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export function createPaymentInTransaction(
  tx: Prisma.TransactionClient,
  data: Prisma.PaymentUncheckedCreateInput,
) {
  return tx.payment.create({ data });
}

export function findPendingPayment(tx: Prisma.TransactionClient, userId: string, courseId: string) {
  return tx.payment.findFirst({
    where: { userId, courseId, status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });
}

export function findAdminPayments() {
  return prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      course: { select: { title: true } },
    },
  });
}

export function findPaymentById(id: string) {
  return prisma.payment.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      course: { select: { title: true } },
    },
  });
}

export function updatePaymentStatus(id: string, status: "PAID" | "FAILED", paidAt?: Date) {
  return prisma.payment.update({
    where: { id },
    data: { status, ...(paidAt && { paidAt }) },
  });
}

export function aggregatePaidRevenue() {
  return prisma.payment.aggregate({
    where: { status: "PAID" },
    _sum: { amount: true },
  });
}

export function groupRevenueByUser() {
  return prisma.payment.groupBy({
    by: ["userId"],
    where: { status: "PAID" },
    _sum: { amount: true },
  });
}
