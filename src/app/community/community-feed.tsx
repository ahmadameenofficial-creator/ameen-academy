"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IconMessageCircle,
  IconLoader2,
  IconMail,
} from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostComposer } from "@/components/community/post-composer";
import { PostCard } from "@/components/community/post-card";
import { useToast } from "@/components/ui/toast";
import { apiClient, apiPost, apiPut, apiDelete, API } from "@/lib/api";
import type { Post } from "@/components/community/types";

export function CommunityFeed({ initialPosts }: { initialPosts?: Post[] }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const { error } = useToast();

  const fetchPosts = useCallback(async (pageNum = 1, append = false) => {
    try {
      const data = await apiClient<{ posts: Post[]; pages: number }>(
        API.posts.list({ page: pageNum }),
      );
      if (append) {
        setPosts((prev) => [...prev, ...data.posts]);
      } else {
        setPosts(data.posts || []);
      }
      setHasMore(pageNum < data.pages);
    } catch {
      error("معرفناش نحمّل المنشورات، حدّث الصفحة");
    }
    setLoading(false);
    setLoadingMore(false);
  }, [error]);

  useEffect(() => {
    if (!initialPosts) fetchPosts();
  }, [initialPosts, fetchPosts]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          setLoadingMore(true);
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPosts(nextPage, true);
        }
      },
      { threshold: 0.1 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, page, fetchPosts]);

  // عدد الرسائل الغير مقروءة
  useEffect(() => {
    if (!session?.user) return;
    apiClient<{ count: number }>(API.messages.unread)
      .then((d) => setUnreadCount(d.count))
      .catch(() => {});
  }, [session]);

  async function handlePost(content: string, image?: string) {
    await apiPost(API.posts.create, { content, image });
    // حمّل أول صفحة تاني
    setPage(1);
    fetchPosts(1);
  }

  async function handleDeletePost(postId: string) {
    if (!confirm("متأكد إنك عايز تحذف المنشور ده؟")) return;
    // Optimistic
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    try {
      await apiDelete(API.posts.delete(postId));
    } catch {
      error("معرفناش نحذف المنشور، جرّب تاني");
      fetchPosts(1);
    }
  }

  async function handleEditPost(postId: string, content: string) {
    // Optimistic
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, content } : p)));
    try {
      await apiPut(API.posts.update(postId), { content });
    } catch {
      error("معرفناش نعدّل المنشور، جرّب تاني");
      fetchPosts(1);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-50 to-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">المجتمع</h1>
          <p className="mt-2 text-muted-foreground">شارك، اسأل، وتعلّم مع باقي الطلاب</p>

          {/* زرار الرسائل */}
          {session?.user && (
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link href="/community/messages">
                  <IconMail className="h-4 w-4" />
                  الرسائل
                  {unreadCount > 0 && (
                    <span className="bg-brand-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-xl space-y-4">
        <PostComposer
          userName={session?.user?.name || ""}
          userImage={session?.user?.image}
          isLoggedIn={!!session?.user}
          onPost={handlePost}
        />

        {loading ? (
          <div className="flex justify-center py-12">
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
                onRefresh={() => fetchPosts(1)}
              />
            ))}

            {/* Infinite scroll trigger */}
            <div ref={observerRef} className="py-4">
              {loadingMore && (
                <div className="flex justify-center">
                  <IconLoader2 className="h-6 w-6 animate-spin text-brand-500" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
