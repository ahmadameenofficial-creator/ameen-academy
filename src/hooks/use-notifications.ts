"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient, apiPut, API } from "@/lib/api";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsData {
  notifications: Notification[];
  unreadCount: number;
}

export function useNotifications(interval = 30000) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await apiClient<NotificationsData>(API.notifications.list);
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch {
      // صمت متعمّد: ده polling في الخلفية كل 30 ثانية — مش هنزعج المستخدم
      // بإشعار خطأ كل مرة النت يقطع. الـ poll الجاي هيصلّح نفسه.
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const id = setInterval(fetchNotifications, interval);
    return () => clearInterval(id);
  }, [fetchNotifications, interval]);

  const markAllRead = useCallback(async () => {
    setLoading(true);
    try {
      await apiPut(API.notifications.markRead, {});
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // فشل تعليم الكل كمقروء — بنرجّع الحالة زي ما هي بصمت (مش حرجة)
    }
    setLoading(false);
  }, []);

  return { notifications, unreadCount, loading, markAllRead, refetch: fetchNotifications };
}
