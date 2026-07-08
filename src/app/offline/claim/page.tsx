import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ClaimCard } from "@/components/offline/claim-card";
import { IconLink, IconAlertCircle } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "اربط حسابك بمجموعتك — أكاديمية أمين",
  robots: { index: false },
};

export default async function OfflineClaimPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t: token } = await searchParams;
  const session = await auth();

  // نجيب بيانات السجل عشان نطمّن الطالب إنه بيربط الحاجة الصح
  const student = token
    ? await prisma.offlineStudent.findUnique({
        where: { inviteToken: token },
        select: { fullName: true, userId: true, group: { select: { name: true } } },
      })
    : null;

  const claimUrl = `/offline/claim?t=${token ?? ""}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 text-center space-y-4">
          {!student || student.userId ? (
            <>
              <IconAlertCircle className="h-12 w-12 text-amber-500 mx-auto" />
              <h1 className="text-xl font-bold text-foreground">اللينك ده مش شغال</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                يا إما اتستخدم قبل كده يا إما مش صحيح.
                <br />
                كلم أحمد واتساب وهو هيبعتلك لينك جديد.
              </p>
            </>
          ) : !session?.user ? (
            <>
              <IconLink className="h-12 w-12 text-brand-500 mx-auto" />
              <h1 className="text-xl font-bold text-foreground">
                أهلًا {student.fullName.split(" ")[0]} 👋
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ده لينك ربط حسابك بمجموعة <b>{student.group.name}</b>
                <br />
                اعمل حساب الأول (أو ادخل بحسابك لو عندك) وهترجع هنا أوتوماتيك
              </p>
              <div className="grid gap-2">
                <Link href={`/register?callbackUrl=${encodeURIComponent(claimUrl)}`}>
                  <Button variant="gradient" size="lg" className="w-full">
                    اعمل حساب جديد
                  </Button>
                </Link>
                <Link href={`/login?callbackUrl=${encodeURIComponent(claimUrl)}`}>
                  <Button variant="ghost" className="w-full">
                    عندي حساب — تسجيل دخول
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <ClaimCard
              token={token!}
              fullName={student.fullName}
              groupName={student.group.name}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
