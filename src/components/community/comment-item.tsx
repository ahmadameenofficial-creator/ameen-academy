"use client";

import { useState } from "react";
import { IconDots, IconTrash, IconEdit } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/shared/avatar";
import { getTimeAgo } from "@/lib/format";
import type { CommentData } from "./types";

interface CommentItemProps {
  comment: CommentData;
  currentUserId?: string;
  currentUserRole?: string;
  isLoggedIn: boolean;
  onReply: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  isReply?: boolean;
}

export function CommentItem({
  comment,
  currentUserId,
  currentUserRole,
  isLoggedIn,
  onReply,
  onDelete,
  onEdit,
  isReply = false,
}: CommentItemProps) {
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
                  <button
                    onClick={() => { setEditing(false); setEditContent(comment.content); }}
                    className="text-xs text-muted-foreground hover:text-foreground px-2 py-0.5"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    className="text-xs text-brand-600 font-medium hover:underline px-2 py-0.5"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground mt-0.5">{comment.content}</p>
            )}

            {canModify && !editing && (
              <div className="absolute left-1 top-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1.5 rounded-full hover:bg-background/80 text-muted-foreground"
                  aria-label="خيارات التعليق"
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
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-muted transition-colors"
                        >
                          <IconEdit className="h-3.5 w-3.5" /> تعديل
                        </button>
                      )}
                      <button
                        onClick={() => { onDelete(comment.id); setShowMenu(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <IconTrash className="h-3.5 w-3.5" /> حذف
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

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
