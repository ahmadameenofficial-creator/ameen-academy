"use client";

import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IconMessageCircle, IconLoader2 } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { PostComposer } from "@/components/community/post-composer";
import { PostCard } from "@/components/community/post-card";
import { useToast } from "@/components/ui/toast";
import { apiClient, apiPost, apiPut, apiDelete, API } from "@/lib/api";
import type { Post } from "@/components/community/types";

export function CommunityFeed({ initialPosts }: { initialPosts?: Post[] }) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const { error } = useToast();

  const fetchPosts = useCallback(async () => {
    try {
      const data = await apiClient<{ posts: Post[] }>(API.posts.list());
      setPosts(data.posts || []);
    } catch {
      error("معرفناش نحمّل المنشورات، حدّث الصفحة");
    }
    setLoading(false);
  }, [error]);

  useEffect(() => {
    if (!initialPosts) fetchPosts();
  }, [initialPosts, fetchPosts]);

  async function handlePost(content: string) {
    // بنخلّي الخطأ يطلع عشان PostComposer يمسكه ويعرض toast
    await apiPost(API.posts.create, { content });
    fetchPosts();
  }

  async function handleDeletePost(postId: string) {
    if (!confirm("متأكد إنك عايز تحذف المنشور ده؟")) return;
    try {
      await apiDelete(API.posts.delete(postId));
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch {
      error("معرفناش نحذف المنشور، جرّب تاني");
    }
  }

  async function handleEditPost(postId: string, content: string) {
    try {
      await apiPut(API.posts.update(postId), { content });
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, content } : p)));
    } catch {
      error("معرفناش نعدّل المنشور، جرّب تاني");
    }
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
                onRefresh={fetchPosts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
