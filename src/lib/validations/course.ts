import { z } from "zod";

export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().min(10).optional(),
  shortDescription: z.string().optional().nullable(),
  category: z.string().optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  price: z.number().min(0).optional(),
  comparePrice: z.number().optional().nullable(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const createCourseSchema = z.object({
  title: z.string().min(3, "عنوان الكورس لازم 3 حروف على الأقل"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "الـ slug لازم أحرف صغيرة وأرقام و-"),
  description: z.string().min(10, "وصف الكورس لازم 10 حروف على الأقل"),
  category: z.string().min(1, "التصنيف مطلوب"),
  price: z.number().min(0),
});

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
