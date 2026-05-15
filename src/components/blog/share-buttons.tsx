"use client";

import { IconBrandX, IconBrandFacebook, IconBrandWhatsapp, IconLink } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground ml-1">شارك:</span>
        <div className="h-8 w-8 rounded-lg bg-muted" />
        <div className="h-8 w-8 rounded-lg bg-muted" />
        <div className="h-8 w-8 rounded-lg bg-muted" />
        <div className="h-8 w-8 rounded-lg bg-muted" />
      </div>
    );
  }

  const url = `${window.location.origin}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground ml-1">شارك:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-brand-50 hover:text-brand-600 transition-colors"
      >
        <IconBrandX className="h-4 w-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-brand-50 hover:text-brand-600 transition-colors"
      >
        <IconBrandFacebook className="h-4 w-4" />
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-green-50 hover:text-green-600 transition-colors"
      >
        <IconBrandWhatsapp className="h-4 w-4" />
      </a>
      <button
        onClick={copyLink}
        className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-brand-50 hover:text-brand-600 transition-colors"
        title="نسخ الرابط"
      >
        <IconLink className="h-4 w-4" />
      </button>
      {copied && (
        <span className="text-xs text-brand-600 animate-in fade-in">تم النسخ</span>
      )}
    </div>
  );
}
