"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconUserPlus,
  IconLoader2,
  IconShieldCheck,
  IconChalkboard,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { apiPost, ApiError, API } from "@/lib/api";

export function AddTeamMember() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "INSTRUCTOR">("ADMIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await apiPost<{ message: string }>(API.admin.team.add, {
        email: email.trim(),
        role,
      });
      setSuccess(data.message);
      setEmail("");
      router.refresh();
      // نخفي رسالة النجاح بعد 3 ثواني
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "حصل مشكلة، جرّب تاني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <IconUserPlus className="h-5 w-5 text-brand-500" />
          إضافة عضو جديد
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* اختيار الصلاحية */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">الصلاحية</label>
            <div className="flex gap-2">
              <label
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors text-sm font-medium ${
                  role === "ADMIN"
                    ? "border-brand-500 bg-brand-50/50 text-brand-700"
                    : "border-border hover:border-brand-200 text-muted-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={role === "ADMIN"}
                  onChange={() => setRole("ADMIN")}
                  className="sr-only"
                />
                <IconShieldCheck className="h-4 w-4" />
                أدمن
              </label>
              <label
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors text-sm font-medium ${
                  role === "INSTRUCTOR"
                    ? "border-blue-500 bg-blue-50/50 text-blue-700"
                    : "border-border hover:border-blue-200 text-muted-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="INSTRUCTOR"
                  checked={role === "INSTRUCTOR"}
                  onChange={() => setRole("INSTRUCTOR")}
                  className="sr-only"
                />
                <IconChalkboard className="h-4 w-4" />
                مدرس
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              {role === "ADMIN"
                ? "الأدمن يقدر يدخل لوحة التحكم ويدير كل حاجة"
                : "المدرس يقدر ينشئ كورسات ويديرها"}
            </p>
          </div>

          {/* الإيميل */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              إيميل الشخص
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="flex-1"
                dir="ltr"
                required
              />
              <Button
                type="submit"
                variant="gradient"
                disabled={loading || !email.trim()}
              >
                {loading ? (
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <IconUserPlus className="h-4 w-4" />
                    إضافة
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              لازم الشخص يكون مسجّل حساب على المنصة الأول
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700 text-center">
              {success}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
