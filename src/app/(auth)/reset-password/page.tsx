"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconLoader2, IconLock, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "الباسورد لازم 8 حروف على الأقل")
      .regex(/[A-Z]/, "لازم حرف كبير واحد على الأقل")
      .regex(/[0-9]/, "لازم رقم واحد على الأقل"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "الباسورد مش متطابق",
    path: ["confirmPassword"],
  });

type ResetInput = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
  });

  if (!token) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Logo variant="full" href="/" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">لينك مش صحيح</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              اللينك ده مش شغال أو انتهت صلاحيته.
            </p>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            اطلب لينك جديد
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ResetInput) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      if (res.ok) {
        setDone(true);
      } else {
        const body = await res.json();
        setError(body.error || "حصل مشكلة");
      }
    } catch {
      setError("حصل مشكلة، جرّب تاني");
    } finally {
      setIsLoading(false);
    }
  };

  if (done) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Logo variant="full" href="/" />
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <IconCheck className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">الباسورد اتغيّر</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              الباسورد الجديد شغال دلوقتي. سجّل دخول بيه.
            </p>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col items-center gap-4">
        <Logo variant="full" href="/" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">باسورد جديد</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            اكتب الباسورد الجديد بتاعك
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive text-center">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            الباسورد الجديد
          </label>
          <div className="relative">
            <IconLock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="8 حروف على الأقل"
              className="pr-10"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            تأكيد الباسورد
          </label>
          <div className="relative">
            <IconLock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="اكتب الباسورد تاني"
              className="pr-10"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <IconLoader2 className="h-5 w-5 animate-spin" />
          ) : (
            "غيّر الباسورد"
          )}
        </Button>
      </form>
    </div>
  );
}
