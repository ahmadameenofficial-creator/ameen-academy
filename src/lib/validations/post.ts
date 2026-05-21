import { z } from "zod";

export const VALID_REACTION_TYPES = ["like", "love", "haha", "wow", "sad"] as const;

export const postSchema = z.object({
  content: z.string().min(3, "المنشور قصير أوي").max(2000, "المنشور طويل أوي"),
  courseId: z.string().optional(),
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
