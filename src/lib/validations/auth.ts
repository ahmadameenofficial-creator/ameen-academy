import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "الإيميل مطلوب")
    .email("إيميل مش صحيح"),
  password: z
    .string()
    .min(1, "الباسورد مطلوب"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم لازم يكون حرفين على الأقل")
    .max(50, "الاسم طويل أوي"),
  email: z
    .string()
    .min(1, "الإيميل مطلوب")
    .email("إيميل مش صحيح"),
  phone: z
    .string()
    .min(1, "رقم الموبايل مطلوب")
    // رقم دولي بصيغة E.164 (كود الدولة + الرقم) — بياخده من اختيار الدولة
    .regex(/^\+[1-9]\d{6,14}$/, "رقم واتساب مش صحيح — اختار الدولة واكتب الرقم"),
  password: z
    .string()
    .min(8, "الباسورد لازم 8 حروف على الأقل")
    .regex(/[A-Z]/, "لازم حرف كبير واحد على الأقل")
    .regex(/[0-9]/, "لازم رقم واحد على الأقل"),
  confirmPassword: z
    .string()
    .min(1, "تأكيد الباسورد مطلوب"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "الباسوردين مش زي بعض",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
