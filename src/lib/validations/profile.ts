import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "الاسم لازم حرفين على الأقل").max(100),
  phone: z.string().max(20).optional(),
  bio: z.string().max(500).optional(),
  image: z.string().url().optional().or(z.literal("")),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8, "الباسورد الجديد لازم 8 حروف على الأقل")
    .regex(/[A-Z]/, "لازم حرف كبير واحد على الأقل")
    .regex(/[0-9]/, "لازم رقم واحد على الأقل"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
