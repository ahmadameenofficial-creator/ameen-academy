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
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/images/logo.svg"
        alt="أكاديمية أمين"
        width={40}
        height={44}
        className="h-10 w-auto"
        priority
      />
      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-foreground">Ameen Academy</span>
          <span className="text-[11px] font-light text-muted-foreground">
            أكاديمية أمين
          </span>
        </div>
      )}
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
