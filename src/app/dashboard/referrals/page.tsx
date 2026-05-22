import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { referralService } from "@/lib/services";
import { SITE_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { Card } from "@/components/ui/card";
import { ReferralLinkBox } from "@/components/referral/referral-link-box";
import { IconGift, IconUsers, IconCoin, IconClock } from "@tabler/icons-react";

export const metadata = {
  title: "اربح معانا — برنامج الإحالة",
};

export default async function ReferralsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const data = await referralService.getMyReferralData(session.user.id, SITE_CONFIG.url);
  const { link, rate, stats, recent } = data;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 md:p-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <IconGift className="h-6 w-6" />
          <h1 className="text-2xl md:text-3xl font-bold">اربح معانا</h1>
        </div>
        <p className="text-white/90 max-w-xl leading-relaxed">
          شارك لينكك الخاص مع أصحابك — وكل واحد يشترك ويشتري كورس عن طريقك، تاخد{" "}
          <span className="font-bold">{rate}%</span> عمولة على كل عملية. مفيش حد أقصى.
        </p>
      </div>

      {/* اللينك */}
      <Card className="p-5">
        <h2 className="font-bold text-foreground mb-3">لينك الإحالة بتاعك</h2>
        <ReferralLinkBox link={link} />
      </Card>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={IconUsers}
          label="عدد اللي اشتركوا"
          value={String(stats.referralsCount)}
          tone="brand"
        />
        <StatCard
          icon={IconCoin}
          label="أرباح مستحقة"
          value={formatPrice(stats.totals.PAID)}
          tone="green"
        />
        <StatCard
          icon={IconClock}
          label="أرباح في الانتظار"
          value={formatPrice(stats.totals.PENDING)}
          tone="amber"
        />
      </div>

      {/* آخر العمولات */}
      <Card className="p-5">
        <h2 className="font-bold text-foreground mb-4">آخر العمولات</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            لسه مفيش عمولات — ابدأ شارك لينكك دلوقتي!
          </p>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{formatPrice(c.amount)}</span>
                  <CommissionBadge status={c.status} />
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.createdAt).toLocaleDateString("ar-EG")}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "brand" | "green" | "amber";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <Card className="p-5">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
    </Card>
  );
}

function CommissionBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    PENDING: { label: "في الانتظار", cls: "bg-amber-100 text-amber-700" },
    PAID: { label: "اتدفعت", cls: "bg-green-100 text-green-700" },
    CANCELLED: { label: "ملغاة", cls: "bg-red-100 text-red-700" },
  };
  const s = map[status] || map.PENDING;
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${s.cls}`}>{s.label}</span>;
}
