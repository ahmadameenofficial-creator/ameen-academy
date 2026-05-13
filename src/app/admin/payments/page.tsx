import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconClock, IconCheck, IconX } from "@tabler/icons-react";
import { PaymentActions } from "./payment-actions";

async function getPayments() {
  return prisma.payment.findMany({
    include: {
      user: { select: { name: true, email: true, phone: true } },
      course: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

const statusConfig = {
  PENDING: { label: "قيد المراجعة", variant: "warning" as const, icon: IconClock },
  PAID: { label: "مدفوع", variant: "success" as const, icon: IconCheck },
  FAILED: { label: "مرفوض", variant: "danger" as const, icon: IconX },
  REFUNDED: { label: "مسترد", variant: "soft" as const, icon: IconX },
};

export default async function AdminPaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">المدفوعات</h1>
        <Badge variant="soft">{payments.filter((p) => p.status === "PENDING").length} قيد المراجعة</Badge>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          مفيش مدفوعات لسه
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => {
            const config = statusConfig[payment.status];
            const meta = payment.metadata as { transactionRef?: string; senderPhone?: string } | null;

            return (
              <Card key={payment.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{payment.user.name}</span>
                      <Badge variant={config.variant}>
                        <config.icon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{payment.course.title}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatPrice(payment.amount)}</span>
                      <span>{payment.method}</span>
                      {meta?.transactionRef && (
                        <span dir="ltr">رقم العملية: {meta.transactionRef}</span>
                      )}
                      {meta?.senderPhone && (
                        <span dir="ltr">من: {meta.senderPhone}</span>
                      )}
                      <span>{new Date(payment.createdAt).toLocaleDateString("ar-EG")}</span>
                    </div>
                  </div>

                  {payment.status === "PENDING" && (
                    <PaymentActions paymentId={payment.id} />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
