import { z } from "zod";

export const VALID_REACTION_TYPES = ["like", "love", "haha", "wow", "sad"] as const;

export const postSchema = z.object({
  content: z.string().max(2000, "المنشور طويل أوي").optional().default(""),
  courseId: z.string().optional(),
  image: z.string().url().optional(),
}).refine((d) => d.content.trim().length >= 1 || d.image, {
  message: "المنشور لازم يكون فيه نص أو صورة",
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
