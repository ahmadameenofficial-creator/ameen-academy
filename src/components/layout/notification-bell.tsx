"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { apiClient, API } from "@/lib/api";
import { getTimeAgo } from "@/lib/format";

interface Notification {
  id: string;
  title: string;
  message: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export function NotificationBell() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // جلب الإشعارات
  useEffect(() => {
    if (!session?.user) return;

    async function fetchNotifications() {
      try {
        const data = await apiClient<{
          notifications: Notification[];
          unreadCount: number;
        }>(API.notifications.list);
        setNotifications(data.notifications);
        setUnread(data.unreadCount);
      } catch {
        // صامت — مش هنوقف الصفحة لو فشل
      }
    }

    fetchNotifications();
    // تحديث كل دقيقة
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
  }, [session?.user]);

  // إغلاق الـ dropdown لما يضغط برا
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // تعليم الكل كمقروء
  async function markAllRead() {
    try {
      await apiClient(API.notifications.markRead, { method: "PUT" });
      setUnread(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // صامت
    }
  }

  if (!session?.user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open && unread > 0) markAllRead();
        }}
        className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="الإشعارات"
      >
        <IconBell className="size-5" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -left-0.5 flex size-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white"
          >
            {unread > 9 ? "9+" : unread}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-border bg-background shadow-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-bold text-foreground">الإشعارات</h3>
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-brand-600 hover:underline"
                >
                  <IconCheck className="size-3" />
                  قراءة الكل
                </button>
              )}
            </div>

            {/* قائمة الإشعارات */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <IconBell className="size-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">مفيش إشعارات</p>
                </div>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <NotificationItem key={n.id} notification={n} onClose={() => setOpen(false)} />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationItem({
  notification: n,
  onClose,
}: {
  notification: Notification;
  onClose: () => void;
}) {
  const content = (
    <div
      className={`flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50 ${
        !n.isRead ? "bg-brand-50/50" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground line-clamp-1">{n.title}</p>
        {n.message && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.message}</p>
        )}
        <p className="text-[10px] text-muted-foreground/70 mt-1">
          {getTimeAgo(n.createdAt)}
        </p>
      </div>
      {!n.isRead && (
        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-500" />
      )}
    </div>
  );

  if (n.link) {
    return (
      <Link href={n.link} onClick={onClose}>
        {content}
      </Link>
    );
  }

  return content;
}
