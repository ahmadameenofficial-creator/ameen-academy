"use client";

import { useState, useEffect, useCallback } from "react";
import {
  IconBell,
  IconBellFilled,
  IconCheck,
  IconX,
  IconLoader2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export function NotificationsBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  async function markAllRead() {
    setLoading(true);
    try {
      await fetch("/api/notifications", { method: "PUT" });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
    setLoading(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {unreadCount > 0 ? (
          <>
            <IconBellFilled className="h-5 w-5 text-brand-500" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-brand-500 text-[10px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        ) : (
          <IconBell className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute left-0 top-full mt-2 w-80 z-50 shadow-lg max-h-96 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <span className="font-medium text-sm text-foreground">الإشعارات</span>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={markAllRead}
                    disabled={loading}
                  >
                    {loading ? (
                      <IconLoader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <IconCheck className="h-3.5 w-3.5" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsOpen(false)}
                >
                  <IconX className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-72">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  مفيش إشعارات
                </div>
              ) : (
                notifications.map((n) => (
                  <a
                    key={n.id}
                    href={n.link || "#"}
                    className={`block px-4 py-3 text-sm border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${
                      !n.isRead ? "bg-brand-50/50" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <p className="font-medium text-foreground">{n.title}</p>
                    {n.message && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                    )}
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {getTimeAgo(n.createdAt)}
                    </span>
                  </a>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "دلوقتي";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `من ${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `من ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  return `من ${days} يوم`;
}
