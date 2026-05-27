"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  IconSend,
  IconLoader2,
  IconArrowRight,
  IconMessageCircle,
  IconPhoto,
  IconCheck,
  IconChecks,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/shared/avatar";
import { useToast } from "@/components/ui/toast";
import { apiClient, apiPost, API } from "@/lib/api";
import { getTimeAgo } from "@/lib/format";

interface UserInfo {
  id: string;
  name: string;
  image: string | null;
  role?: string;
}

interface ConversationItem {
  id: string;
  otherUser: UserInfo;
  lastMessage: {
    id: string;
    content: string;
    senderId: string;
    isRead: boolean;
    createdAt: string;
  } | null;
  isUnread: boolean;
  lastMessageAt: string;
}

interface MessageItem {
  id: string;
  content: string;
  image?: string | null;
  senderId: string;
  sender: UserInfo;
  isRead: boolean;
  createdAt: string;
}

export function MessagesView({ currentUser }: { currentUser: UserInfo }) {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { error } = useToast();

  // جيب المحادثات
  const fetchConversations = useCallback(async () => {
    try {
      const data = await apiClient<ConversationItem[]>(API.messages.list);
      setConversations(data);
    } catch {
      error("معرفناش نحمّل المحادثات");
    }
    setLoading(false);
  }, [error]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Polling كل 5 ثواني عشان الرسائل تيجي لايف
  useEffect(() => {
    const interval = setInterval(() => {
      fetchConversations();
      if (activeConv) fetchMessages(activeConv, true);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConv]);

  // جيب رسائل محادثة
  async function fetchMessages(convId: string, silent = false) {
    if (!silent) setLoadingMessages(true);
    try {
      const data = await apiClient<{ messages: MessageItem[] }>(API.messages.conversation(convId));
      setMessages(data.messages.reverse()); // من الأقدم للأحدث
    } catch {
      if (!silent) error("معرفناش نحمّل الرسائل");
    }
    if (!silent) setLoadingMessages(false);
  }

  function openConversation(convId: string) {
    setActiveConv(convId);
    fetchMessages(convId);
    // علّم كمقروء في الـ UI فوراً
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, isUnread: false } : c)),
    );
  }

  // ابعت رسالة
  async function handleSend() {
    if (!newMessage.trim() || sending || !activeConv) return;
    const content = newMessage.trim();
    setNewMessage("");
    setSending(true);

    // Optimistic: أضف الرسالة فوراً
    const optimistic: MessageItem = {
      id: `temp-${Date.now()}`,
      content,
      senderId: currentUser.id,
      sender: currentUser,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    scrollToBottom();

    try {
      const data = await apiPost<MessageItem>(API.messages.conversation(activeConv), { content });
      // استبدل الـ optimistic بالحقيقي
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? data : m)),
      );
      // حدّث آخر رسالة في القائمة
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConv
            ? { ...c, lastMessage: { id: data.id, content, senderId: currentUser.id, isRead: false, createdAt: data.createdAt }, lastMessageAt: data.createdAt }
            : c,
        ),
      );
    } catch {
      // شيل الـ optimistic لو فشل
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setNewMessage(content); // رجّع النص
      error("معرفناش نبعت الرسالة، جرّب تاني");
    }
    setSending(false);
    inputRef.current?.focus();
  }

  function scrollToBottom() {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages.length]);

  const activeConvData = conversations.find((c) => c.id === activeConv);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">الرسائل</h1>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/community" className="gap-1.5">
              المجتمع
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden" style={{ height: "calc(100vh - 200px)", minHeight: 500 }}>
          <div className="flex h-full">
            {/* قائمة المحادثات */}
            <div className={`w-full sm:w-80 border-l border-border flex flex-col shrink-0 ${activeConv ? "hidden sm:flex" : "flex"}`}>
              <div className="p-3 border-b border-border bg-muted/30">
                <h2 className="text-sm font-medium text-foreground">المحادثات</h2>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <IconLoader2 className="h-6 w-6 animate-spin text-brand-500" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <IconMessageCircle className="h-12 w-12 text-muted-foreground/20 mb-3" />
                  <p className="text-sm text-muted-foreground">مفيش محادثات لسه</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    روح على بروفايل أي حد في المجتمع واضغط &quot;ابعت رسالة&quot;
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => openConversation(conv.id)}
                      className={`w-full flex items-center gap-3 p-3 text-right hover:bg-muted/50 transition-colors border-b border-border ${
                        activeConv === conv.id ? "bg-brand-50" : ""
                      }`}
                    >
                      <Avatar name={conv.otherUser.name} image={conv.otherUser.image} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${conv.isUnread ? "text-foreground" : "text-foreground"}`}>
                            {conv.otherUser.name}
                          </span>
                          {conv.lastMessage && (
                            <span className="text-[10px] text-muted-foreground">
                              {getTimeAgo(conv.lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        {conv.lastMessage && (
                          <p className={`text-xs truncate mt-0.5 ${conv.isUnread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            {conv.lastMessage.senderId === currentUser.id && "أنت: "}
                            {conv.lastMessage.content}
                          </p>
                        )}
                      </div>
                      {conv.isUnread && (
                        <div className="h-2.5 w-2.5 rounded-full bg-brand-500 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* منطقة الشات */}
            <div className={`flex-1 flex flex-col ${!activeConv ? "hidden sm:flex" : "flex"}`}>
              {!activeConv ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <IconMessageCircle className="h-16 w-16 text-muted-foreground/15 mb-3" />
                  <p className="text-muted-foreground">اختار محادثة عشان تبدأ</p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center gap-3 p-3 border-b border-border bg-background">
                    <button
                      onClick={() => setActiveConv(null)}
                      className="sm:hidden p-1 rounded-lg hover:bg-muted"
                    >
                      <IconArrowRight className="h-5 w-5 rotate-180" />
                    </button>
                    {activeConvData && (
                      <Link
                        href={`/community/user/${activeConvData.otherUser.id}`}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <Avatar name={activeConvData.otherUser.name} image={activeConvData.otherUser.image} />
                        <span className="font-medium text-sm text-foreground">
                          {activeConvData.otherUser.name}
                        </span>
                      </Link>
                    )}
                  </div>

                  {/* الرسائل */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {loadingMessages ? (
                      <div className="flex justify-center py-12">
                        <IconLoader2 className="h-6 w-6 animate-spin text-brand-500" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-sm text-muted-foreground">ابدأ المحادثة!</p>
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isMine = msg.senderId === currentUser.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isMine ? "justify-start" : "justify-end"}`}
                          >
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                                isMine
                                  ? "bg-brand-500 text-white rounded-br-sm"
                                  : "bg-muted rounded-bl-sm"
                              }`}
                            >
                              {msg.image && (
                                <img
                                  src={msg.image}
                                  alt=""
                                  className="rounded-xl mb-2 max-w-full max-h-60 object-cover"
                                />
                              )}
                              <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                              <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-start" : "justify-end"}`}>
                                <span className={`text-[10px] ${isMine ? "text-white/60" : "text-muted-foreground"}`}>
                                  {getTimeAgo(msg.createdAt)}
                                </span>
                                {isMine && (
                                  msg.isRead
                                    ? <IconChecks className="h-3 w-3 text-white/60" />
                                    : <IconCheck className="h-3 w-3 text-white/40" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* حقل الإرسال */}
                  <div className="p-3 border-t border-border bg-background">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-full pr-4 pl-1 py-1">
                        <input
                          ref={inputRef}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="اكتب رسالتك..."
                          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                            }
                          }}
                          maxLength={2000}
                          autoFocus
                        />
                        <button
                          onClick={handleSend}
                          disabled={sending || !newMessage.trim()}
                          className="p-2 rounded-full bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-40 transition-colors"
                        >
                          {sending ? (
                            <IconLoader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <IconSend className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
