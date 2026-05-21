import { z } from "zod";

export const paymentSchema = z.object({
  courseId: z.string().min(1),
  method: z.string().min(1, "طريقة الدفع مطلوبة"),
  transactionRef: z.string().min(3, "رقم العملية مطلوب"),
  senderPhone: z.string().min(10, "رقم الموبايل مطلوب"),
  couponCode: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
