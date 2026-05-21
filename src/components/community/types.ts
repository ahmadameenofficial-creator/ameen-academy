export const REACTION_TYPES = [
  { type: "like", emoji: "👍", label: "لايك" },
  { type: "love", emoji: "❤️", label: "لاف" },
  { type: "haha", emoji: "😂", label: "هاها" },
  { type: "wow", emoji: "😮", label: "واو" },
  { type: "sad", emoji: "😢", label: "حزين" },
] as const;

export interface UserInfo {
  id: string;
  name: string;
  image: string | null;
  role: string;
}

export interface CommentData {
  id: string;
  content: string;
  parentId: string | null;
  user: UserInfo;
  replies?: CommentData[];
  createdAt: string;
}

export interface ReactionsSummary {
  total: number;
  byType: Record<string, number>;
  myReaction: string | null;
}

export interface Post {
  id: string;
  content: string;
  user: UserInfo;
  isPinned: boolean;
  likesCount: number;
  commentsCount: number;
  comments: CommentData[];
  reactionsSummary: ReactionsSummary;
  _count: { comments: number; likes: number; reactions: number };
  createdAt: string;
}
