import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { IconArrowRight } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
};

export default function PrivacyPage() {
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

          <h1 className="text-3xl font-bold text-foreground mb-8">سياسة الخصوصية</h1>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">1. البيانات اللي بنجمعها</h2>
              <p>بنجمع البيانات دي لما تسجّل حساب أو تستخدم المنصة:</p>
              <ul className="list-disc mr-6 space-y-1">
                <li>الاسم والإيميل</li>
                <li>رقم الموبايل (اختياري)</li>
                <li>بيانات الدفع (رقم العملية فقط، مش بنخزن بيانات الكارت)</li>
                <li>تقدمك في الكورسات</li>
                <li>المنشورات والتعليقات في المجتمع</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">2. إزاي بنستخدم بياناتك</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>تشغيل حسابك وتقديم الخدمة</li>
                <li>تتبع تقدمك في الكورسات</li>
                <li>إرسال إشعارات مهمة (تفعيل الكورس، تحديثات)</li>
                <li>تحسين المنصة وتجربة المستخدم</li>
              </ul>
              <p>
                مش بنبيع أو بنشارك بياناتك مع أي طرف تالت لأغراض تسويقية.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">3. حماية البيانات</h2>
              <p>
                بنستخدم تشفير SSL لكل الاتصالات. الباسورد بيتخزن مشفّر (bcrypt)
                ومفيش حد يقدر يشوفه حتى الإدارة. بنتبع أفضل ممارسات الأمان
                في تخزين ومعالجة البيانات.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">4. الكوكيز</h2>
              <p>
                بنستخدم كوكيز ضرورية لتشغيل المنصة (تسجيل الدخول والجلسة).
                مش بنستخدم كوكيز تتبع أو إعلانات.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">5. حقوقك</h2>
              <ul className="list-disc mr-6 space-y-1">
                <li>تقدر تعدّل بياناتك الشخصية من صفحة حسابك</li>
                <li>تقدر تطلب حذف حسابك بالتواصل مع الدعم</li>
                <li>تقدر تطلب نسخة من بياناتك المخزنة</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">6. التعديلات</h2>
              <p>
                ممكن نحدّث سياسة الخصوصية دي. لو حصل تغيير جوهري، هنبلّغك.
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
