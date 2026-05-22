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
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-neutral-200 bg-white/90 backdrop-blur-xl shadow-[0_-2px_20px_rgba(0,0,0,0.05)]">
        <div className="container flex items-center justify-between gap-4 py-3">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-neutral-900">
              1,500 جنيه{" "}
              <span className="text-neutral-400 font-normal line-through text-xs mr-1">3,000</span>
            </p>
            <p className="text-xs text-neutral-400">عرض لأول 50 مشترك</p>
          </div>
          <Button
            asChild
            variant="gradient"
            size="lg"
            className="w-full sm:w-auto text-sm px-8"
          >
            <Link href={`/courses/${COURSE_SLUG}/checkout`}>
              ابدأ دلوقتي
              <IconArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
