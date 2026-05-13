import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300",
        solid: "bg-brand-500 text-white",
        outline: "border border-brand-500 text-brand-600",
        soft: "bg-muted text-muted-foreground",
        success: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        danger: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
