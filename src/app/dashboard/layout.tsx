import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { Logo } from "@/components/shared/logo";
import { PushPrompt } from "@/components/shared/push-prompt";
import {
  IconBook,
  IconLogout,
  IconHome,
  IconShield,
  IconUsers,
  IconUser,
  IconGift,
} from "@tabler/icons-react";
import { NotificationsBell } from "@/components/notifications-bell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Logo variant="icon" href="/dashboard" />
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/dashboard" icon={IconHome} label="الرئيسية" />
              <NavLink href="/courses" icon={IconBook} label="الكورسات" />
              <NavLink href="/community" icon={IconUsers} label="المجتمع" />
              <NavLink href="/dashboard/referrals" icon={IconGift} label="اربح معانا" />
              <NavLink href="/dashboard/profile" icon={IconUser} label="حسابي" />
              {isAdmin && (
                <NavLink href="/admin" icon={IconShield} label="لوحة التحكم" />
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <NotificationsBell />
            <span className="text-sm text-muted-foreground hidden sm:block">
              {session.user.name}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconLogout className="h-4 w-4" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </form>
          </div>
        </div>

        {/* موبايل nav — مع fade على الأطراف عشان يبيّن إنه scrollable */}
        <div className="md:hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <nav className="flex items-center gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
            <NavLink href="/dashboard" icon={IconHome} label="الرئيسية" mobile />
            <NavLink href="/courses" icon={IconBook} label="الكورسات" mobile />
            <NavLink href="/community" icon={IconUsers} label="المجتمع" mobile />
            <NavLink href="/dashboard/referrals" icon={IconGift} label="اربح معانا" mobile />
            <NavLink href="/dashboard/profile" icon={IconUser} label="حسابي" mobile />
            {isAdmin && (
              <NavLink href="/admin" icon={IconShield} label="الأدمن" mobile />
            )}
          </nav>
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-6xl mx-auto">{children}</main>
      <PushPrompt />
    </div>
  );
}

function NavLink({
  href,
  icon: Icon,
  label,
  mobile,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 ${
        mobile ? "px-3 py-1.5 text-xs" : "px-3 py-2 text-sm"
      } text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors whitespace-nowrap`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
