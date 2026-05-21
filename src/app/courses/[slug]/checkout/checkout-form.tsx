"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconLoader2,
  IconCheck,
  IconWallet,
  IconPhone,
  IconReceipt,
  IconArrowRight,
  IconTag,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_CONFIG } from "@/lib/constants";
import { apiClient, apiPost, ApiError, API } from "@/lib/api";

interface CourseData {
  id: string;
  title: string;
  slug: string;
  price: number;
  comparePrice: number | null;
}

interface CouponData {
  code: string;
  discountType: string;
  discountValue: number;
  discount: number;
  finalPrice: number;
  message: string;
}

export function CheckoutForm({ course }: { course: CourseData }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>(PAYMENT_CONFIG.methods[0].id);
  const [transactionRef, setTransactionRef] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);

  async function handleApplyCoupon() {
    if (!couponCode.trim() || !course) return;
    setCouponLoading(true);
    setCouponError("");

    try {
      const data = await apiClient<CouponData>(
        API.coupons.validate({ code: couponCode.trim(), courseId: course.id }),
      );
      setAppliedCoupon(data);
      setCouponError("");
    } catch (e) {
      setCouponError(e instanceof ApiError ? e.message : "حصل مشكلة، جرّب تاني");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!course) return;
    setSubmitting(true);
    setError("");

    try {
      await apiPost(API.payments.create, {
        courseId: course.id,
        method: selectedMethod,
        transactionRef,
        senderPhone,
        couponCode: appliedCoupon?.code || undefined,
      });
      setSuccess(true);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "حصل مشكلة، جرّب تاني");
    } finally {
      setSubmitting(false);
    }
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

  const selectedPayment = PAYMENT_CONFIG.methods.find((m) => m.id === selectedMethod)!;
  const finalPrice = appliedCoupon ? appliedCoupon.finalPrice : course.price;
  const priceInPounds = finalPrice / 100;

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <Link
          href={`/courses/${course.slug}`}
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
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">سعر الكورس</span>
              <div className="flex items-center gap-2">
                {course.comparePrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {(course.comparePrice / 100).toLocaleString("ar-EG")} جنيه
                  </span>
                )}
                <span className={`text-2xl font-bold ${appliedCoupon ? "text-muted-foreground line-through text-lg" : "text-brand-600"}`}>
                  {(course.price / 100).toLocaleString("ar-EG")} جنيه
                </span>
              </div>
            </div>

            {appliedCoupon && (
              <>
                <div className="flex items-center justify-between text-green-600">
                  <div className="flex items-center gap-2">
                    <IconTag className="h-4 w-4" />
                    <span className="text-sm">{appliedCoupon.message}</span>
                  </div>
                  <span className="text-sm font-medium">
                    -{(appliedCoupon.discount / 100).toLocaleString("ar-EG")} جنيه
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-bold text-foreground">المبلغ المطلوب</span>
                  <span className="text-2xl font-bold text-brand-600">
                    {priceInPounds.toLocaleString("ar-EG")} جنيه
                  </span>
                </div>
              </>
            )}

            {/* كود الخصم */}
            {!appliedCoupon ? (
              <div className="border-t border-border pt-4 space-y-2">
                <label className="text-sm font-medium text-foreground">عندك كود خصم؟</label>
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="اكتب الكود هنا"
                    className="flex-1"
                    dir="ltr"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                  >
                    {couponLoading ? (
                      <IconLoader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "تطبيق"
                    )}
                  </Button>
                </div>
                {couponError && (
                  <p className="text-sm text-destructive">{couponError}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                <div className="flex items-center gap-2 text-green-700">
                  <IconCheck className="h-4 w-4" />
                  <span className="text-sm font-medium">كود {appliedCoupon.code} مطبّق</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-green-600 hover:text-green-800"
                  aria-label="إزالة كود الخصم"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>
            )}
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
                {appliedCoupon && (
                  <span className="text-green-600 mr-1">(بعد الخصم)</span>
                )}
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
