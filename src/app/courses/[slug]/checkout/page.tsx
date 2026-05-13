"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  IconLoader2,
  IconCheck,
  IconWallet,
  IconPhone,
  IconReceipt,
  IconArrowRight,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_CONFIG } from "@/lib/constants";

interface CourseData {
  id: string;
  title: string;
  price: number;
  comparePrice: number | null;
}

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>(PAYMENT_CONFIG.methods[0].id);
  const [transactionRef, setTransactionRef] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  useEffect(() => {
    params.then(({ slug }) => {
      fetch(`/api/courses/${slug}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.error) {
            router.push("/courses");
          } else {
            setCourse(data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  }, [params, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!course) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          method: selectedMethod,
          transactionRef,
          senderPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess(true);
    } catch {
      setError("حصل مشكلة، جرّب تاني");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <IconLoader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <IconCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">تم استلام طلبك</h2>
            <p className="text-muted-foreground">
              هنراجع الدفعة وندخلك الكورس في أقرب وقت. هتوصلك رسالة لما يتفعّل.
            </p>
            <Button variant="gradient" asChild>
              <Link href="/dashboard">روح للداشبورد</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!course) return null;

  const selectedPayment = PAYMENT_CONFIG.methods.find((m) => m.id === selectedMethod)!;
  const priceInPounds = course.price / 100;

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <Link
          href={`/courses/${course.title}`}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <IconArrowRight className="h-4 w-4" />
          رجوع للكورس
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-foreground">إتمام الدفع</h1>
          <p className="text-muted-foreground mt-1">{course.title}</p>
        </div>

        {/* المبلغ */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">المبلغ المطلوب</span>
              <div className="flex items-center gap-2">
                {course.comparePrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {(course.comparePrice / 100).toLocaleString("ar-EG")} جنيه
                  </span>
                )}
                <span className="text-2xl font-bold text-brand-600">
                  {priceInPounds.toLocaleString("ar-EG")} جنيه
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* طريقة الدفع */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="font-bold text-foreground">اختار طريقة الدفع</h2>

            <div className="space-y-2">
              {PAYMENT_CONFIG.methods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    selectedMethod === method.id
                      ? "border-brand-500 bg-brand-50/50"
                      : "border-border hover:border-brand-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="sr-only"
                  />
                  <IconWallet className="h-5 w-5 text-brand-500" />
                  <div>
                    <span className="font-medium text-foreground">{method.name}</span>
                    <p className="text-xs text-muted-foreground">{method.instructions}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* رقم التحويل */}
            <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center space-y-2">
              <p className="text-sm text-brand-700">حوّل المبلغ على الرقم ده</p>
              <p className="text-2xl font-bold text-brand-600 tracking-wider" dir="ltr">
                {selectedPayment.number}
              </p>
              <p className="text-sm font-bold text-brand-800">
                المبلغ: {priceInPounds.toLocaleString("ar-EG")} جنيه
              </p>
            </div>
          </CardContent>
        </Card>

        {/* بيانات التحويل */}
        <Card>
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-bold text-foreground">بعد ما تحوّل، املا البيانات دي</h2>

              {error && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">رقم العملية / المرجع</label>
                <div className="relative">
                  <IconReceipt className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="رقم العملية من رسالة التأكيد"
                    className="pr-10"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">رقم الموبايل اللي حوّلت منه</label>
                <div className="relative">
                  <IconPhone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="pr-10"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <IconLoader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "تأكيد الدفع"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                هنراجع الدفعة وندخلك الكورس خلال ساعات قليلة
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
