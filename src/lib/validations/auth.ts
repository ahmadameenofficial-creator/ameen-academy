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
