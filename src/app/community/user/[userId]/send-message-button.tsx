"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconSend, IconLoader2, IconMessageCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { apiPost, API } from "@/lib/api";

export function SendMessageButton({
  recipientId,
  recipientName,
}: {
  recipientId: string;
  recipientName: string;
}) {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { success, error } = useToast();

  async function handleSend() {
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      await apiPost(API.messages.send, {
        recipientId,
        content: message.trim(),
      });
      success(`تم إرسال رسالتك لـ ${recipientName}`);
      setMessage("");
      setShowInput(false);
      // روح لصفحة الرسائل
      router.push("/community/messages");
    } catch {
      error("معرفناش نبعت الرسالة، جرّب تاني");
    }
    setSending(false);
  }

  if (!showInput) {
    return (
      <Button
        variant="gradient"
        className="w-full gap-2"
        onClick={() => setShowInput(true)}
      >
        <IconMessageCircle className="h-4 w-4" />
        ابعت رسالة لـ {recipientName.split(" ")[0]}
      </Button>
    );
  }

  return (
    <div className="space-y-3 w-full">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`اكتب رسالتك لـ ${recipientName.split(" ")[0]}...`}
        rows={3}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 resize-none"
        maxLength={2000}
        autoFocus
      />
      <div className="flex items-center gap-2">
        <Button
          onClick={handleSend}
          disabled={sending || !message.trim()}
          className="flex-1 gap-2"
        >
          {sending ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <IconSend className="h-4 w-4" />
              ابعت
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={() => { setShowInput(false); setMessage(""); }}
          disabled={sending}
        >
          إلغاء
        </Button>
      </div>
    </div>
  );
}
