import { z } from "zod";

export const blogCommentSchema = z.object({
  content: z.string().min(1, "التعليق فاضي").max(2000, "التعليق طويل أوي"),
  parentId: z.string().optional(),
});

export type BlogCommentInput = z.infer<typeof blogCommentSchema>;
