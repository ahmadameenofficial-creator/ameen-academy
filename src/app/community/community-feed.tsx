"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IconMessageCircle,
  IconSend,
  IconLoader2,
  IconPinned,
  IconShield,
  IconDots,
  IconTrash,
  IconEdit,
  IconX,
  IconCheck,
  IconCornerDownLeft,
  IconMoodSmile,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ============ Constants ============

const REACTION_TYPES = [
  { type: "like", emoji: "👍", label: "لايك" },
  { type: "love", emoji: "❤️", label: "لاف" },
  { type: "haha", emoji: "😂", label: "هاها" },
  { type: "wow", emoji: "😮", label: "واو" },
  { type: "sad", emoji: "😢", label: "حزين" },
] as const;

// ============ Types ============

interface UserInfo {
  id: string;
  name: string;
  image: string | null;
  role: string;
}

interface CommentData {
  id: string;
  content: string;
  parentId: string | null;
  user: UserInfo;
  replies?: CommentData[];
  createdAt: string;
}

interface ReactionsSummary {
  total: number;
  byType: Record<string, number>;
  myReaction: string | null;
}

interface Post {
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

// ============ Main Feed ============

export function CommunityFeed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handlePost() {
    if (!newPost.trim() || posting) return;
    setPosting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost }),
      });
      if (res.ok) {
        setNewPost("");
        fetchPosts();
      }
    } catch {}
    setPosting(false);
  }

  async function handleDeletePost(postId: string) {
    if (!confirm("متأكد إنك عايز تحذف المنشور ده؟")) return;
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch {}
  }

  async function handleEditPost(postId: string, content: string) {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, content } : p)));
      }
    } catch {}
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-50 to-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">المجتمع</h1>
          <p className="mt-2 text-muted-foreground">شارك، اسأل، وتعلّم مع باقي الطلاب</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-xl space-y-4">
        {/* كتابة بوست جديد */}
        {session?.user ? (
          <Card className="overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Avatar name={session.user.name || ""} image={session.user.image} />
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder={`إيه اللي في بالك يا ${session.user.name?.split(" ")[0]}؟`}
                  rows={3}
                  className="flex-1 bg-muted/50 rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-none transition-colors border-0"
                  maxLength={2000}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/20">
              <span className="text-xs text-muted-foreground">{newPost.length}/2000</span>
              <Button size="sm" onClick={handlePost} disabled={posting || !newPost.trim()}>
                {posting ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <><IconSend className="h-4 w-4" /> انشر</>}
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-3">سجّل دخولك عشان تشارك في المجتمع</p>
            <Button variant="gradient" asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          </Card>
        )}

        {/* البوستات */}
        {loading ? (
          <div className="flex justify-center py-10">
            <IconLoader2 className="h-8 w-8 animate-spin text-brand-500" />
          </div>
        ) : posts.length === 0 ? (
          <Card className="p-12 text-center">
            <IconMessageCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">مفيش منشورات لسه. كن أول واحد ينشر!</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={session?.user?.id}
                currentUserRole={session?.user?.role}
                currentUserName={session?.user?.name || ""}
                currentUserImage={session?.user?.image}
                onDelete={() => handleDeletePost(post.id)}
                onEdit={(content) => handleEditPost(post.id, content)}
                isLoggedIn={!!session}
                onRefresh={fetchPosts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ Avatar ============

function Avatar({ name, image, size = "md" }: { name: string; image?: string | null; size?: "sm" | "md" }) {
  const initial = name.charAt(0) || "؟";
  const colors = ["bg-brand-500", "bg-blue-500", "bg-green-500", "bg-amber-500", "bg-rose-500", "bg-teal-500"];
  const color = colors[name.length % colors.length];
  const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt={name} className={`${sizeClass} rounded-full object-cover shrink-0`} />
    );
  }

  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
      {initial}
    </div>
  );
}

// ============ Reactions Picker ============

function ReactionPicker({
  onReact,
  onClose,
}: {
  onReact: (type: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-full shadow-lg z-20 px-2 py-1.5 flex items-center gap-0.5 animate-in fade-in zoom-in-95 duration-150">
        {REACTION_TYPES.map((r) => (
          <button
            key={r.type}
            onClick={() => { onReact(r.type); onClose(); }}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-muted hover:scale-125 transition-all text-lg"
            title={r.label}
          >
            {r.emoji}
          </button>
        ))}
      </div>
    </>
  );
}

// ============ Reactions Summary Display ============

function ReactionsSummaryDisplay({ summary }: { summary: ReactionsSummary }) {
  if (summary.total === 0) return null;

  // أعلى 3 تفاعلات
  const topReactions = Object.entries(summary.byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-0.5">
        {topReactions.map(([type]) => {
          const emoji = REACTION_TYPES.find((r) => r.type === type)?.emoji;
          return (
            <span key={type} className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs border border-background">
              {emoji}
            </span>
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground">{summary.total}</span>
    </div>
  );
}

// ============ Post Card ============

function PostCard({
  post,
  currentUserId,
  currentUserRole,
  currentUserName,
  currentUserImage,
  onDelete,
  onEdit,
  isLoggedIn,
  onRefresh,
}: {
  post: Post;
  currentUserId?: string;
  currentUserRole?: string;
  currentUserName: string;
  currentUserImage?: string | null;
  onDelete: () => void;
  onEdit: (content: string) => void;
  isLoggedIn: boolean;
  onRefresh: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [newComment, setNewComment] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [myReaction, setMyReaction] = useState(post.reactionsSummary?.myReaction || null);
  const [reactionsSummary, setReactionsSummary] = useState(post.reactionsSummary || { total: 0, byType: {}, myReaction: null });

  const isOwner = currentUserId === post.user.id;
  const isAdmin = currentUserRole === "ADMIN";
  const canModify = isOwner || isAdmin;
  const timeAgo = getTimeAgo(post.createdAt);

  async function handleReaction(type: string) {
    if (!isLoggedIn) return;
    try {
      const res = await fetch(`/api/posts/${post.id}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (data.removed) {
        setMyReaction(null);
      } else {
        setMyReaction(data.type);
      }
      setReactionsSummary(data.reactions);
    } catch {}
  }

  async function handleComment() {
    if (!newComment.trim() || commenting) return;
    setCommenting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          parentId: replyTo?.id || undefined,
        }),
      });
      if (res.ok) {
        setNewComment("");
        setReplyTo(null);
        onRefresh();
      }
    } catch {}
    setCommenting(false);
  }

  async function handleDeleteComment(commentId: string) {
    if (!confirm("متأكد إنك عايز تحذف التعليق ده؟")) return;
    try {
      const res = await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
      if (res.ok) onRefresh();
    } catch {}
  }

  async function handleEditComment(commentId: string, content: string) {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) onRefresh();
    } catch {}
  }

  function handleSaveEdit() {
    if (editContent.trim() && editContent !== post.content) {
      onEdit(editContent);
    }
    setEditing(false);
  }

  const currentReactionEmoji = myReaction
    ? REACTION_TYPES.find((r) => r.type === myReaction)?.emoji
    : null;

  return (
    <Card className="overflow-hidden">
      {/* Post Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <Link href={`/community/user/${post.user.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Avatar name={post.user.name} image={post.user.image} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-foreground">{post.user.name}</span>
                {post.user.role === "ADMIN" && (
                  <Badge variant="solid" className="text-[10px] px-1.5 py-0">
                    <IconShield className="h-2.5 w-2.5" /> أدمن
                  </Badge>
                )}
                {post.isPinned && <IconPinned className="h-3.5 w-3.5 text-brand-500" />}
              </div>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
          </Link>

          {canModify && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              >
                <IconDots className="h-5 w-5" />
              </button>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                  <div className="absolute left-0 top-full mt-1 bg-background border border-border rounded-xl shadow-lg z-20 py-1 w-36">
                    {isOwner && (
                      <button
                        onClick={() => { setEditing(true); setShowMenu(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        <IconEdit className="h-4 w-4" /> تعديل
                      </button>
                    )}
                    <button
                      onClick={() => { onDelete(); setShowMenu(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <IconTrash className="h-4 w-4" /> حذف
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-y"
              rows={3}
              maxLength={2000}
              autoFocus
            />
            <div className="flex items-center gap-2 justify-end">
              <Button size="sm" variant="ghost" onClick={() => { setEditing(false); setEditContent(post.content); }}>
                <IconX className="h-4 w-4" /> إلغاء
              </Button>
              <Button size="sm" onClick={handleSaveEdit}>
                <IconCheck className="h-4 w-4" /> حفظ
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
            {post.content}
          </p>
        )}
      </div>

      {/* Reactions Count */}
      {(reactionsSummary.total > 0 || post._count.comments > 0) && (
        <div className="flex items-center justify-between px-4 py-1.5 text-xs text-muted-foreground">
          <ReactionsSummaryDisplay summary={reactionsSummary} />
          {post._count.comments > 0 && (
            <button onClick={() => setShowComments(!showComments)} className="hover:underline">
              {post._count.comments} تعليق
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center border-t border-border mx-4">
        <div className="relative flex-1">
          <button
            onClick={() => isLoggedIn && (myReaction ? handleReaction(myReaction) : handleReaction("like"))}
            onMouseEnter={() => isLoggedIn && setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
              myReaction ? "text-brand-600" : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            {currentReactionEmoji ? (
              <span className="text-lg leading-none">{currentReactionEmoji}</span>
            ) : (
              <IconMoodSmile className="h-5 w-5" />
            )}
            <span>{myReaction ? REACTION_TYPES.find((r) => r.type === myReaction)?.label : "تفاعل"}</span>
          </button>
          {showReactions && (
            <div
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <ReactionPicker
                onReact={handleReaction}
                onClose={() => setShowReactions(false)}
              />
            </div>
          )}
        </div>
        <div className="w-px h-6 bg-border" />
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <IconMessageCircle className="h-5 w-5" />
          <span>تعليق</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border bg-muted/20">
          {post.comments.length > 0 && (
            <div className="px-4 py-2 space-y-3">
              {post.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUserId={currentUserId}
                  currentUserRole={currentUserRole}
                  isLoggedIn={isLoggedIn}
                  onReply={(id, name) => { setReplyTo({ id, name }); }}
                  onDelete={handleDeleteComment}
                  onEdit={handleEditComment}
                />
              ))}
              {post._count.comments > post.comments.length && (
                <p className="text-xs text-brand-600 cursor-pointer hover:underline text-center py-1">
                  عرض كل التعليقات ({post._count.comments})
                </p>
              )}
            </div>
          )}

          {/* كتابة كومنت */}
          {isLoggedIn && (
            <div className="px-4 py-3 space-y-2">
              {replyTo && (
                <div className="flex items-center gap-2 text-xs text-brand-600 bg-brand-50 rounded-lg px-3 py-1.5">
                  <IconCornerDownLeft className="h-3.5 w-3.5" />
                  <span>رد على {replyTo.name}</span>
                  <button onClick={() => setReplyTo(null)} className="mr-auto hover:text-destructive">
                    <IconX className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Avatar name={currentUserName} image={currentUserImage} size="sm" />
                <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-full pr-4 pl-1 py-1">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyTo ? `رد على ${replyTo.name}...` : "اكتب تعليق..."}
                    className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleComment()}
                    maxLength={1000}
                  />
                  <button
                    onClick={handleComment}
                    disabled={commenting || !newComment.trim()}
                    className="p-1.5 rounded-full text-brand-500 hover:bg-brand-50 disabled:opacity-40 transition-colors"
                  >
                    {commenting ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconSend className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

// ============ Comment Item (مع ردود) ============

function CommentItem({
  comment,
  currentUserId,
  currentUserRole,
  isLoggedIn,
  onReply,
  onDelete,
  onEdit,
  isReply = false,
}: {
  comment: CommentData;
  currentUserId?: string;
  currentUserRole?: string;
  isLoggedIn: boolean;
  onReply: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  isReply?: boolean;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isOwner = currentUserId === comment.user.id;
  const isAdmin = currentUserRole === "ADMIN";
  const canModify = isOwner || isAdmin;

  function handleSave() {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit(comment.id, editContent);
    }
    setEditing(false);
  }

  return (
    <div className={isReply ? "mr-10" : ""}>
      <div className="flex items-start gap-2.5">
        <Avatar name={comment.user.name} image={comment.user.image} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="bg-muted/60 rounded-2xl px-3 py-2 relative group">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-foreground">{comment.user.name}</span>
              {comment.user.role === "ADMIN" && (
                <Badge variant="solid" className="text-[9px] px-1 py-0">أدمن</Badge>
              )}
            </div>

            {editing ? (
              <div className="mt-1 space-y-2">
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-background rounded-lg border border-input px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  maxLength={1000}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => { setEditing(false); setEditContent(comment.content); }} className="text-xs text-muted-foreground hover:text-foreground px-2 py-0.5">
                    إلغاء
                  </button>
                  <button onClick={handleSave} className="text-xs text-brand-600 font-medium hover:underline px-2 py-0.5">
                    حفظ
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground mt-0.5">{comment.content}</p>
            )}

            {/* قائمة الخيارات */}
            {canModify && !editing && (
              <div className="absolute left-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 rounded-full hover:bg-background/80 text-muted-foreground"
                >
                  <IconDots className="h-4 w-4" />
                </button>
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                    <div className="absolute left-0 top-full mt-1 bg-background border border-border rounded-xl shadow-lg z-20 py-1 w-28">
                      {isOwner && (
                        <button
                          onClick={() => { setEditing(true); setShowMenu(false); }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-muted transition-colors"
                        >
                          <IconEdit className="h-3.5 w-3.5" /> تعديل
                        </button>
                      )}
                      <button
                        onClick={() => { onDelete(comment.id); setShowMenu(false); }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <IconTrash className="h-3.5 w-3.5" /> حذف
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* أزرار تحت الكومنت */}
          <div className="flex items-center gap-3 mr-3 mt-0.5 text-[11px] text-muted-foreground">
            <span>{getTimeAgo(comment.createdAt)}</span>
            {isLoggedIn && (
              <button
                onClick={() => onReply(comment.id, comment.user.name)}
                className="font-semibold hover:text-brand-600 transition-colors"
              >
                رد
              </button>
            )}
          </div>
        </div>
      </div>

      {/* الردود */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              currentUserRole={currentUserRole}
              isLoggedIn={isLoggedIn}
              onReply={onReply}
              onDelete={onDelete}
              onEdit={onEdit}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============ Utils ============

function getTimeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "دلوقتي";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `من ${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `من ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `من ${days} يوم`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `من ${weeks} أسبوع`;
  const months = Math.floor(days / 30);
  if (months < 12) return `من ${months} شهر`;
  return `من ${Math.floor(days / 365)} سنة`;
}
