"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm",
        gradient:
          "bg-gradient-to-l from-brand-700 to-brand-500 text-white hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98]",
        outline:
          "border-2 border-brand-500 text-brand-600 bg-transparent hover:bg-brand-50",
        soft:
          "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200",
        ghost:
          "text-foreground hover:bg-muted",
        link:
          "text-brand-600 underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        dark:
          "bg-foreground text-background hover:bg-foreground/90",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
