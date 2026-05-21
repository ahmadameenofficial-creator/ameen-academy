import type { UserSummary } from "./user.types";

export interface ReactionsSummary {
  total: number;
  byType: Record<string, number>;
  myReaction: string | null;
}

export interface CommentData {
  id: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
  replies?: CommentData[];
}

export interface PostData {
  id: string;
  content: string;
  image: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  likesCount: number;
  commentsCount: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
  comments: CommentData[];
  reactionsSummary: ReactionsSummary;
  _count: {
    comments: number;
    likes: number;
    reactions: number;
  };
}
