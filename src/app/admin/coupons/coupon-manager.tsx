"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconPlus,
  IconTrash,
  IconLoader2,
  IconTag,
  IconPercentage,
  IconCoin,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { apiClient, apiPost, ApiError, API } from "@/lib/api";

interface CouponItem {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number | null;
  usedCount: number;
  minPrice: number | null;
  courseId: string | null;
  courseName: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

interface CourseOption {
  id: string;
  title: string;
}

export function CouponManager({
  initialCoupons,
  courses,
}: {
  initialCoupons: CouponItem[];
  courses: CourseOption[];
}) {
  const router = useRouter();
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { success, error: toastError } = useToast();

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [courseId, setCourseId] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  function resetForm() {
    setCode("");
    setDiscountType("percentage");
    setDiscountValue("");
    setMaxUses("");
    setMinPrice("");
    setCourseId("");
    setExpiresAt("");
    setError("");
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const data = await apiPost<CouponItem>(API.admin.coupons.create, {
        code: code.trim(),
        discountType,
        discountValue: Number(discountValue),
        maxUses: maxUses ? Number(maxUses) : null,
        minPrice: minPrice ? Number(minPrice) * 100 : null,
        courseId: courseId || null,
        expiresAt: expiresAt || null,
      });

      resetForm();
      setShowForm(false);
      router.refresh();
      setCoupons((prev) => [
        {
          ...data,
          expiresAt: data.expiresAt || null,
          createdAt: data.createdAt,
          courseName: courses.find((c) => c.id === data.courseId)?.title || null,
        },
        ...prev,
      ]);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "حصل مشكلة");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("متأكد إنك عايز تحذف الكود ده؟")) return;
    setDeleting(id);

    try {
      await apiClient(API.admin.coupons.delete, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      success("تم حذف الكود");
    } catch {
      toastError("معرفناش نحذف الكود، جرّب تاني");
    }
    setDeleting(null);
  }

  function formatDiscount(coupon: CouponItem) {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`;
    }
    return `${(coupon.discountValue / 100).toLocaleString("ar-EG")} جنيه`;
  }

  return (
    <div className="space-y-6">
      {/* زرار إضافة */}
      <div className="flex justify-end">
        <Button
          variant="gradient"
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
        >
          <IconPlus className="h-4 w-4" />
          {showForm ? "إلغاء" : "كود جديد"}
        </Button>
      </div>

      {/* فورم الإضافة */}
      {showForm && (
        <Card>
          <CardContent className="p-5">
            <form onSubmit={handleCreate} className="space-y-4">
              <h2 className="font-bold text-foreground">إضافة كود خصم جديد</h2>

              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">الكود</label>
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="مثلاً: WELCOME50"
                    dir="ltr"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">نوع الخصم</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDiscountType("percentage")}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 text-sm transition-colors ${
                        discountType === "percentage"
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      <IconPercentage className="h-4 w-4" />
                      نسبة مئوية
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountType("fixed")}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 text-sm transition-colors ${
                        discountType === "fixed"
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      <IconCoin className="h-4 w-4" />
                      مبلغ ثابت
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {discountType === "percentage" ? "النسبة (%)" : "المبلغ (بالقرش)"}
                  </label>
                  <Input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder={discountType === "percentage" ? "مثلاً: 20" : "مثلاً: 10000"}
                    min={1}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">عدد الاستخدامات (فاضي = لا محدود)</label>
                  <Input
                    type="number"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                    placeholder="اختياري"
                    min={1}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">أقل مبلغ بالجنيه (فاضي = بدون حد)</label>
                  <Input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="اختياري"
                    min={0}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">لكورس معيّن (فاضي = كل الكورسات)</label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="">كل الكورسات</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">تاريخ الانتهاء (فاضي = بدون انتهاء)</label>
                  <Input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" variant="gradient" disabled={submitting}>
                {submitting ? (
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <IconPlus className="h-4 w-4" />
                    إنشاء الكود
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* قائمة الأكواد */}
      {coupons.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <IconTag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">مفيش أكواد خصم لسه</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon) => {
            const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
            const isMaxed = coupon.maxUses && coupon.usedCount >= coupon.maxUses;
            const isInactive = !coupon.isActive || isExpired || isMaxed;

            return (
              <Card key={coupon.id} className={isInactive ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-lg text-brand-600" dir="ltr">
                          {coupon.code}
                        </span>
                        <Badge variant={isInactive ? "soft" : "default"}>
                          {formatDiscount(coupon)}
                        </Badge>
                        {isExpired && (
                          <Badge variant="danger">منتهي</Badge>
                        )}
                        {isMaxed && (
                          <Badge variant="danger">خلص</Badge>
                        )}
                        {!coupon.isActive && (
                          <Badge variant="soft">معطّل</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span>
                          استُخدم {coupon.usedCount}
                          {coupon.maxUses ? ` / ${coupon.maxUses}` : ""} مرة
                        </span>
                        {coupon.courseName && (
                          <span>لكورس: {coupon.courseName}</span>
                        )}
                        {coupon.minPrice && (
                          <span>
                            أقل مبلغ: {(coupon.minPrice / 100).toLocaleString("ar-EG")} جنيه
                          </span>
                        )}
                        {coupon.expiresAt && (
                          <span>
                            ينتهي: {new Date(coupon.expiresAt).toLocaleDateString("ar-EG")}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(coupon.id)}
                      disabled={deleting === coupon.id}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                    >
                      {deleting === coupon.id ? (
                        <IconLoader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <IconTrash className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
