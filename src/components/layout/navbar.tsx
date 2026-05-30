"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconBook2,
  IconUsers,
  IconHome,
  IconArticle,
  IconCrown,
} from "@tabler/icons-react";
import { Logo } from "@/components/shared/logo";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AuthButtons } from "./auth-buttons";
import { NotificationBell } from "./notification-bell";

const navLinks = [
  { href: ROUTES.home, label: "الرئيسية", icon: IconHome },
  { href: ROUTES.courses, label: "الكورسات", icon: IconBook2 },
  { href: ROUTES.vip, label: "VIP", icon: IconCrown, premium: true },
  { href: ROUTES.blog, label: "المدونة", icon: IconArticle },
  { href: ROUTES.community, label: "المجتمع", icon: IconUsers },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background/50 backdrop-blur-md"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <NotificationBell />
          <AuthButtons />
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="القائمة"
        >
          {isOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
        </button>
      </div>

      {/* Mobile menu — animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <nav className="container flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="size-5" />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <AuthButtons mobile />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
