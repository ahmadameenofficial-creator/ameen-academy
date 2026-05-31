import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";
import { Logo } from "@/components/shared/logo";
import {
  IconLayoutDashboard,
  IconBook,
  IconUsers,
  IconCreditCard,
  IconArticle,
  IconTag,
  IconShieldCheck,
  IconArrowRight,
  IconGift,
  IconAddressBook,
  IconCrown,
  IconPalette,
} from "@tabler/icons-react";

const navItems = [
  { href: "/admin", label: "الرئيسية", icon: IconLayoutDashboard },
  { href: "/admin/courses", label: "الكورسات", icon: IconBook },
  { href: "/admin/brief", label: "البريف", icon: IconPalette },
  { href: "/admin/vip", label: "VIP", icon: IconCrown },
  { href: "/admin/blog", label: "المدونة", icon: IconArticle },
  { href: "/admin/students", label: "الطلاب", icon: IconUsers },
  { href: "/admin/leads", label: "العملاء", icon: IconAddressBook },
  { href: "/admin/payments", label: "المدفوعات", icon: IconCreditCard },
  { href: "/admin/commissions", label: "العمولات", icon: IconGift },
  { href: "/admin/coupons", label: "الأكواد", icon: IconTag },
  { href: "/admin/team", label: "الفريق", icon: IconShieldCheck },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Logo variant="icon" href="/admin" />
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            الموقع
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
