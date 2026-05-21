"use client";

import { useState, useEffect } from "react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { apiClient, apiPost, ApiError, API } from "@/lib/api";

interface LikeState {
  isLiked: boolean;
  likesCount: number;
}

export function LikeButton({ slug }: { slug: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient<LikeState>(API.blog.like(slug))
      .then((data) => {
        setIsLiked(data.isLiked);
        setCount(data.likesCount);
      })
      .catch(() => {});
  }, [slug]);

  async function toggle() {
    if (loading) return;
    setLoading(true);

    try {
      const data = await apiPost<LikeState>(API.blog.like(slug), {});
      setIsLiked(data.isLiked);
      setCount(data.likesCount);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        window.location.href = "/login";
        return;
      }
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
        isLiked
          ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
          : "bg-muted text-muted-foreground border border-border hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200"
      }`}
    >
      {isLiked ? (
        <IconHeartFilled className="h-4 w-4" />
      ) : (
        <IconHeart className="h-4 w-4" />
      )}
      {count > 0 ? count : ""} {isLiked ? "عجبني" : "عجبني"}
    </button>
  );
}
