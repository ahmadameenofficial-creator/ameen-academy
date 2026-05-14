"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconLoader2, IconMail, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";

const forgotSchema = z.object({
  email: z.string().email("إيميل مش صحيح"),
});

type ForgotInput = z.infer<typeof forgotSchema>;

export function ForgotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotInput) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
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

  if (sent) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Logo variant="full" href="/" />
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <IconCheck className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">اتبعتلك إيميل</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              لو الإيميل ده مسجّل عندنا، هتلاقي رسالة فيها لينك لتغيير الباسورد.
              <br />
              شيك على الـ spam لو مش لاقيها.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            رجوع لتسجيل الدخول
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
          <h1 className="text-2xl font-bold text-foreground">نسيت الباسورد؟</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            اكتب الإيميل بتاعك وهنبعتلك لينك تغيّر بيه الباسورد
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
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            الإيميل
          </label>
          <div className="relative">
            <IconMail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="pr-10"
              dir="ltr"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
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
            "ابعتلي لينك"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        فاكر الباسورد؟{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          سجّل دخول
        </Link>
      </p>
    </div>
  );
}
