import { z } from "zod";

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "اكتب اسمك").max(80, "الاسم طويل أوي"),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9+\s-]{8,20}$/, "رقم واتساب مش مظبوط")
      .optional()
      .or(z.literal("")),
    email: z.string().trim().email("الإيميل مش مظبوط").optional().or(z.literal("")),
    source: z.string().optional(),
  })
  .refine((d) => Boolean(d.phone) || Boolean(d.email), {
    message: "سيبلنا رقم واتساب أو إيميل عشان نوصلك",
    path: ["phone"],
  });

export type LeadInput = z.infer<typeof leadSchema>;
