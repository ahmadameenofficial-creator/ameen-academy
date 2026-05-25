import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
  href?: string;
}

export function Logo({ variant = "full", className, href = "/" }: LogoProps) {
  const content = (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/images/academy-logo.png"
        alt="أكاديمية أمين"
        width={120}
        height={44}
        className={cn(
          "w-auto",
          variant === "icon" ? "h-9" : "h-11"
        )}
        priority
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }
  return content;
}
