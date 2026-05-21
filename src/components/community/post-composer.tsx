"use client";

import { useState } from "react";
import Link from "next/link";
import { IconSend, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/shared/avatar";
import { useToast } from "@/components/ui/toast";

interface PostComposerProps {
  userName: string;
  userImage?: string | null;
  isLoggedIn: boolean;
  onPost: (content: string) => Promise<void>;
}

export function PostComposer({ userName, userImage, isLoggedIn, onPost }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const { error } = useToast();

  async function handlePost() {
    if (!content.trim() || posting) return;
    setPosting(true);
    try {
      await onPost(content);
      setContent("");
    } catch {
      error("معرفناش ننشر المنشور، جرّب تاني");
    }
    setPosting(false);
  }

  if (!isLoggedIn) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-3">سجّل دخولك عشان تشارك في المجتمع</p>
        <Button variant="gradient" asChild>
          <Link href="/login">تسجيل الدخول</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar name={userName} image={userImage} />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`إيه اللي في بالك يا ${userName.split(" ")[0]}؟`}
            rows={3}
            className="flex-1 bg-muted/50 rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-none transition-colors border-0"
            maxLength={2000}
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/20">
        <span className="text-xs text-muted-foreground">{content.length}/2000</span>
        <Button size="sm" onClick={handlePost} disabled={posting || !content.trim()}>
          {posting ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <IconSend className="h-4 w-4" /> انشر
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
