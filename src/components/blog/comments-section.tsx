"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IconUser, IconSend, IconLoader2, IconCornerDownLeft, IconMessageCircle } from "@tabler/icons-react";
import { apiClient, apiPost, ApiError, API } from "@/lib/api";

interface CommentUser {
  id: string;
  name: string;
  image: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: CommentUser;
  replies: Comment[];
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "دلوقتي";
  if (mins < 60) return `من ${mins} دقيقة`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `من ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `من ${days} يوم`;
  return new Intl.DateTimeFormat("ar-EG", { month: "short", day: "numeric" }).format(new Date(dateStr));
}

function CommentItem({
  comment,
  slug,
  onReplyAdded,
  isReply = false,
}: {
  comment: Comment;
  slug: string;
  onReplyAdded: () => void;
  isReply?: boolean;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  async function submitReply() {
    if (!replyText.trim() || sending) return;
    setSending(true);

    try {
      await apiPost(API.blog.comments(slug), { content: replyText, parentId: comment.id });
      setReplyText("");
      setShowReply(false);
      onReplyAdded();
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        window.location.href = "/login";
        return;
      }
    }
    setSending(false);
  }

  return (
    <div className={`${isReply ? "mr-4 sm:mr-8 md:mr-14" : ""} overflow-hidden`}>
      <div className="flex gap-2 sm:gap-3">
        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
          {comment.user.image ? (
            <Image
              src={comment.user.image}
              alt={comment.user.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <IconUser className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="rounded-xl bg-muted/60 px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs sm:text-sm font-medium text-foreground">
                {comment.user.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground">
                {timeAgo(comment.createdAt)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>
          {!isReply && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-xs text-muted-foreground hover:text-brand-600 mt-1.5 mr-2 flex items-center gap-1 transition-colors"
            >
              <IconCornerDownLeft className="h-3 w-3" />
              رد
            </button>
          )}

          {showReply && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitReply()}
                placeholder="اكتب رد..."
                className="flex-1 min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                autoFocus
              />
              <button
                onClick={submitReply}
                disabled={sending || !replyText.trim()}
                className="rounded-lg bg-brand-500 text-white px-3 py-2 hover:bg-brand-600 disabled:opacity-50 transition-colors shrink-0"
              >
                {sending ? (
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <IconSend className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              slug={slug}
              onReplyAdded={onReplyAdded}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentsSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  function fetchComments() {
    apiClient<Comment[]>(API.blog.comments(slug))
      .then((data) => {
        if (Array.isArray(data)) setComments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchComments();
  }, [slug]);

  async function submitComment() {
    if (!text.trim() || sending) return;
    setSending(true);

    try {
      await apiPost(API.blog.comments(slug), { content: text });
      setText("");
      fetchComments();
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        window.location.href = "/login";
        return;
      }
    }
    setSending(false);
  }

  const totalCount = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  return (
    <section className="container mx-auto px-4 max-w-3xl pb-12 overflow-hidden">
      <div className="border-t border-border pt-8">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <IconMessageCircle className="h-5 w-5 text-brand-500" />
          التعليقات
          {totalCount > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({totalCount})
            </span>
          )}
        </h3>

        {/* صندوق كتابة كومنت */}
        <div className="flex gap-2 sm:gap-3 mb-8">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
            <IconUser className="h-4 w-4 text-brand-500" />
          </div>
          <div className="flex-1 min-w-0 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitComment()}
              placeholder="اكتب تعليقك هنا..."
              className="flex-1 min-w-0 rounded-xl border border-border bg-background px-3 sm:px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
            <button
              onClick={submitComment}
              disabled={sending || !text.trim()}
              className="rounded-xl bg-brand-500 text-white px-3 sm:px-4 py-2.5 hover:bg-brand-600 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm shrink-0"
            >
              {sending ? (
                <IconLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <IconSend className="h-4 w-4" />
                  <span className="hidden sm:inline">علّق</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* الكومنتات */}
        {loading ? (
          <div className="flex justify-center py-8">
            <IconLoader2 className="h-6 w-6 animate-spin text-brand-500" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <IconMessageCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              مفيش تعليقات لسه — كن أول واحد يعلّق
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                slug={slug}
                onReplyAdded={fetchComments}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
