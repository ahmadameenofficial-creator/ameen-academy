"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLink, IconCircleCheck, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function ClaimCard({
  token,
  fullName,
  groupName,
}: {
  token: string;
  fullName: string;
  groupName: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function claim() {
    setBusy(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/offline/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "حصل مشكلة");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/dashboard/offline"), 1200);
    } catch {
      setErrorMsg("النت فصل؟ جرب تاني");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <>
        <IconCircleCheck className="h-12 w-12 text-green-500 mx-auto" />
        <h1 className="text-xl font-bold text-foreground">تم الربط 🎉</h1>
        <p className="text-sm text-muted-foreground">ثواني وهتلاقي نفسك في صفحة مجموعتك...</p>
      </>
    );
  }

  return (
    <>
      <IconLink className="h-12 w-12 text-brand-500 mx-auto" />
      <h1 className="text-xl font-bold text-foreground">
        أهلًا {fullName.split(" ")[0]} 👋
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        دوسة واحدة وحسابك يتربط بمجموعة <b>{groupName}</b> —<br />
        هتلاقي حضورك ودفعاتك وكل حاجة في صفحة واحدة
      </p>
      {errorMsg && (
        <p className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm px-4 py-3">
          {errorMsg}
        </p>
      )}
      <Button variant="gradient" size="lg" className="w-full" onClick={claim} disabled={busy}>
        {busy ? <IconLoader2 className="h-5 w-5 animate-spin" /> : "اربط حسابي"}
      </Button>
    </>
  );
}
