"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2, IconMail, IconLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("الإيميل أو الباسورد غلط");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("حصل مشكلة، جرّب تاني");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col items-center gap-4">
        <Logo variant="full" href="/" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">تسجيل الدخول</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            ادخل على حسابك وكمّل تعلّم
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              الباسورد
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-brand-600 hover:underline"
            >
              نسيت الباسورد؟
            </Link>
          </div>
          <div className="relative">
            <IconLock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="الباسورد بتاعك"
              className="pr-10"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
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
            "دخول"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        مش عندك حساب؟{" "}
        <Link href="/register" className="font-medium text-brand-600 hover:underline">
          سجّل دلوقتي
        </Link>
      </p>
    </div>
  );
}
