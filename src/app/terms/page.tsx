import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { IconArrowRight } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline mb-6"
          >
            <IconArrowRight className="h-4 w-4" />
            الرئيسية
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">الشروط والأحكام</h1>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">1. مقدمة</h2>
              <p>
                باستخدامك لمنصة أكاديمية أمين، أنت موافق على الشروط والأحكام دي.
                لو مش موافق على أي حاجة فيها، من فضلك متستخدمش المنصة.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">2. الحساب</h2>
              <p>
                أنت مسؤول عن الحفاظ على سرية بيانات حسابك (الإيميل والباسورد).
                أي نشاط يتم من خلال حسابك أنت المسؤول عنه.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">3. المحتوى التعليمي</h2>
              <p>
                كل الكورسات والمحتوى على المنصة ملك لأكاديمية أمين.
                ممنوع نسخ أو توزيع أو بيع أي محتوى من المنصة بدون إذن كتابي.
              </p>
              <p>
                شراء الكورس بيديك حق الوصول الشخصي ليه. ممنوع مشاركة حسابك أو
                الفيديوهات مع أي حد تاني.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">4. المدفوعات والاسترداد</h2>
              <p>
                أسعار الكورسات بالجنيه المصري وشاملة كل الرسوم.
                بمجرد تفعيل الكورس، مش بنرجع الفلوس إلا في حالات استثنائية
                بيتم تقييمها من الإدارة.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">5. المجتمع</h2>
              <p>
                لازم تلتزم بالاحترام في المجتمع. ممنوع نشر محتوى مسيء أو
                إعلانات أو spam. الإدارة ليها الحق تحذف أي محتوى أو تحظر أي حساب
                بيخالف القواعد.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">6. حماية الفيديوهات</h2>
              <p>
                الفيديوهات محمية بتقنيات أمان. أي محاولة لتسجيل أو تحميل أو
                توزيع الفيديوهات بتعتبر مخالفة وممكن يترتب عليها حظر الحساب
                وإجراءات قانونية.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">7. تعديل الشروط</h2>
              <p>
                ممكن نعدّل الشروط دي في أي وقت. لو عدّلنا حاجة جوهرية، هنبلّغك
                عن طريق الإشعارات أو الإيميل.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">8. التواصل</h2>
              <p>
                لو عندك أي سؤال عن الشروط دي، تواصل معانا على الإيميل أو من
                خلال المنصة.
              </p>
            </section>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            آخر تحديث: مايو 2026
          </p>
        </div>
      </div>
    </>
  );
}
