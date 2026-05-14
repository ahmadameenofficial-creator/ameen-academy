"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IconHeart,
  IconHeartFilled,
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
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  user: UserInfo;
  createdAt: string;
}

interface Post {
  id: string;
  content: string;
  user: UserInfo;
  isPinned: boolean;
  likesCount: number;
  commentsCount: number;
  comments: CommentData[];
  _count: { comments: number; likes: number };
  createdAt: string;
}

// ============ Main Page ============

export function CommunityFeed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

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

  async function handleLike(postId: string) {
    if (!session) return;
    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      const data = await res.json();
      setLikedPosts((prev) => {
        const next = new Set(prev);
        data.liked ? next.add(postId) : next.delete(postId);
        return next;
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likesCount: p.likesCount + (data.liked ? 1 : -1) } : p
        )
      );
    } catch {}
  }

  async function handleDelete(postId: string) {
    if (!confirm("متأكد إنك عايز تحذف المنشور ده؟")) return;
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch {}
  }

  async function handleEdit(postId: string, content: string) {
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
        {/* New Post Composer */}
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

        {/* Posts Feed */}
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
                isLiked={likedPosts.has(post.id)}
                onLike={() => handleLike(post.id)}
                onDelete={() => handleDelete(post.id)}
                onEdit={(content) => handleEdit(post.id, content)}
                isLoggedIn={!!session}
                onCommentAdded={fetchPosts}
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

// ============ Post Card ============

function PostCard({
  post,
  currentUserId,
  currentUserRole,
  currentUserName,
  currentUserImage,
  isLiked,
  onLike,
  onDelete,
  onEdit,
  isLoggedIn,
  onCommentAdded,
}: {
  post: Post;
  currentUserId?: string;
  currentUserRole?: string;
  currentUserName: string;
  currentUserImage?: string | null;
  isLiked: boolean;
  onLike: () => void;
  onDelete: () => void;
  onEdit: (content: string) => void;
  isLoggedIn: boolean;
  onCommentAdded: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [newComment, setNewComment] = useState("");
  const [commenting, setCommenting] = useState(false);

  const isOwner = currentUserId === post.user.id;
  const isAdmin = currentUserRole === "ADMIN";
  const canModify = isOwner || isAdmin;
  const timeAgo = getTimeAgo(post.createdAt);

  async function handleComment() {
    if (!newComment.trim() || commenting) return;
    setCommenting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      if (res.ok) {
        setNewComment("");
        onCommentAdded();
      }
    } catch {}
    setCommenting(false);
  }

  function handleSaveEdit() {
    if (editContent.trim() && editContent !== post.content) {
      onEdit(editContent);
    }
    setEditing(false);
  }

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

      {/* Reactions Count Bar */}
      {(post.likesCount > 0 || post._count.comments > 0) && (
        <div className="flex items-center justify-between px-4 py-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            {post.likesCount > 0 && (
              <>
                <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                  <IconHeartFilled className="h-3 w-3 text-red-500" />
                </span>
                <span>{post.likesCount}</span>
              </>
            )}
          </div>
          {post._count.comments > 0 && (
            <button onClick={() => setShowComments(!showComments)} className="hover:underline">
              {post._count.comments} تعليق
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center border-t border-border mx-4">
        <button
          onClick={isLoggedIn ? onLike : undefined}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            isLiked ? "text-red-500" : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          {isLiked ? <IconHeartFilled className="h-5 w-5" /> : <IconHeart className="h-5 w-5" />}
          <span>{isLiked ? "بحبه" : "إعجاب"}</span>
        </button>
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
                <div key={comment.id} className="flex items-start gap-2.5">
                  <Avatar name={comment.user.name} image={comment.user.image} size="sm" />
                  <div className="flex-1">
                    <div className="bg-muted/60 rounded-2xl px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-foreground">{comment.user.name}</span>
                        {comment.user.role === "ADMIN" && (
                          <Badge variant="solid" className="text-[9px] px-1 py-0">أدمن</Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground mt-0.5">{comment.content}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground mr-3 mt-0.5 block">
                      {getTimeAgo(comment.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
              {post._count.comments > post.comments.length && (
                <p className="text-xs text-brand-600 cursor-pointer hover:underline text-center py-1">
                  عرض كل التعليقات ({post._count.comments})
                </p>
              )}
            </div>
          )}

          {isLoggedIn && (
            <div className="flex items-center gap-2.5 px-4 py-3">
              <Avatar name={currentUserName} image={currentUserImage} size="sm" />
              <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-full pr-4 pl-1 py-1">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب تعليق..."
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
          )}
        </div>
      )}
    </Card>
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
