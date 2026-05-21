import { z } from "zod";

export const progressSchema = z.object({
  lessonId: z.string().min(1),
  isCompleted: z.boolean().optional(),
  watchedSeconds: z.number().min(0).optional(),
  lastPosition: z.number().min(0).optional(),
});

export type ProgressInput = z.infer<typeof progressSchema>;
