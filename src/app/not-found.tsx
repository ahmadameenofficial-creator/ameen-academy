import Link from "next/link";
import { IconArrowRight, IconMoodSad } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-brand-50 flex items-center justify-center">
            <IconMoodSad className="h-12 w-12 text-brand-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-brand-500">404</h1>
          <h2 className="text-xl font-bold text-foreground">الصفحة مش موجودة</h2>
          <p className="text-muted-foreground">
            الصفحة اللي بتدوّر عليها ممكن تكون اتحذفت أو اللينك غلط
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="gradient" asChild>
            <Link href="/">
              <IconArrowRight className="h-4 w-4" />
              الصفحة الرئيسية
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/courses">تصفّح الكورسات</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
