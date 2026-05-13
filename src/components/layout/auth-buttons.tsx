"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { IconUser, IconLayoutDashboard, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function AuthButtons({ mobile }: { mobile?: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <IconLoader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
  }

  if (session?.user) {
    return mobile ? (
      <div className="mt-3 border-t border-border pt-3">
        <Button asChild variant="gradient" size="default" className="w-full">
          <Link href={ROUTES.dashboard}>
            <IconLayoutDashboard className="size-4" />
            لوحتي
          </Link>
        </Button>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <Button asChild variant="gradient" size="sm">
          <Link href={ROUTES.dashboard}>
            <IconLayoutDashboard className="size-4" />
            لوحتي
          </Link>
        </Button>
      </div>
    );
  }

  return mobile ? (
    <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
      <Button asChild variant="outline" size="default">
        <Link href={ROUTES.login}>تسجيل الدخول</Link>
      </Button>
      <Button asChild variant="gradient" size="default">
        <Link href={ROUTES.register}>إنشاء حساب جديد</Link>
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link href={ROUTES.login}>تسجيل الدخول</Link>
      </Button>
      <Button asChild variant="gradient" size="sm">
        <Link href={ROUTES.register}>
          <IconUser className="size-4" />
          ابدأ مجاناً
        </Link>
      </Button>
    </div>
  );
}
