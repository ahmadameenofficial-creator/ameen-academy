"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const COURSE_SLUG = "warshit-ameen";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-brand-500/10 bg-background/70 backdrop-blur-2xl shadow-[0_-8px_40px_rgba(160,2,255,0.06)]">
        <div className="container flex items-center justify-between gap-4 py-3">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-foreground">
              1,500 جنيه{" "}
              <span className="text-muted-foreground font-normal line-through text-xs mr-1">3,000</span>
            </p>
            <p className="text-xs text-muted-foreground/60">عرض لأول 50 مشترك</p>
          </div>
          <div className="relative group w-full sm:w-auto">
            <div className="absolute inset-0 bg-brand-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Button
              asChild
              variant="gradient"
              size="lg"
              className="relative w-full sm:w-auto text-sm px-8"
            >
              <Link href={`/courses/${COURSE_SLUG}/checkout`}>
                ابدأ دلوقتي
                <IconArrowLeft className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
