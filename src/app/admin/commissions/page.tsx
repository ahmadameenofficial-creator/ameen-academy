import { referralService } from "@/lib/services";
import { formatPrice } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconGift } from "@tabler/icons-react";
import { CommissionPayButton } from "./commission-actions";

export const metadata = {
  title: "العمولات — لوحة التحكم",
};

export default async function AdminCommissionsPage() {
  const commissions = await referralService.getAdminCommissions();

  const pendingTotal = commissions
    .filter((c) => c.status === "PENDING")
    .reduce((s, c) => s + c.amount, 0);
  const paidTotal = commissions
    .filter((c) => c.status === "PAID")
    .reduce((s, c) => s + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <IconGift className="h-6 w-6 text-brand-500" />
        <h1 className="text-2xl font-bold text-foreground">عمولات الإحالة</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">مستحقة للدفع</p>
          <p className="text-xl font-bold text-amber-600">{formatPrice(pendingTotal)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">اتدفعت</p>
          <p className="text-xl font-bold text-green-600">{formatPrice(paidTotal)}</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        {commissions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">
            لسه مفيش عمولات
          </p>
        ) : (
          <div className="divide-y divide-border">
            {commissions.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {c.referrer.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate" dir="ltr">
                    {c.referrer.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(c.createdAt).toLocaleDateString("ar-EG")} — نسبة {c.rate}%
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-foreground">{formatPrice(c.amount)}</span>
                  {c.status === "PENDING" ? (
                    <CommissionPayButton id={c.id} />
                  ) : c.status === "PAID" ? (
                    <Badge variant="success">اتدفعت</Badge>
                  ) : (
                    <Badge variant="outline">ملغاة</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
