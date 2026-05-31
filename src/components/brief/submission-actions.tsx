"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconHeart, IconHeartFilled, IconShare2, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmissionActions({
  submissionId,
  initialVotes,
  initialHasVoted,
  shareTitle,
}: {
  submissionId: string;
  initialVotes: number;
  initialHasVoted: boolean;
  shareTitle: string;
}) {
  const { status } = useSession();
  const router = useRouter();
  const canVote = status === "authenticated";

  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);

  async function toggleVote() {
    if (!canVote) {
      router.push("/login");
      return;
    }
    if (pending) return;
    setPending(true);
    const prevVoted = hasVoted;
    const prevCount = votes;
    setHasVoted(!prevVoted);
    setVotes(prevVoted ? prevCount - 1 : prevCount + 1);
    try {
      const res = await fetch(`/api/brief/submissions/${submissionId}/vote`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setHasVoted(data.voted);
      setVotes(data.votesCount);
    } catch {
      setHasVoted(prevVoted);
      setVotes(prevCount);
    } finally {
      setPending(false);
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // المستخدم لغى المشاركة — تجاهل
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={hasVoted ? "soft" : "outline"}
        onClick={toggleVote}
        disabled={pending}
        className={cn(hasVoted && "text-brand-700")}
      >
        {hasVoted ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
        {votes} إعجاب
      </Button>
      <Button variant="ghost" onClick={share}>
        {copied ? <IconCheck size={18} /> : <IconShare2 size={18} />}
        {copied ? "اتنسخ اللينك" : "شارك"}
      </Button>
    </div>
  );
}
