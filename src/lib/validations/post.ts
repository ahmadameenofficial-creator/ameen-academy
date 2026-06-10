import { z } from "zod";

export const VALID_REACTION_TYPES = ["like", "love", "haha", "wow", "sad"] as const;

// الصور لازم تكون مرفوعة عندنا (عبر /api/upload) — مفيش روابط خارجية
// عشان محدش يحط tracking pixels أو صور بتتبدّل بعد النشر
function isOurUpload(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export const postSchema = z
  .object({
    content: z.string().max(2000, "المنشور طويل أوي").default(""),
    image: z
      .string()
      .max(600)
      .refine(isOurUpload, "الصورة لازم تترفع من الموقع نفسه")
      .optional(),
    courseId: z.string().optional(),
  })
  // نص ٣ حروف على الأقل، أو صورة من غير نص — الاتنين فاضيين ميرضاش
  .refine((d) => d.content.trim().length >= 3 || !!d.image, {
    message: "اكتب حاجة أو ضيف صورة",
    path: ["content"],
  });

export const commentSchema = z.object({
  content: z.string().min(1, "التعليق فاضي").max(1000, "التعليق طويل أوي"),
  parentId: z.string().optional(),
});

export const reactionSchema = z.object({
  type: z.enum(VALID_REACTION_TYPES),
});

export type PostInput = z.infer<typeof postSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type ReactionInput = z.infer<typeof reactionSchema>;
