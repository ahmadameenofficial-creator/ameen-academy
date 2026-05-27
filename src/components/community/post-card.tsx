"use client";

import { useState } from "react";
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
import { Avatar } from "@/components/shared/avatar";
import { useToast } from "@/components/ui/toast";
import { apiPost, apiPut, apiDelete, API } from "@/lib/api";
import { getTimeAgo } from "@/lib/format";
import { ReactionPicker } from "./reaction-picker";
import { ReactionsSummaryDisplay } from "./reactions-summary";
import { CommentItem } from "./comment-item";
import { REACTION_TYPES, type Post } from "./types";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  currentUserRole?: string;
  currentUserName: string;
  currentUserImage?: string | null;
  onDelete: () => void;
  onEdit: (content: string) => void;
  isLoggedIn: boolean;
  onRefresh: () => void;
}

export function PostCard({
  post,
  currentUserId,
  currentUserRole,
  currentUserName,
  currentUserImage,
  onDelete,
  onEdit,
  isLoggedIn,
  onRefresh,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [newComment, setNewComment] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [myReaction, setMyReaction] = useState(post.reactionsSummary?.myReaction || null);
  const [reactionsSummary, setReactionsSummary] = useState(
    post.reactionsSummary || { total: 0, byType: {}, myReaction: null },
  );

  const isOwner = currentUserId === post.user.id;
  const isAdmin = currentUserRole === "ADMIN";
  const canModify = isOwner || isAdmin;
  const timeAgo = getTimeAgo(post.createdAt);
  const { error } = useToast();

  async function handleReaction(type: string) {
    if (!isLoggedIn) return;
    try {
      const data = await apiPost<{ removed: boolean; type: string; reactions: typeof reactionsSummary }>(
        API.posts.react(post.id),
        { type },
      );
      setMyReaction(data.removed ? null : data.type);
      setReactionsSummary(data.reactions);
    } catch {
      error("معرفناش نسجّل التفاعل، جرّب تاني");
    }
  }

  async function handleComment() {
    if (!newComment.trim() || commenting) return;
    setCommenting(true);
    try {
      await apiPost(API.posts.comments(post.id), {
        content: newComment,
        parentId: replyTo?.id || undefined,
      });
      setNewComment("");
      setReplyTo(null);
      onRefresh();
    } catch {
      error("معرفناش نضيف التعليق، جرّب تاني");
    }
    setCommenting(false);
  }

  async function handleDeleteComment(commentId: string) {
    if (!confirm("متأكد إنك عايز تحذف التعليق ده؟")) return;
    try {
      await apiDelete(API.comments.delete(commentId));
      onRefresh();
    } catch {
      error("معرفناش نحذف التعليق، جرّب تاني");
    }
  }

  async function handleEditComment(commentId: string, content: string) {
    try {
      await apiPut(API.comments.update(commentId), { content });
      onRefresh();
    } catch {
      error("معرفناش نعدّل التعليق، جرّب تاني");
    }
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
                aria-label="خيارات المنشور"
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
          <>
            {post.content && (
              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                {post.content}
              </p>
            )}
            {post.image && (
              <img
                src={post.image}
                alt=""
                className="rounded-xl max-h-96 object-cover w-full mt-2"
                loading="lazy"
              />
            )}
          </>
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
              <ReactionPicker onReact={handleReaction} onClose={() => setShowReactions(false)} />
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
                  onReply={(id, name) => setReplyTo({ id, name })}
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
